import module from '../../';
import authenticationTpl from './view/auth.html';

module.component('authentication', {
    template: authenticationTpl,
    controller: 'authenticationController',
    controllerAs: '_ctrlAuth',
});