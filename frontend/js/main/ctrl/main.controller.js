import module from '../';
import roomNotFoundTpl from '../view/main.message.html';

module.controller('mainController', function (mainControllerData, $mdDialog, sideBarService, $stateParams) {

    sideBarService.open();
    sideBarService.locked();
    if ($stateParams.message) {
        $mdDialog.show({
            controller: 'mainMessageController',
            controllerAs: '_ctrlMainMessage',
            template: roomNotFoundTpl,
            parent: angular.element(document.body),
            resolve: {
                roomNotFoundData: function () {
                    return $stateParams;
                }
            }
        });
    }
});