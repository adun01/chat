import _ from 'lodash';
import 'angular';
import 'angular-ui-router'
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
    'main',
    'auth',
    'registration',
    'room'])
    .config(function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {

        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/room/');

    }).run(function ($rootScope, $state) {

    $rootScope.$on('$stateChangeStart',
        function (event, toState) {
            if (toState.name === 'resolve') {
                event.preventDefault();
                $state.go('resolve.main');
            }
        });
});