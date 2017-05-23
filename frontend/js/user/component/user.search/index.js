import module from '../../';
import userSearhTpl from './view/user.search.view.html';

module.component('userSearch', {
    controller: 'userSearchController',
    controllerAs: '_ctrlUserSearch',
    template: userSearhTpl
});