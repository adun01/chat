const listUserOnline = (function () {
    let usersList = [];

    return {
        get: function (userId) {
            if (!userId) {
                return usersList;
            } else {
                return usersList.find(function (iUser) {
                    return userId === iUser.id;
                });
            }
        },
        add: function (user) {
            let currentUser = usersList.find(function (iUser) {
                return user.id === iUser.id;
            });

            if (!currentUser) {
                usersList.push(user);
            }

        },
        remove: function (userId) {
            usersList = usersList.filter(function (user) {
                return user.id !== userId;
            });
        }
    }
}());

module.exports = listUserOnline;