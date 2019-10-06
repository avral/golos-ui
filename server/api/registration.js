import koa_router from 'koa-router';
import koa_body from 'koa-body';
import config from 'config';
import models from 'db/models';
import { checkCSRF, getRemoteIp, rateLimitReq } from 'server/utils/misc';
import { hash } from 'golos-js/lib/auth/ecc';
import secureRandom from 'secure-random';
import gmailSend from 'gmail-send'

function digits(text) {
    const digitArray = text.match(/\d+/g);
    return digitArray ? digitArray.join('') : '';
}

/**
 * return status types:
 * session - new user without identity in DB
 * waiting - user verification email in progress
 * done - user verification email is successfuly done
 * already_used -
 * attempts_10 - Confirmation was attempted a moment ago. You can try again only in 10 seconds
 * attempts_300 - Confirmation was attempted a moment ago. You can try again only in 5 minutes
 * @param {*} app
 */
export default function useRegistrationApi(app) {
    const router = koa_router({ prefix: '/api/v1' });
    app.use(router.routes());
    const koaBody = koa_body();

    router.post('/verify_code', koaBody, function*() {
        if (rateLimitReq(this, this.req, 20)) return;

        if (!this.request.body) {
            this.status = 400;
            this.body = 'Bad Request';
            return;
        }

        const body = this.request.body;
        let params = {};

        let error = false

        if (typeof body === 'string') {
            try {
                params = JSON.parse(body);
            } catch (e) {}
        } else {
            params = body;
        }

        if (!checkCSRF(this, params.csrf)) return;

        const { confirmation_code, email } = params

        //let mid = yield models.Identity.findOne({
        //    attributes: [
        //        'id',
        //        'email',
        //        'verified',
        //        'updated_at',
        //        'confirmation_code',
        //    ],
        //    where: { user_id, confirmation_code: code },
        //    order: 'id DESC',
        //});

        //if (mid) {
        //  console.log('verif: mid exists')
        //    if (mid.verified) {
        //      this.body = JSON.stringify({ status: 'done' });
        //      return;
        //    } else {
        //      yield mid.update({ verified: true });
        //    }

        //    this.body = JSON.stringify({ status: 'done' });
        //    return;
        //} else {
        //    this.status = 401;
        //    this.body = 'Bad Request Data from';
        //    return;
        //}

        //    this.status = 401;
        //    this.body = 'Bad Request Data from';
        //    return;
        //}

        console.log(
            '-- /api/v1/confirm_provider -->',
            email,
            confirmation_code
        );

        let mid = yield models.Identity.findOne({
            attributes: ['id', 'user_id', 'verified', 'updated_at', 'email'],
            where: {
                email: hash.sha256(email, 'hex'),
                confirmation_code,
                provider: 'email',
            },
            order: 'id DESC',
        });

        if (!mid) {
            this.status = 401;
            this.body = 'Wrong confirmation code';
            return;
        }
        if (mid.verified) {
            this.status = 401;
            this.body = 'Email has already been verified';
            return;
        }

        const hours_ago = (Date.now() - mid.updated_at) / 1000.0 / 3600.0;
        if (hours_ago > 24.0) {
            this.status = 401;
            this.body = 'Confirmation code has been expired, try again';
            return;
        }

        yield mid.update({ verified: true });
        this.body =
            'GOLOS.id \nСпасибо за подтверждение вашей почты';
    });

    router.post('/send_code', koaBody, function*() {
        if (rateLimitReq(this, this.req)) return;

        if (!config.gmail_send.user || !config.gmail_send.pass) {
          this.status = 401;
          this.body = 'Mail service disabled';
          return;
        }

        const body = this.request.body;
        let params = {};
        let error = false

        if (typeof body === 'string') {
            try {
                params = JSON.parse(body);
            } catch (e) {}
        } else {
            params = body;
        }

        if (!checkCSRF(this, params.csrf)) return;

        const { email } = params

        //const retry = params.retry ? params.retry : null;
        console.log(params);

        if (!email || !/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(email)) {
            this.body = JSON.stringify({ status: 'provide_email' });
            return;
        }

        const emailHash = hash.sha256(email, 'hex');

        const existing_email = yield models.Identity.findOne({
            attributes: ['user_id'],
            where: { email: emailHash, provider: 'email', verified: true },
            order: 'id DESC',
        });

        let user_id = this.session.user;
        if (existing_email && existing_email.user_id != user_id) {
            console.log(
                '-- /send_code existing_email -->',
                user_id,
                this.session.uid,
                emailHash,
                existing_email.user_id
            );
            this.body = JSON.stringify({ status: 'already_used' });
            return;
        }

        let confirmation_code = parseInt(
            secureRandom.randomBuffer(8).toString('hex'),
            16
        ).toString(10).substring(0, 4); // 4 digit code

        let mid = yield models.Identity.findOne({
            attributes: [
                'id',
                'email',
                'verified',
                'updated_at',
                'confirmation_code',
            ],
            where: { email: emailHash, user_id, provider: 'email' },
            order: 'id DESC',
        });

        if (mid) {
            if (mid.verified) {
                if (mid.email === emailHash) {
                    this.body = JSON.stringify({ status: 'done' });
                    return;
                }
                yield mid.update({ verified: false, email: emailHash });
            }

            // TODO возможно сделать срок активности для кодов
            //const seconds_ago = (Date.now() - mid.updated_at) / 1000.0;
            //const timeAgo = process.env.NODE_ENV === 'production' ? 300 : 10;

            //if (retry) {
            //    confirmation_code = mid.confirmation_code;
            //} else {
            //    if (seconds_ago < timeAgo) {
            //        this.body = JSON.stringify({ status: 'attempts_300' });
            //        return;
            //    }
            //    yield mid.update({ confirmation_code, email: emailHash });
            //}
        } else {
            let user;
            if (user_id) {
                user = yield models.User.findOne({
                    attributes: ['id'],
                    where: { id: user_id },
                });
            }
            if (!user) {
                user = yield models.User.create({
                    uid: this.session.uid,
                    remote_ip: getRemoteIp(this.request.req),
                });
                this.session.user = user_id = user.id;
            }

            // Send mail
            const send = gmailSend({
              user: config.gmail_send.user,
              pass: config.gmail_send.pass,
              from: 'registrator@golos.id',
              to: email,
              subject: 'Golos.id verification code',
            });

            send({
              html: `Registration code: <h4>${confirmation_code}</h4>`
            }).then(async () => {
              mid = await models.Identity.create({
                  provider: 'email',
                  user_id,
                  uid: this.session.uid,
                  email: emailHash,
                  verified: false,
                  confirmation_code,
              });
            }).catch((e) => {
              console.log(e)
              error = true

              this.body = JSON.stringify({
                  status: 'error',
                  error: 'Send code error ' + e,
              });
          })
        }

      if (!error) {
        this.body = JSON.stringify({
            status: 'waiting',
        });
      }
    });
}
