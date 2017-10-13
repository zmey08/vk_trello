import axios from 'axios';
import _ from 'lodash';

export default function (token) {
    const that = {};

    that.request = () => {
        return new Promise((resolve, reject) => {
            const method = 'groups.get';
            const url    = `https://api.vk.com/method/${method}?access_token=${token}&extended=1`;

            axios.get(url).then((responce) => {
                resolve(format(responce));
            }).catch(function (error) {
                reject(error);
            });
        });
    };

    const format = (responce) => {
        return _.map(_.filter(responce.data.response, (group_raw) => {
            return _.isObject(group_raw);
        }), (group_raw) => {
            return {
                gid:   group_raw.gid,
                name:  group_raw.name,
                image: group_raw.photo_big,
            };
        });
    };

    return that;
}