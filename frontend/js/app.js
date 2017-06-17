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
    'components',
    'socket',
    'notifications',
    'user',
    'conversation',
    'common',
    'base',
    'auth',
    'registration',
    'room'])
    .config(($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) => {

        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        $stateProvider
            .state('main', {
                abstract: true,
                url: '/',
                template: '<div class="chat-layout-container"' +
                'layout="row"' +
                'layout-align="center center"' +
                'data-ui-view>'
            });

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/base/');

    }).run(($rootScope, $state, socketMediator) => {
});