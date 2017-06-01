import _ from 'lodash';
import 'angular';
import 'angular-ui-router';
import 'angular-material';
import 'angular-resource';
import '../../bower_components/angular-post-fix/postfix';
import 'angular-material-icons';
import 'angular-messages';
import 'angular-file-upload';
import 'hammerjs';

function importAll(r) {
    r.keys().forEach(r);
}

importAll(require.context('./', true, /\.js$/));

angular.module('chat', [
    'httpPostFix',
    'angularFileUpload',
    'ngMaterial',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngMdIcons',
    'notifications',
    'user',
    'common',
    'base',
    'auth',
    'registration',
    'room'])
    .config(function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {

        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        $stateProvider
            .state('main', {
                abstract: true,
                url: '/',
                template: '<div class="chat-layout"' +
                'layout="row"' +
                'layout-align="left top"' +
                'data-ui-view>',
                resolve: {
                    userData: function ($q, authService, $rootScope, userService) {
                        let defer = $q.defer();

                        authService.isLogin().then(function (response) {
                            if (!response.success) {
                                defer.resolve('auth is error');
                            } else {
                                userService.set(response.user);

                                $rootScope.$emit('isAuth');
                                defer.resolve('isAuth');
                            }
                        });
                        return defer.promise;
                    }

                }
            });

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/base/');

    }).run(function ($rootScope, $state, socketServiceMediator) {
});