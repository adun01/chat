import module from '../';
import conversationTpl from '../view/conversation.view.html'

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('main.conversation', {
            url: 'conversation/:id/',
            controller: 'conversationController',
            controllerAs: '_ctrlConversation',
            template: conversationTpl,
            resolve: {
                conversationData: function (conversationService, authService, userService, $stateParams, roomService, $q, $state, sideBarService, $mdDialog) {
                    let defer = $q.defer();

                    authService.isLogin().then(function (response) {
                        if (!response.success) {
                            $state.go('main.auth');
                            defer.resolve('auth is error');
                        } else {

                            conversationService.get({id: $stateParams.id}).then(function (response) {

                                if (response.success) {
                                    $mdDialog.cancel();
                                    sideBarService.unLocked();

                                    response.conversation.conversation = true;

                                    roomService.set(response.conversation);

                                    defer.resolve(response.conversation);
                                } else {
                                    $state.go('main.base', {
                                        message: response.message
                                    });
                                }
                            });
                        }
                    });

                    return defer.promise;
                }
            }
        });
});