import axios from 'axios';
import _ from 'lodash';

export default function (token) {
    const that = {};

    that.request = () => {
        return new Promise((resolve, reject) => {
            const url = `https://api.trello.com/1/members/me/boards/?key=124d5a3c38400a7f6be20a26e203ae54&token=${token}`;

            axios.get(url).then((responce) => {
                console.log(responce);
                resolve(format(responce));
            }).catch(function (error) {
                reject(error);
            });
        });
    };

    const format = (responce) => {
        return _.map(_.map(responce.data, (raw_board) => {
            return {
                id:   raw_board.id,
                name: raw_board.name,
                url:  raw_board.shortUrl
            };
        }));
    };

    return that;
}