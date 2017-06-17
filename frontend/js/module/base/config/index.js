import module from '../';
import baseTpl from '../view/base.view.html';

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('main.base', {
            url: 'base/',
            template: baseTpl,
            params: {
                message: null
            },
            resolve: {
                baseData: function (sideBarAuthService, roomService) {
                    roomService.set(null);
                }
            }
        });
});