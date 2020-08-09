const CANVAS = document.querySelector('#jsCanvas')
const CTX = CANVAS.getContext("2d");
const COLORS_ELEMENTS = document.querySelectorAll('.controls__color');
const RANGE = document.querySelector('#jsRange');
const MODE = document.querySelector('#jsMode');
const SAVE = document.querySelector('#jsSave');

CANVAS.width=700;
CANVAS.height=700;
CTX.strokeStyle = '#2c2c2c';
CTX.fillStyle = '#2c2c2c';
CTX.lineWidth = 2.5;


let painting = false;
filling = false;


function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        CTX.beginPath();
        CTX.moveTo(x,y);
    }else{
        CTX.lineTo(x,y);
        CTX.stroke()
    }
}

function onMouseDown(event){
    painting = true;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        MODE.innerText = 'fill';
    }else{
        filling = true;
        painting = false;
        MODE.innerText = 'Stroke';
    }
}


function changeColor(event){
    CTX.strokeStyle=event.target.style.backgroundColor;
    CTX.fillStyle=event.target.style.backgroundColor;
}

function changeLineWidth(event){
    CTX.lineWidth = event.target.value;
}
    
function fillWholeCanvas(){
    if(filling===true){
        CTX.fillRect(0,0,700,700);
    }
}

function saveCanvas(){
    const IMG = CANVAS.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = IMG;
    link.download = 'img.png';
    link.click();
    link.remove();
}

if(CANVAS){
    CANVAS.addEventListener('mousemove',onMouseMove);
    CANVAS.addEventListener('mousedown',startPainting);
    CANVAS.addEventListener('mouseup',stopPainting);
    CANVAS.addEventListener('mouseleave',stopPainting);
    CANVAS.addEventListener('click',fillWholeCanvas);
}

for(var i=0;i<COLORS_ELEMENTS.length;i++){
    COLORS_ELEMENTS[i].addEventListener('click', changeColor)
}

if(MODE){
    MODE.addEventListener('click', handleModeClick);
}

if(RANGE){
    RANGE.oninput = changeLineWidth;
}

if(SAVE){
    SAVE.addEventListener('click',saveCanvas, false);
}

