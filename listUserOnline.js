const listUserOnline = (() => {
    let usersList = [];

    return {
        get: userId => {
            if (typeof userId === 'undefined') {
                return usersList;
            } else {
                return usersList.find(iUser => {
                    return userId === iUser.id;
                });
            }
        },
        add: user => {
            let currentUser = usersList.find(iUser => {
                return user.id === iUser.id;
            });

            if (!currentUser) {
                usersList.push(user);
            }

        },
        remove: userId => {
            usersList = usersList.filter(user => {
                return user.id !== userId;
            });
        }
    }
})();

module.exports = listUserOnline;