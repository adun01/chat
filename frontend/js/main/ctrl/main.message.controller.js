import module from '../';

module.controller('mainMessageController', function (roomNotFoundData, sideBarService, $timeout, $mdDialog) {
    const _ctrlMainMessage = this;

    _ctrlMainMessage.data = {
        message: roomNotFoundData.message || 'Не известная ошибка',
        code: 'Ошибка'
    };

    $timeout(function () {
        $mdDialog.cancel();
    }, 3000);

    sideBarService.open();
});