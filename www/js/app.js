'use strict';

function jsonp_callback(data) {
    // returning from async callbacks is (generally) meaningless
    console.log(data.found);
}


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ajoslin.mobile-navigate','ngMobile'])
    .config(function ($compileProvider){
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/',                    
            {templateUrl: 'partials/homeView.html', 
             controller: 'HomeCtrl'});
        $routeProvider.when('/incrementalSearch',   
            {templateUrl: 'partials/incrementalSearchView.html', 
             controller: 'IncrementalSearchCtrl'});
        $routeProvider.when('/bisection', 
            {templateUrl: 'partials/bisectionView.html', 
             controller: 'BisectionCtrl'});
        $routeProvider.when('/falsePosition',
            {templateUrl: 'partials/falsePositionView.html',
             controller: 'FalsePositionCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
  }]);
