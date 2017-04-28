import _ from 'lodash';
import 'angular';
import 'angular-ui-router'
import 'angular-material';
import 'angular-material-icons';
import 'hammerjs';

function importAll(r) {
    r.keys().forEach(r);
}

importAll(require.context('./', true, /\.js$/));

angular.module('chat', ['ngMaterial', 'ui.router', 'ngMdIcons', 'main', 'auth', 'registration'])
    .config(function ($stateProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

    }).run(function ($state) {
});