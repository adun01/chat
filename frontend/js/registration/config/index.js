import module from '../';
import regTpl from '../view/reg.view.html'

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('main.registration', {
            url: 'registration/',
            controller: 'registrationController',
            controllerAs: '_ctrlReg',
            template: regTpl
        })
});