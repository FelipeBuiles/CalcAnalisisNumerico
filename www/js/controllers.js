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
        var f       = Parser.parse($scope.equation);    
        var x0      = parseFloat($scope.x0);
        var delta   = parseFloat($scope.delta);
        var nIter   = parseInt($scope.nIter);
        
        var fx0 = f.evaluate({x:x0});
        if(fx0 === 0) {
            $scope.root = x0;
        } else {
            var x1 = x0 + delta;
            var counter = 1;
            var fx1 = f.evaluate({x:x1});
            while((fx0*fx1 > 0) && (counter <= nIter)) {
                x0 = x1;
                fx0 = fx1;
                x1 = x0 + delta;
                fx1 = f.evaluate({x:x1});
                counter++;
            }
            if(fx1 === 0){
                $scope.root = x1;
            } else {
                if(fx0*fx1 < 0) {
                    $scope.root = "(" + x0 + "," + x1 + ")";
                } else {
                    $scope.root = "failure after " + counter + " iterations";
                }
            }
        }
    }
}

function BisectionCtrl($scope) {
    $scope.calculate = function() {
        var xi    = parseFloat($scope.xi);
        var xs    = parseFloat($scope.xs);
        var tol   = parseFloat($scope.tol);
        var nIter = parseInt($scope.nIter);
        var f     = Parser.parse($scope.equation);

        var fxi = f.evaluate({x : xi});
        var fxs = f.evaluate({x : xs});
        if(fxi === 0) {
            $scope.root = xi;
        } else {
            if(fxs === 0) {
                $scope.root = xs;
            } else {
                if(fxi*fxs < 0) {
                    var xm  = (xi + xs) / 2;
                    var fxm = f.evaluate({x : xm});
                    var counter = 1;
                    var error = tol + 1;
                    while((error > tol) && (fxm != 0) && (counter < nIter)) {
                        if(fxi*fxm < 0) {
                            xs = xm;
                            fxs = f.evaluate({x : xm});
                        } else {
                            xi = xm;
                            fxi = f.evaluate({x : xm});
                        }
                        var xaux = xm;
                        xm = (xi + xs) / 2;
                        fxm = f.evaluate({x : xm});
                        error = Math.abs(xm - xaux);
                        counter++;
                    }
                    if(fxm === 0) {
                        $scope.root = xm;
                    } else {
                        if(error < tol) {
                            $scope.root = xm + " is a root approximation with a tolerance of " + tol;
                        } else {
                            $scope.root = "failure after" + nIter + " iterations";
                        }
                    }
                } else {
                    $scope.root = "invalid interval";
                }
            }
        }
    }
}

function FalsePositionCtrl($scope) {
    $scope.calculate = function() {
        var xi    = parseFloat($scope.xi);
        var xs    = parseFloat($scope.xs);
        var tol   = parseFloat($scope.tol);
        var nIter = parseInt($scope.nIter);
        var f     = Parser.parse($scope.equation);

        var fxi = f.evaluate({x : xi});
        var fxs = f.evaluate({x : xs});
        if(fxi === 0) {
            $scope.root = xi;
        } else {
            if(fxs === 0) {
                $scope.root = xs;
            } else {
                if(fxi*fxs < 0) {
                    var xm  = xi - (fxi * (xs-xi) / (fxs - fxi));
                    var fxm = f.evaluate({x : xm});
                    var counter = 1;
                    var error = tol + 1;
                    while((error > tol) && (fxm != 0) && (counter < nIter)) {
                        if(fxi*fxm < 0) {
                            xs = xm;
                            fxs = f.evaluate({x : xm});
                        } else {
                            xi = xm;
                            fxi = f.evaluate({x : xm});
                        }
                        var xaux = xm;
                        xm = xi - (fxi * (xs-xi) / (fxs - fxi));
                        fxm = f.evaluate({x : xm});
                        error = Math.abs(xm - xaux);
                        counter++;
                    }
                    if(fxm === 0) {
                        $scope.root = xm;
                    } else {
                        if(error < tol) {
                            $scope.root = xm + " is a root approximation with a tolerance of " + tol;
                        } else {
                            $scope.root = "failure after" + nIter + " iterations";
                        }
                    }
                } else {
                    $scope.root = "invalid interval";
                }
            }
        }
    }
}

function FixedPointCtrl($scope) {

}

function NewtonCtrl($scope) {

}

function SecantCtrl($scope) {

}

function MultipleRootsCtrl($scope) {

}