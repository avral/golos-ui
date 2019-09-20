import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getPinnedPosts } from 'app/utils/NormalizeProfile'
import shouldComponentUpdate from 'app/utils/shouldComponentUpdate'
import transaction from 'app/redux/Transaction';
import user from 'app/redux/User';
import Icon from 'app/components/elements/Icon';
import tt from 'counterpart';
import DialogManager from 'app/components/elements/common/DialogManager';


const {string, func, object} = PropTypes

export default class PinPost extends React.Component {
    static propTypes = {
        account: object,
        author: string,
        permlink: string,
        pinned: func,
        updateAccount: func,
        notify: PropTypes.func,
    }
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'PinPost')
        this.state = {active: false, loading: false}
    }

    componentDidMount() {
        const {account, permlink, author} = this.props

        if(account) {
          const pinnedPosts = getPinnedPosts(account.toJS(), true)

          const link = author + '/' + permlink

          this.setState({active: pinnedPosts.includes(link)})
        }
    }

    pin = (e) => {
      e.preventDefault()
      const { permlink, author, updateAccount, notify } = this.props

      const account = this.props.account.toJS()
      let pinnedPosts = getPinnedPosts(account, true)
      const link = author + '/' + permlink

      let metadata;
      try {
        metadata = JSON.parse(account.json_metadata);
      } catch(err) {
        DialogManager.alert('json_metadata invalid format');
      }

      if(this.state.active) {
        pinnedPosts = pinnedPosts.filter(pinnedLink => pinnedLink !== link);
      } else {
        pinnedPosts.push(link);
      }

      metadata.pinnedPosts = pinnedPosts;

      this.setState({loading: true})
      updateAccount({
          json_metadata: JSON.stringify(metadata),
          account: account.name,
          memo_key: account.memo_key,
          errorCallback: (err) => {
              this.setState({loading: false})
              if (e !== 'Canceled') {
                  notify(tt('g.server_returned_error'), 10000);
                  console.log('updateAccount ERROR', err);
              }
          },
          successCallback: () => {
              this.setState({active: !this.state.active, loading: false})

              //this.props.pinned(this.props.author + '/' + this.props.permlink)
              notify(tt('g.saved') + '!', 10000);
          },
      });
    }

    render() {
      if(!this.props.author == this.props.account || !this.props.account) return null;

      const state = this.state.active ? 'active' : 'inactive'

      const loading = this.state.loading ? ' loading' : ''
      return (
        <span className={'Reblog__button Reblog__button-'+ state + loading}>
          <a href="#" onClick={this.pin} title='Закрепить запись'>
            <Icon name="pin" />
          </a>
        </span>)
    }
}
module.exports = connect(
    (state, ownProps) => {
        const account = state.user.getIn(['current', 'username']) || state.offchain.get('account')
        return {...ownProps, account: state.global.get('accounts').get(account) || null}
    },

    dispatch => ({
        updateAccount: ({ successCallback, errorCallback, ...operation }) => {
            dispatch(
                transaction.actions.broadcastOperation({
                    type: 'account_metadata',
                    operation,
                    successCallback() {
                        dispatch({type: 'FETCH_STATE', payload: {pathname: `@${operation.account}/blog`}})
                        dispatch(user.actions.getAccount());
                        successCallback();
                    },
                    errorCallback,
                })
            );
        },

        notify: (message, dismiss = 3000) => {
            dispatch({
                type: 'ADD_NOTIFICATION',
                payload: {
                    key: 'settings_' + Date.now(),
                    message,
                    dismissAfter: dismiss,
                },
            });
        },
    })
)(PinPost)
