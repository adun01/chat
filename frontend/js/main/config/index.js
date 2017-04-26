import module from '../';
import mainhTpl from '../view/main.view.html'

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            template: mainhTpl,
            controller: 'mainController',
            controllerAs: '_ctrlMain'
        })
});