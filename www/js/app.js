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
        
        /*
            Selección de capitulo
         */
        $routeProvider.when('/eqOneVariable',
            {templateUrl: 'partials/eqOneVariableView.html',
            controller:  'HomeCtrl'});
        $routeProvider.when('/linearEquations',
            {templateUrl: 'partials/linearEquationSystemView.html',
             controller: 'HomeCtrl'});
        $routeProvider.when('/interpolation',
            {templateUrl: 'partials/interpolationView.html',
             controller: 'HomeCtrl'});
        $routeProvider.when('/integration',
            {templateUrl: 'partials/integrationView.html',
             controller: 'HomeCtrl'});
        
        /*
            Raíces de una ecuación
         */
        $routeProvider.when('/insertEquations1',
            {templateUrl: 'partials/insertEquations1View.html',
            controller: 'InsertEquations1Ctrl'});
        $routeProvider.when('/graph',
            {templateUrl: 'partials/oneVar/graphView.html',
            controller: 'GraphCtrl'});
        $routeProvider.when('/incrementalSearch',   
            {templateUrl: 'partials/oneVar/incrementalSearchView.html', 
             controller: 'IncrementalSearchCtrl'});
        $routeProvider.when('/bisection', 
            {templateUrl: 'partials/oneVar/bisectionView.html', 
             controller: 'BisectionCtrl'});
        $routeProvider.when('/falsePosition',
            {templateUrl: 'partials/oneVar/falsePositionView.html',
             controller: 'FalsePositionCtrl'});
        $routeProvider.when('/fixedPoint',
            {templateUrl: 'partials/oneVar/fixedPointView.html',
             controller: 'FixedPointCtrl'});
        $routeProvider.when('/newton',
            {templateUrl: 'partials/oneVar/newtonView.html',
             controller: 'NewtonCtrl'});
        $routeProvider.when('/secant',
            {templateUrl: 'partials/oneVar/secantView.html',
             controller: 'SecantCtrl'});     
        $routeProvider.when('/multipleRoots',
            {templateUrl: 'partials/oneVar/multipleRootsView.html',
             controller: 'MultipleRootsCtrl'});   

        /*
            Sistemas de ecuaciones
         */
        $routeProvider.when('/insertMatrix',
            {templateUrl: 'partials/insertMatrixView.html',
             controller: 'InsertMatrixCtrl'}); 
        $routeProvider.when('/simple_ge',
            {templateUrl: 'partials/eqSys/simple_geView.html',
             controller: 'simple_geCtrl'});
        $routeProvider.when('/ge_total',
            {templateUrl: 'partials/eqSys/ge_totalView.html',
             controller: 'ge_totalCtrl'});
        $routeProvider.when('/ge_partial',
            {templateUrl: 'partials/eqSys/ge_partialView.html',
             controller: 'ge_partialCtrl'});
        $routeProvider.when('/ge_stepped',
            {templateUrl: 'partials/eqSys/ge_steppedView.html',
             controller: 'ge_steppedCtrl'});
        $routeProvider.when('/lu_doolittle',
            {templateUrl: 'partials/eqSys/lu_doolittleView.html',
             controller: 'lu_doolittleCtrl'});
        $routeProvider.when('/lu_cholesky',
            {templateUrl: 'partials/eqSys/lu_choleskyView.html',
             controller: 'lu_choleskyCtrl'});
        $routeProvider.when('/lu_crout',
            {templateUrl: 'partials/eqSys/lu_croutView.html',
             controller: 'lu_croutCtrl'});
        $routeProvider.when('/jacobi',
            {templateUrl: 'partials/eqSys/jacobiView.html',
             controller: 'jacobiCtrl'});
        $routeProvider.when('/gauss-seidel',
            {templateUrl: 'partials/eqSys/gauss-seidelView.html',
             controller: 'gauss-seidelCtrl'});
        
        $routeProvider.otherwise({redirectTo: '/'});
  }]);
