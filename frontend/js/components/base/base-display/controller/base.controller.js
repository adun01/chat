import module from '../../../'
import baseMessageTpl from '../view/base.html';

module.controller('baseController', function ($mdDialog, $stateParams) {
    const _ctrlBase = this;

    _ctrlBase.show = false;

    _ctrlBase.openSideBar = function () {
        _ctrlBase.show = true;
    };

    if ($stateParams.message) {
        debugger;
        /*$mdDialog.show({
            controller: 'baseMessageController',
            controllerAs: '_ctrlBaseMessage',
            template: baseMessageTpl,
            parent: angular.element(document.body),
            resolve: {
                baseMessageData: function () {
                    return $stateParams;
                }
            }
        });*/
    }
});