import module from '../../';
import registrationTpl from './view/reg.html';

module.component('registration', {
    template: registrationTpl,
    controller: 'registrationController',
    controllerAs: '_ctrlReg'
});