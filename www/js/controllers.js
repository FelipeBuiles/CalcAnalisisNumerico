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
    $scope.promptDegree = function () {
        $rootScope.matrixSize = prompt("Please enter the matrix size");
        localStorage.setItem("n", $rootScope.matrixSize);
        $rootScope.matrix = $scope.createMatrix($scope.matrixSize);
        $rootScope.vector = $scope.createVector($scope.matrixSize);
        navSvc.slidePage('/insertMatrix');
    };
    $scope.createMatrix = function(matSize) {
        var mat = [];
        for(var i=0; i<matSize; i++) {
            var row = [];
            for(var j=0; j<matSize; j++) {
                row.push({ value : ""});
            }
            mat.push(row);
        }
        return mat;
    };
    $scope.createVector = function(matSize) {
        var b = [];
        for(var i=0; i<matSize; i++) {
            b.push({value : ""});
        }
        return b;
    }
}

function graph(f) {
    var canvas = document.getElementById("canvas");
    if (null==canvas || !canvas.getContext) return;
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

function InsertEquations1Ctrl($scope,navSvc) {
    $scope.store = function() {
        localStorage.setItem("f", $scope.equation_f);
        localStorage.setItem("ff", $scope.equation_ff);
        localStorage.setItem("fff", $scope.equation_fff);
        localStorage.setItem("g", $scope.equation_g);
        navSvc.slidePage('/eqOneVariable');
    }
}

function InsertMatrixCtrl($scope,navSvc) {
    $scope.store = function() {
        for(var i=0; i<$scope.matrix.length; i++) {
            for(var j=0; j<$scope.matrix[0].length; j++) {
                localStorage.setItem("A"+i+j, $scope.matrix[i][j].value);
            }
            localStorage.setItem("b"+i, $scope.vector[i].value);
        }
        navSvc.slidePage('/linearEquations')
    }
}

function getMat(n) {
    var mat = [];
    for(var i=0; i<n; i++) {
        var row = [];
        for(var j=0; j<n; j++) {
            row.push(parseFloat(localStorage.getItem("A"+i+j)));
        }
        row.push(parseFloat(localStorage.getItem("b"+i)));
        mat.push(row);
    }
    return mat;
}

function drawTable(table, mat) {
    var celdas = [];
    for(var i=0; i<mat.length; i++) {
        var filaT = table.insertRow();
        var fila = [];
        for(var j=0; j<mat[0].length; j++) {
            fila.push(filaT.insertCell());
        }
        celdas.push(fila);
    }
    for(var i=0; i<mat.length; i++) {
        for(var j=0; j<mat[0].length; j++) {
            celdas[mat.length-1-i][mat[0].length-1-j].innerHTML = mat[i][j];
        }
    }
}

function simple_geCtrl($scope) {
    var n = parseFloat(localStorage.getItem("n"));
    var a = getMat(n);
    $scope.calc = function() {
        for(var k=1; k<n; k++) {
            for(var i=k; i<n; i++) {
                if(a[i][i] != 0) {
                    var mult = a[i][k] / a[k][k]
                    for(var j=0; j<=n; j++) {
                        a[i][j] -= mult * a[k][j]
                    }
                } else {
                    alert("There's a zero in the diagonal, try another method.")
                }
            }
        }
        var table = document.getElementById("table");
        drawTable(table, a);    
    }
}

function ge_partialCtrl($scope) {
    
}

function ge_totalCtrl($scope) {
    
}

function ge_steppedCtrl($scope) {
    
}

function lu_doolittleCtrl($scope) {
    
}

function lu_choleskyCtrl($scope) {
    
}

function lu_croutCtrl($scope) {
    
}

function jacobiCtrl($scope) {
    
}

function gauss-seidelCtrl($scope) {
    
}

function GraphCtrl($scope) {
    var f = localStorage.getItem("f");
    if (f === "undefined" || f === null) {
        $scope.f = "";
    } else {
        $scope.f = f;
    }
    $scope.graph = function() {
        f = Parser.parse($scope.f);
        graph(f);
    }
}

function IncrementalSearchTable(x0,fx0)
{
    var table  = document.getElementById("table");
    var fila   = table.insertRow(table.rows.length);
    var celdaX = fila.insertCell(0);
    var celdaY = fila.insertCell(1);
    celdaX.innerHTML = x0;
    celdaY.innerHTML = fx0;
}

function BisectFalseTable(xi,xs,xm,fxm,error)
{
    var table   = document.getElementById("table");
    var fila    = table.insertRow(table.rows.length);
    var celdaXi = fila.insertCell(0);
    var celdaXs = fila.insertCell(1);
    var celdaXm = fila.insertCell(2);
    var celdaFxm = fila.insertCell(3);
    var celdaError = fila.insertCell(4);
    celdaXi.innerHTML  = xi;
    celdaXs.innerHTML  = xs;
    celdaXm.innerHTML  = xm;
    celdaFxm.innerHTML = fxm;
    celdaError.innerHTML = error;
}

function FixedSecantTable(x0,fx0,error)
{
    var table    = document.getElementById("table");
    var fila     = table.insertRow(table.rows.length);
    var celdaXn  = fila.insertCell(0);
    var celdaFxn = fila.insertCell(1);
    var celdaError = fila.insertCell(2);
    celdaXn.innerHTML  = x0;
    celdaFxn.innerHTML = fx0;
    celdaError.innerHTML = error;
}

function NewtonTable(x0,fx0,dfx0,error)
{
    var table    = document.getElementById("table");
    var fila     = table.insertRow(table.rows.length);
    var celdaXn  = fila.insertCell(0);
    var celdaFxn = fila.insertCell(1);
    var celdaFFxn = fila.insertCell(2);
    var celdaError = fila.insertCell(3);
    celdaXn.innerHTML  = x0;
    celdaFxn.innerHTML = fx0;
    celdaFFxn.innerHTML = dfx0;
    celdaError.innerHTML = error;
}

function MulRootsTable(x0,fx0,f1x0,f2x0,error)
{
    var table     = document.getElementById("table");
    var fila      = table.insertRow(table.rows.length);
    var celdaXn   = fila.insertCell(0);
    var celdaFxn  = fila.insertCell(1);
    var celdaFFxn = fila.insertCell(2);
    var celdaFFFxn = fila.insertCell(3);
    var celdaError = fila.insertCell(4);
    celdaXn.innerHTML  = x0;
    celdaFxn.innerHTML = fx0;
    celdaFFxn.innerHTML = f1x0;
    celdaFFFxn.innerHTML = f2x0;
    celdaError.innerHTML = error;
}


function IncrementalSearchCtrl($scope) {
    var f = localStorage.getItem("f");
    if (f === "undefined" || f === null) {
        $scope.f = "";
    } else {
        $scope.f = f;
    }
    $scope.calculate = function() {
        var f       = Parser.parse($scope.f);    
        var x0      = parseFloat($scope.x0);
        var delta   = parseFloat($scope.delta);
        var nIter   = parseInt($scope.nIter);
        var fx0 = f.evaluate({x:x0});
        var table = document.getElementById("table");
        table.innerHTML = '<tr id="heading"><th>X</th><th>Y</th></tr>';
        IncrementalSearchTable(x0,fx0)
        if(fx0 === 0) {
            $scope.root = x0;
        } else {
            var x1 = x0 + delta;
            var counter = 1;
            var fx1 = f.evaluate({x:x1});
            IncrementalSearchTable(x0,fx0)
            while((fx0*fx1 > 0) && (counter <= nIter)) {
                x0 = x1;
                fx0 = fx1;
                x1 = x0 + delta;
                fx1 = f.evaluate({x:x1});
                IncrementalSearchTable(x0,fx0)
                counter++;
            }
            if(fx1 === 0){
                $scope.root = x1;
                alert($scope.root);
            } else {
                if(fx0*fx1 < 0) {
                    $scope.root = "(" + x0 + "," + x1 + ")";
                    alert($scope.root);
                } else {
                    $scope.root = "failure after " + nIter + " iterations";
                    alert($scope.root);
                }
            }
        }
    }
}

function BisectionCtrl($scope) {
    var f = localStorage.getItem("f");
    if(f === "undefined" || f === null){
        $scope.f = "";
    }else{
        $scope.f = f;
    }
    $scope.calculate = function() {
        var xi     = parseFloat($scope.xi);
        var xs     = parseFloat($scope.xs);
        var tol    = parseFloat($scope.tol);
        var nIter  = parseInt($scope.nIter);
        var f      = Parser.parse($scope.f);

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
                    var table = document.getElementById("table");
                    table.innerHTML = '<tr id="heading"><th>Xi</th><th>Xs</th><th>Xm</th><th>f(Xm)</th><th>Error</th></tr>';
                    BisectFalseTable(xi,xs,xm,fxm,error);
                    while((error > tol) && (fxm != 0) && (counter < nIter)) {
                        if(fxi*fxm < 0) {
                            xs = xm;
                            fxs = f.evaluate({x : xm});
                            BisectFalseTable(xi,xs,xm,fxm,error);
                        } else {
                            xi = xm;
                            fxi = f.evaluate({x : xm});
                            BisectFalseTable(xi,xs,xm,fxm,error);
                        }
                        var xaux = xm;
                        xm = (xi + xs) / 2;
                        fxm = f.evaluate({x : xm});
                        error = Math.abs(xm - xaux);
                        counter++;

                        BisectFalseTable(xi,xs,xm,fxm,error);
                    }
                    if(fxm === 0) {
                        $scope.root = xm;
                    } else {
                        if(error < tol) {
                            $scope.root = xm + " is a root approximation with a tolerance of " + tol;
                            alert($scope.root);
                        } else {
                            $scope.root = "failure after" + nIter + " iterations";
                            alert($scope.root);
                        }
                    }
                } else {
                    $scope.root = "invalid interval";
                    alert($scope.root);
                }
            }
        }
    }
}

