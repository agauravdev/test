numshapes=0;
var shapes = {};
var transformations = {
    1 : new TMatrix("tr", xcoor(2),ycoor(2))
};
var transformedshapes = {};

numshapes=-1;

function getRandomColor() {
    color = "hsla(" + Math.random() * 360 + ", 100%, 75%, 0.75)";
    return color;
}

function drawShapes() {
    for (var id in shapes)
    {
        // console.log(shapes[id]);
        ctx.beginPath();
        ctx.moveTo(shapes[id][0]['x'], shapes[id][0]['y']);
        for (var point in shapes[id])
        {
            // console.log(shapes[id][point]);
            ctx.lineTo(shapes[id][point]['x'], shapes[id][point]['y']);
        }
        ctx.strokeStyle=getRandomColor();
        console.log(ctx.strokeStyle);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle=ctx.strokeStyle;
        ctx.fill();
        console.log(ctx);
    }
}
function validatecustominput()
{
    return true;
}

$("#customShapeSubmit").click(function () {
    if(validatecustominput())
    {
        numshapes = numshapes+1;
        shapes[numshapes]=[];
        for (var i = 1; i <= pointnum; i = i+1)
        {
            xc="cptx"+i;
            yc="cpty"+i;
            var x = xcoor(parseInt($("#"+xc).val()));
            var y = ycoor(parseInt($("#"+yc).val()));
            var pt = new Point(x,y);
            shapes[numshapes].push(pt);
        }
        drawShapes();
    }
})

function drawTransformedShapes() {
    for (var id in transformedshapes)
    {
        ctx.clearRect(0,0,width,height);
        drawGrid();
        // console.log(shapes[id]);
        ctx.beginPath();
        ctx.moveTo(transformedshapes[id][0]['x'], transformedshapes[id][0]['y']);
        for (var point in transformedshapes[id])
        {
            console.log(shapes[id][point]);
            ctx.lineTo(transformedshapes[id][point]['x'], transformedshapes[id][point]['y']);
        }
        ctx.strokeStyle=getRandomColor();
        console.log(ctx.strokeStyle);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle=ctx.strokeStyle;
        ctx.fill();
        console.log(ctx);
    }
}


$("#transform").click(function () {
    for(var ids in shapes)
    {
        transformedshapes[ids]=[];
        // console.log(shapes[id]);
        for (idp in shapes[ids])
        {
            for(idt in transformations)
            {
                t = shapes[ids][idp].mat.multiply(transformations[idt].mat);
                var pt= new Point(t.mat[0][0],t.mat[0][1]);
                transformedshapes[ids].push(pt);
            }
        }
    }
    drawTransformedShapes();
})