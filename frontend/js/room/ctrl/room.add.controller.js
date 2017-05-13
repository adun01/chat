import module from '../';

module.controller('roomAddController', function (FileUploader, $q, $timeout, userService) {

    const roomAddCtrl = this;

    roomAddCtrl.searchUsers = searchUsers;

    roomAddCtrl.userInvited = [];

    roomAddCtrl.data = {
        error: []
    };

    function searchUsers(query) {
        var deferred = $q.defer();
        if (query) {
            userService.search({query: query}).then(function (users) {
                roomAddCtrl.users = users;
                deferred.resolve(users);
            });
        } else {
            deferred.resolve([]);
        }
        return deferred.promise;
    }

    roomAddCtrl.uploader = new FileUploader({
        url: 'api/room/',
        filters: [
            {
                name: 'extensions',
                fn: function (item) {
                    if (!(/\.(jpg|jpeg|png)$/i).test(item.name)) {
                        roomAddCtrl.data.error.push('Формат файла должен быть jpg, jpeg, png');
                    } else {
                        roomAddCtrl.removeError();
                        return true;
                    }
                }
            }, {
                name: 'fileSize',
                fn: function (item) {
                    if (item.size > 200000) {
                        roomAddCtrl.data.error.push('Размер файла не должен превышать 2мб');
                    } else {
                        roomAddCtrl.removeError();
                        return true;
                    }
                }
            }
        ],
        queueLimit: 1,
        method: 'PUT',
        removeAfterUpload: true,
        onErrorItem: function () {
            roomAddCtrl.data.error.push('Сервер погиб. Попробуйте позже');
        },
        onCompleteItem: function (item, response) {
            roomAddCtrl.handlerResponse(response);
        }
    });

    roomAddCtrl.removeError = function () {
        roomAddCtrl.data.error = [];
    };

});