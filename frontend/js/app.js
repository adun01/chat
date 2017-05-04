import _ from 'lodash';
import 'angular';
import 'angular-ui-router'
import 'angular-material';
import 'angular-resource';
import '../../bower_components/angular-post-fix/postfix';
import 'angular-material-icons';
import 'angular-messages';
import 'hammerjs';

function importAll(r) {
    r.keys().forEach(r);
}

importAll(require.context('./', true, /\.js$/));

angular.module('chat', [
    'httpPostFix',
    'ngMaterial',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngMdIcons',
    'user',
    'common',
    'main',
    'auth',
    'registration',
    'room'])
    .config(function ($stateProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

    }).run(function () {
});