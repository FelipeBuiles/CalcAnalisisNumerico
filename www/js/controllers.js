'use strict';

/* Controllers */
function HomeCtrl($scope,navSvc,$rootScope) {
    $rootScope.showSettings = false;
    $scope.slidePage = function (path,type) {
        navSvc.slidePage(path,type);
    };
    $scope.back = function () {
        navSvc.back();
    };
    $scope.changeSettings = function () {
        $rootScope.showSettings = true;
    };
    $scope.closeOverlay = function () {
        $rootScope.showSettings = false;
    };
}

function IncrementalSearchCtrl($scope) {
    $scope.calculate = function() {
        var x0      = parseInt($scope.x0);
        var delta   = parseInt($scope.delta);
        var nIter   = parseInt($scope.nIter);

        var fx0 = f(x0);

        if(fx0 === 0) {
            $scope.root = fx0;
        } else {
            var x1 = f(x0) + delta;
            var counter = 1;
            var fx1 = f(x1);
            while((fx0*fx1 > 0) && (counter <= nIter)) {
                x0 = x1;
                fx0 = fx1;
                x1 = x0 + delta;
                fx1 = f(x1);
                counter++;
            }
            if(fx1 === 0){
                $scope.root = fx1;
            } else {
                if(fx0*fx1 < 0) {
                    $scope.root = "between " + x0 + " and " + x1;
                } else {
                    $scope.root = "failure after " + nIter + " iterations";
                }
            }
        }
    }
}

function BisectionCtrl($scope) {
}

function f(x){
    return 0;
}