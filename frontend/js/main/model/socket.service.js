import module from '../';

module.service('socketService', function ($timeout, $q) {
    const socket = io();

    function roomOpen(data) {
        let defer = $q.defer();
        socket.emit('roomOpen', data);
        socket.emit('roomListChange', data);

        socket.on('roomListChange', function (data) {
            defer.resolve(data);
        });

        return defer.promise;
    }

    socket.on('newMessage', function (data) {
        subscribe.publish({
            name: 'newMessage',
            data: data
        });
    });

    const subscribe = (function () {
        const publish = function (data) {
                if (!subscribe.chanells[data.name]) {
                    return false;
                }
                subscribe.chanells[data.name].forEach(function (fn) {
                    fn(data.data);
                });
            },
            subscribes = function (data) {
                if (!subscribe.chanells[data.name]) {
                    subscribe.chanells[data.name] = [];
                }
                subscribe.chanells[data.name].push(data.fn);
            };

        return {
            chanells: {},
            subscribes: subscribes,
            publish: publish
        }
    }());

    return {
        roomOpen: roomOpen,
        subscribe: subscribe
    };
});