function FalsePositionCtrl($scope) {
    var f = localStorage.getItem("f");
    if(f === "undefined" || f === null){
        $scope.f = "";
    }else{
        $scope.f = f;
    }
    $scope.calculate = function() {
        var xi    = parseFloat($scope.xi);
        var xs    = parseFloat($scope.xs);
        var tol   = parseFloat($scope.tol);
        var nIter = parseInt($scope.nIter);
        var f     = Parser.parse($scope.f);

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
                    var table = document.getElementById("table");
                    table.innerHTML = '<tr id="heading"><th>Xi</th><th>Xs</th><th>Xm</th><th>f(Xm)</th><th>Error</th></tr>';
                    BisectFalseTable(xi,xs,xm,fxm,error);
                    while((error > tol) && (fxm != 0) && (counter < nIter)) {
                        if(fxi*fxm < 0) {
                            xs = xm;
                            fxs = f.evaluate({x : xm});
                            BisectFalseTable(xi,xs,xm,fxm,error);
                        } else {
                            xi = xm;
                            fxi = f.evaluate({x : xm});
                            BisectFalseTable(xi,xs,xm,fxm,error);
                        }
                        var xaux = xm;
                        xm = xi - (fxi * (xs-xi) / (fxs - fxi));
                        fxm = f.evaluate({x : xm});
                        error = Math.abs(xm - xaux);
                        counter++;
                        BisectFalseTable(xi,xs,xm,fxm,error);
                    }
                    if(fxm === 0) {
                        $scope.root = xm;
                    } else {
                        if(error < tol) {
                            $scope.root = xm + " is a root approximation with a tolerance of " + tol;
                            alert($scope.root);
                        } else {
                            $scope.root = "failure after" + nIter + " iterations";
                            alert($scope.root);
                        }
                    }
                } else {
                    $scope.root = "invalid interval";
                    alert($scope.root);
                }
            }
        }
    }
}

