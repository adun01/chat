import module from '../';
import baseTpl from '../view/base.view.html';

export default module.config($stateProvider => {
    $stateProvider
        .state('main.base', {
            url: 'base/',
            template: baseTpl,
            params: {
                message: null
            },
            resolve: {
                baseData: ($q, roomService, authService, $mdDialog) => {
                    let defer = $q.defer();
                    roomService.set(null);
                    authService.isLogin().then((user) => {

                        if (!user) {
                            $state.go('main.auth');
                        } else {
                            defer.resolve();
                        }
                    });
                    return defer.promise;
                }
            }
        });
});