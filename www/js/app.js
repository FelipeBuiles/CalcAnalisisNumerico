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
        $routeProvider.when('/eqOneVariable',
            {templateUrl: 'partials/eqOneVariableView.html',
            controller:  'HomeCtrl'});
        $routeProvider.when('/insertEquations1',
            {templateUrl: 'partials/insertEquations1View.html',
            controller: 'InsertEquations1Ctrl'});
        $routeProvider.when('/graph',
            {templateUrl: 'partials/graphView.html',
            controller: 'GraphCtrl'});
        $routeProvider.when('/incrementalSearch',   
            {templateUrl: 'partials/incrementalSearchView.html', 
             controller: 'IncrementalSearchCtrl'});
        $routeProvider.when('/bisection', 
            {templateUrl: 'partials/bisectionView.html', 
             controller: 'BisectionCtrl'});
        $routeProvider.when('/falsePosition',
            {templateUrl: 'partials/falsePositionView.html',
             controller: 'FalsePositionCtrl'});
        $routeProvider.when('/fixedPoint',
            {templateUrl: 'partials/fixedPointView.html',
             controller: 'FixedPointCtrl'});
        $routeProvider.when('/newton',
            {templateUrl: 'partials/newtonView.html',
             controller: 'NewtonCtrl'});
        $routeProvider.when('/secant',
            {templateUrl: 'partials/secantView.html',
             controller: 'SecantCtrl'});     
        $routeProvider.when('/multipleRoots',
            {templateUrl: 'partials/multipleRootsView.html',
             controller: 'MultipleRootsCtrl'});   
        $routeProvider.when('/linearEquationSystem',
            {templateUrl: 'partials/linearEquationSystemView.html',
             controller: 'HomeCtrl'});
        $routeProvider.when('/inserMatrix',
            {templateUrl: 'partials/inserMatrixView.html',
             controller: 'InserMatrix'});                                              
        $routeProvider.otherwise({redirectTo: '/'});
  }]);
