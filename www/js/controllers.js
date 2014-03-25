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

function graph(canvas, f) {
    if (null==canvas || !canvas.getContext) return;
    var axes={}, ctx=canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
    axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
    axes.scale = 40;                 // 40 pixels from x=0 to x=1
    axes.doNegativeX = true;
    showAxes(ctx,axes);
    funGraph(ctx,axes,f,"rgb(11,153,11)",1); 
}

function showAxes(ctx, axes) {
    var x0=axes.x0, w=ctx.canvas.width;
    var y0=axes.y0, h=ctx.canvas.height;
    var xmin = axes.doNegativeX ? 0 : x0;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)"; 
    ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
    ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
    ctx.stroke();
}

function funGraph (ctx,axes,func,color,thick) {
    var xx, yy, dx=4, x0=axes.x0, y0=axes.y0, scale=axes.scale;
    var iMax = Math.round((ctx.canvas.width-x0)/dx);
    var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    for (var i=iMin;i<=iMax;i++) {
        xx = dx*i; yy = scale*func.evaluate({x : xx/scale});
        if (i==iMin) ctx.moveTo(x0+xx,y0-yy);
        else         ctx.lineTo(x0+xx,y0-yy);
    }
    ctx.stroke();
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
        var xi     = parseFloat($scope.xi);
        var xs     = parseFloat($scope.xs);
        var tol    = parseFloat($scope.tol);
        var nIter  = parseInt($scope.nIter);
        var f      = Parser.parse($scope.equation);
        var canvas = document.getElementById("canvas");
        if (null==canvas || !canvas.getContext) return;
        graph(canvas, f);

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
    $scope.calculate = function() {
        var x0    = parseFloat($scope.x0);
        var tol   = parseFloat($scope.tol);
        var nIter = parseInt($scope.nIter);
        var f     = Parser.parse($scope.equation_f);
        var g     = Parser.parse($scope.equation_g);

        var fx0 = f.evaluate({x : x0});
        var error = tol + 1;
        var count = 0;

        while((fx0 != 0) && (error > tol) && (count < nIter)) {
            var xn = g.evaluate({x : x0});
            fx0    = f.evaluate({x : xn});
            error  = Math.abs(xn - x0);
            x0     = xn;
            count++; 
        }
        if(fx0 === 0) {
            $scope.root = x0;
        } else {
            if(error < tol) {
                $scope.root = "Root aproximation at " + x0 
                + " with a tolerance of " + tol;
            } else {
                $scope.root = "Failure after " + count + " iterations.";
            }
        }
    }
}

function NewtonCtrl($scope) {
    $scope.calculate = function() {
        var x0    = parseFloat($scope.x0);
        var tol   = parseFloat($scope.tol);
        var nIter = parseInt($scope.nIter);
        var f     = Parser.parse($scope.equation_f);
        var g     = Parser.parse($scope.equation_g);

        var fx0   = f.evaluate({x : x0});
        var dfx0  = g.evaluate({x : x0});
        var error = tol + 1;
        var count = 0;

        while((fx0 != 0) && (error > tol) && (dfx0 != 0) && (count < nIter)) {
            var xn = x0 - fx0 / dfx0;
            fx0    = f.evaluate({x : xn});
            dfx0   = g.evaluate({x : xn});
            error  = Math.abs(xn - x0);
            x0     = xn;
            count++; 
        }
        if(fx0 === 0) {
            $scope.root = x0;
        } else {
            if(error < tol) {
                $scope.root = "Root approximation at " + x0 
                + " with a tolerance of " + tol;
            } else {
                if(dfx0 === 0) {
                    $scope.root = xn + " may be a multiple root."
                } else {
                    $scope.root = "Failure after " + count + " iterations.";
                }
            }
        }
    }
}

function SecantCtrl($scope) {

}

function MultipleRootsCtrl($scope) {

}