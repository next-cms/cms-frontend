import fetch from "isomorphic-unfetch";

export default class BaseService {
    static fetch = (url, method, body, onSuccess, onFailed, {headers} = {}) => {
        console.log("BaseService fetch");
        let _headers = {"Content-Type": "application/json"};
        if (headers) _headers = {
            ..._headers,
            ...headers
        };
        return fetch(url, {
            method: method, headers: _headers,
            body: method === "GET" ? undefined : JSON.stringify(body)
        })
            .then(r => r.json())
            .then(resp => {
                if (resp.status === "success") {
                    return onSuccess(resp.data, resp.data);
                } else {
                    return onFailed(resp);
                }
            }, err => {
                return onFailed(err);
            })
            .catch(err => {
                return onFailed(err);
            });
    };

    static post = (url, body, onSuccess, onFailed, options) => {
        console.log("BaseService post");
        return BaseService.fetch(url, "POST", body, onSuccess, onFailed, options);
    };

    static get = (url, onSuccess, onFailed, options) => {
        return BaseService.fetch(url, "GET", null, onSuccess, onFailed, options);
    };
}
