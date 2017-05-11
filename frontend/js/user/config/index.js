import module from '../';
import userShowTpl from '../view/user.show.view.html';
import userEditTpl from '../view/user.edit.view.html';

module.config(function ($stateProvider) {
    $stateProvider
        .state('resolve.main.user-edit', {
            url: 'user/edit/',
            template: userEditTpl,
            controller: 'userEditController',
            controllerAs: '_ctrlUserEdit'
        })
        .state('resolve.main.user-show', {
            url: 'user/:name/',
            template: userShowTpl
        })
});