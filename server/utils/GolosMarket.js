import * as config from 'config';
import axios from 'axios';
import NodeCache from 'node-cache';

const KEY = 'steem-market'
const TTL = 7200

export function GolosMarket() {
    const ttl = TTL;
    const cache = new NodeCache({
        stdTTL: ttl,
    });
    const key = KEY;
    cache.on('expired', (k, v) => {
        console.log('Cache key expired', k);
        if (key === k) {
            this.promise = this.refresh();
        }
    });
    this.cache = cache;
    this.promise = this.refresh();
}

 GolosMarket.prototype.get = async function() {
   console.log(this.promise)
    await this.promise;

     const key = KEY;
    return new Promise((res, rej) => {
        this.cache.get(key, (err, value) => {
            if (err) {
                console.error('Could not retrieve Steem Market data');
                return;
            }
            res(value);
        });
    });
};

 GolosMarket.prototype.refresh = function() {
    console.log('Refreshing Steem Market data...');

    const url = config.steem_market_endpoint;
    const token = config.cmc_key;
    const key = KEY;
   console.log(1, url, token)
    if (!url) {
        console.info('No Steem Market endpoint provided...');
        return new Promise((res, rej) => {
            this.cache.set(key, {}, (err, success) => {
                console.info('Stored empty Steem Market data...');
            });
        });
    }
   console.log(2)

     return new Promise((res, rej) => {
        const options = {
            url: url,
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

         axios(options)
            .then(response => {
                console.info('Received Steem Market data from endpoint...');
                this.cache.set(key, response.data, (err, success) => {
                    if (err) {
                        console.error('Error storing currencies in cache', err);
                        return;
                    }
                    console.info('Steem Market data refreshed...');
                    res();
                });
            })
            .catch(err => {
                console.error('Could not fetch Steem Market data', err);
            });
    });
};
