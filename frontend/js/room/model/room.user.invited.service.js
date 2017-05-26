import module from '../';

module.service('roomUserInvitedService', function (roomUserInvitedResource) {

    function remove(data) {
        return roomUserInvitedResource.delete(data).$promise;
    }

    function save(data){
        return roomUserInvitedResource.save(data).$promise;
    }

    return {
        remove: remove,
        save: save
    }
});