import module from '../';

module.service('subscriberPublisher', function () {
    const subscribe = (function () {

        return {
            channels: {},
            addChannels: function (name, fn) {
                if (!this.channels[name]) {
                    this.channels[name] = [];
                }
                this.channels[name].push({
                    fn: fn
                });
            },
            callSubscriber: function (name, data) {
                if (this.channels[name] && this.channels[name].length) {
                    this.channels[name].forEach(function (subscribe) {
                        subscribe.fn(data);
                    });
                }
            },
            clearChannels: function (name) {
                this.channels[name] = null;
            }
        }
    }());

    return subscribe;
});