function FixedPointCtrl($scope) {
    var f = localStorage.getItem("f");
    var g = localStorage.getItem("g");
    if(f === "undefined" || f === null){
        $scope.f = "";
    }else{
        $scope.f = f;
    }
    if(g === "undefined" || g === null) {
        $scope.g = "";
    } else {
        $scope.g = g;
    }
    $scope.calculate = function() {
        var x0    = parseFloat($scope.x0);
        var tol   = parseFloat($scope.tol);
        var nIter = parseInt($scope.nIter);
        var f     = Parser.parse($scope.f);
        var g     = Parser.parse($scope.g);

        var fx0 = f.evaluate({x : x0});
        var error = tol + 1;
        var count = 0;
        
        var table = document.getElementById("table");
        table.innerHTML = '<tr id="heading"><th>Xn</th><th>f(Xn)</th><th>Error</th></tr>';
        FixedPointTable(x0,fx0,error);

        while((fx0 != 0) && (error > tol) && (count < nIter)) {
            var xn = g.evaluate({x : x0});
            fx0    = f.evaluate({x : xn});
            error  = Math.abs(xn - x0);
            x0     = xn;
            count++; 
            FixedPointTable(x0,fx0,error);
        }
        if(fx0 === 0) {
            $scope.root = x0;
        } else {
            if(error < tol) {
                $scope.root = "Root aproximation at " + x0 
                + " with a tolerance of " + tol;
                alert($scope.root);
            } else {
                $scope.root = "Failure after " + nIter + " iterations.";
                alert($scope.root);
            }
        }
    }
}

