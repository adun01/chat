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
                conversationData: ($q, conversationService, authService, $stateParams) => {
                    let defer = $q.defer();

                    authService.isLogin().then((user) => {

                        if (!user) {
                            $state.go('main.auth');
                        } else {

                            conversationService.get($stateParams).then((response) => {
                                defer.resolve(response.conversation);
                            });
                        }
                    });
                    return defer.promise;
                }
            }
        });
});