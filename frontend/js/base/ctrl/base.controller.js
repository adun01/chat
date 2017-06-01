import module from '../';
import baseMessageTpl from '../view/base.message.html';

module.controller('baseController', function (baseControllerData, $mdDialog, sideBarService, $stateParams) {

    sideBarService.open();
    sideBarService.locked();

    if ($stateParams.message) {
        $mdDialog.show({
            controller: 'baseMessageController',
            controllerAs: '_ctrlBaseMessage',
            template: baseMessageTpl,
            parent: angular.element(document.body),
            resolve: {
                baseMessageData: function () {
                    return $stateParams;
                }
            }
        });
    }
});