function NewtonCtrl($scope) {
    var f  = localStorage.getItem("f");
    var ff = localStorage.getItem("ff");
    if(f === "undefined" || f === null){
        $scope.f = "";
    }else{
        $scope.f = f;
    }
    if(ff === "undefined" || ff === null) {
        $scope.ff = "";
    } else {
        $scope.ff = ff;
    }
    $scope.calculate = function() {
        var x0    = parseFloat($scope.x0);
        var tol   = parseFloat($scope.tol);
        var nIter = parseInt($scope.nIter);
        var f     = Parser.parse($scope.f);
        var ff    = Parser.parse($scope.ff);
        
        var fx0   = f.evaluate({x : x0});
        var dfx0  = ff.evaluate({x : x0});
        var error = tol + 1;
        var count = 0;
        
        var table = document.getElementById("table");
        table.innerHTML = '<tr id="heading"><th>Xn</th><th>f(Xn)</th><th>f&apos;(Xn)</th><th>Error</th></tr>';
        NewtonTable(x0,fx0,dfx0,error);

        while((fx0 != 0) && (error > tol) && (dfx0 != 0) && (count < nIter)) {
            var xn = x0 - fx0 / dfx0;
            fx0    = f.evaluate({x : xn});
            dfx0   = ff.evaluate({x : xn});
            error  = Math.abs(xn - x0);
            x0     = xn;
            count++; 
            NewtonTable(x0,fx0,dfx0,error);
        }
        if(fx0 === 0) {
            $scope.root = x0;
        } else {
            if(error < tol) {
                $scope.root = "Root approximation at " + x0 
                + " with a tolerance of " + tol;
                alert($scope.root);
            } else {
                if(dfx0 === 0) {
                    $scope.root = xn + " may be a multiple root.";
                    alert($scope.root);
                } else {
                    $scope.root = "Failure after " + nIter + " iterations.";
                    alert($scope.root);
                }
            }
        }
    }
}

