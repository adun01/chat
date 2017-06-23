import module from '../';
import authTpl from '../view/auth.html';

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('main.auth', {
            url: 'auth/',
            template: authTpl
        });
});