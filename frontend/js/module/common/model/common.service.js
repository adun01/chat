import module from '../';

module.service('commonService', function () {
    return {
        createDateFromW3C: function (dateW3C) {
            var dateArray = dateW3C
                .match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/)
                .slice(1)
                .map(function (s, i) {
                    return i === 1 ? s - 1 : +s;
                });

            return new Date(
                dateArray[0],
                dateArray[1],
                dateArray[2],
                dateArray[3],
                dateArray[4],
                dateArray[5]
            );
        }
    };
});