function SecantCtrl($scope)
{
    var f = localStorage.getItem("f");
    if(f === "undefined" || f === null){
        $scope.f = "";
    }else{
        $scope.f = f;
    }
    $scope.calculate = function()
    {
        var x0    = parseFloat($scope.x0);
        var x1    = parseFloat($scope.x1);
        var nIter = parseInt($scope.nIter);
        var f     = Parser.parse($scope.f);
        var tol   = parseFloat($scope.tol);

        var fx0 = f.evaluate({x:x0});

        if(fx0 === 0)
        {
            $scope.root = x0;
        }else{
            var fx1   = f.evaluate({x:x1});
            var count = 0;
            var error = tol + 1;
            var den   = fx1 - fx0;
            
            var table = document.getElementById("table");
            table.innerHTML = '<tr id="heading"><th>Xn</th><th>f(Xn)</th><th>Error</th></tr>';
            FixedSecantTable(x0,fx0,error);

            while( (error>tol) && (fx1 != 0) && (den != 0) && (count < nIter))
            {
                var x2 = x1-(fx1*(x1-x0)/den);
                error  = Math.abs(x2-x1);
                x0     = x1;
                fx0    = fx1;
                x1     = x2;
                fx1    = f.evaluate({x:x1});
                den    = fx1 - fx0;
                count++;
                FixedSecantTable(x0,fx0,error);
            }

            if(fx1 === 0)
            {
                $scope.root = x1;
            } else {
                if(error<tol)
                {
                    $scope.root = "Root approximation at " + x1 
                    + " with a tolerance of " + tol;
                    alert($scope.root);
                } else {
                    if(den === 0)
                    {   
                        $scope.root = "Posible multiple root";
                        alert($scope.root);
                    } else {
                        $scope.root = "Failure after " + nIter + " iterations.";
                        alert($scope.root);
                    }
                }
            }
        }
    }
}

function MultipleRootsCtrl($scope)
{
    var f   = localStorage.getItem("f");
    var ff  = localStorage.getItem("ff");
    var fff = localStorage.getItem("fff");
    if(f === "undefined" || f === null){
        $scope.f = "";
    }else{
        $scope.f = f;
    }
    if(ff === "undefined" || ff === null) {
        $scope.ff = "";
    } else {
        $scope.ff = ff;
    }
    if(fff === "undefined" || fff === null) {
        $scope.fff = "";
    } else {
        $scope.fff = fff;
    }
    $scope.calculate = function()
    {
        var f     = Parser.parse($scope.f);
        var f1    = Parser.parse($scope.ff);
        var f2    = Parser.parse($scope.fff);
        var x0    = parseFloat($scope.x0);
        var tol   = parseFloat($scope.tol);
        var nIter = parseInt($scope.nIter);

        var fx0  = f.evaluate({x:x0});
        var f1x0 = f1.evaluate({x:x0});
        var f2x0 = f2.evaluate({x:x0});

        var count = 0;
        var error = tol + 1;
        var den   = (f1x0*f1x0) - (fx0*f2x0);

        var table = document.getElementById("table");
        table.innerHTML = '<tr id="heading"><th>Xn</th><th>f(Xn)</th><th>f&apos;(Xn)</th><th>f&apos;&apos;(Xn)</th><th>Error</th></tr>';
        MulRootsTable(x0,fx0,f1x0,f2x0,error);

        while( (error>tol) && (fx0 != 0) && (den != 0) && (count < nIter))
        {
            var xn = x0-((fx0*f1x0)/den);
            fx0   = f.evaluate({x:xn});
            f1x0  = f1.evaluate({x:xn});
            f2x0  = f2.evaluate({x:xn});
            error = Math.abs(xn-x0);
            x0 = xn;
            den   = (f1x0*f1x0) - (fx0*f2x0);
            count++;
            MulRootsTable(x0,fx0,f1x0,f2x0,error);
        }
        if(fx0 === 0)
        {
            $scope.root = x0;
        } else {
            if(error<tol)
            {
                $scope.root = "Root approximation at " + x0
                + " with a tolerance of " + tol;
                alert($scope.root);
            } else {
                if(den === 0)
                {   
                    $scope.root = "Posible multiple root";
                    alert($scope.root);
                } else {
                    $scope.root = "Failure after " + nIter + " iterations.";
                    alert($scope.root);
                }
            }
        }
    }
}