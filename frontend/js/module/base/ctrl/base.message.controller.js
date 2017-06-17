import module from '../';

module.controller('baseMessageController',
    function (baseMessageData, $timeout, $mdDialog) {
        const _ctrlBaseMessage = this;

        _ctrlBaseMessage.data = {
            message: baseMessageData.message || 'Не известная ошибка',
            code: 'Ошибка'
        };

        $timeout(function () {
            $mdDialog.cancel();
        }, 3000);
    });