import module from '../';
import regTpl from '../view/reg.view.html'

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('resolve.create', {
            url: 'create/',
            controller: 'registrationController',
            controllerAs: '_ctrlReg',
            template: regTpl
        })
});