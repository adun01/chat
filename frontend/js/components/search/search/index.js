import module from '../../';
import searhTpl from './view/search.html';

module.component('search', {
    controller: 'searchController',
    controllerAs: '_ctrlSearch',
    template: searhTpl
});