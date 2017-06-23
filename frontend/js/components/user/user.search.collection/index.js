import module from '../../';
import userSearchTpl from './view/user.search.collection.view.html';

module.directive('userSearchCollection', function () {
    return {
        template: userSearchTpl,
        controller: 'userSearchCollectionController',
        controllerAs: '_ctrlSearchColl',
        scope: {
            collection: '=',
            addRoom: '='
        },
    };
});