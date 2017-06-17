import module from '../../../';

module.service('searchService', function (searchResource, $q) {

    function shortNameGenerate(name) {
        return name[0] + '' + name[1];
    }

    function get(data) {
        let defer = $q.defer();

        searchResource.get(data).$promise.then(function (response) {

            let collection = response.collection.map(function (room) {
                if (room.room) {
                    room.shortName = shortNameGenerate(room.name);
                }
                return room;
            });

            defer.resolve(collection);
        });

        return defer.promise;
    }

    return {
        get: get
    }
});