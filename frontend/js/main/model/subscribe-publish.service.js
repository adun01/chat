import module from '../';

module.service('subscribePublish', function () {

    const chanells = {};

    const publish = function (data) {

            if (!chanells[data.name]) {
                return false;
            }
            chanells[data.name].forEach(function (fn) {
                fn(data.data);
            });
        },
        subscribe = function (data) {
            if (!chanells[data.name]) {
                chanells[data.name] = [];
            }
            chanells[data.name].push(data.fn);
        };

    return {
        subscribe: subscribe,
        publish: publish
    }
});