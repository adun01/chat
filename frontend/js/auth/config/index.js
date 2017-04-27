import module from '../';
import authTpl from '../view/auth.view.html'

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('main.auth', {
            url: 'auth/',
            controller: 'authController',
            controllerAs: '_ctrlAuth',
            template: authTpl
        })
});