import module from '../';
import regTpl from '../view/reg.view.html'

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('main.create', {
            url: 'create/',
            template: regTpl
        })
});