function sketchBoxCreation(size){

    //initialize counting for .SketchCaseNumber${j}
    let j = 1;

    //create .SketchSub divs inside .SketchBoxContainer
    for(let i = 1; i <= size; i++){
        let newContainer = "";
        const parent = document.querySelector(".SketchBoxContainer");
        newContainer = document.createElement("div");
        newContainer.classList.add(`SketchSubContainer${i}`);
        newContainer.classList.add(`SketchSub`);
        parent.appendChild(newContainer);

    //create .SketchCase divs inside .SketchSub divs
        for( j ; j <= size*i; j++){
            let newDiv = "";
            const parent = document.querySelector(`.SketchSubContainer${i}`);
            newDiv = document.createElement("div");
            newDiv.classList.add(`SketchCaseNumber${j}`);
            newDiv.classList.add(`SketchCase`);
            parent.appendChild(newDiv);  
        };
    };    
};

    //reset the sketchBoxContainer and change it's size according to user input

function change(){
    const parent = document.querySelector(".SketchBoxContainer");
    parent.innerHTML = "";
    sketchBoxCreation(gridSize.value);
};

    //Passively survey the range-button

const gridSize = document.getElementById("gridSize");
gridSize.addEventListener("mouseup",change());

    //color the cases in black

function blackBoxColor(data){
    const boxClassesInString = data.target.className;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`.SketchCaseNumber${boxNumber}`);
    boxToColor.setAttribute("style", "background-color: black;");
};

    //color the cases in rainbow style

const randomNumber = () => {return Math.floor(Math.random()*255)};
const randomColor = () => {
    const r = randomNumber(255);
    const g = randomNumber(255);
    const b = randomNumber(255);
    return `rgb(${r}, ${g}, ${b})`
};

function rainbowBoxColor(data){
    const boxClassesInString = data.target.className;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`.SketchCaseNumber${boxNumber}`);
    boxToColor.setAttribute("style", `background-color: ${randomColor()};`);
};


    //chose the right color for the cases

let redValue;
let greenValue;
let blueValue;
let hexValue;

function changeInValue(){
    redValue = document.querySelector("#ValueRed").value;
    greenValue = document.querySelector("#ValueGreen").value;
    blueValue = document.querySelector("#ValueBlue").value;
    hexValue = document.querySelector("#ColorChoice").value;
    return console.log(redValue, greenValue, blueValue, hexValue)
};

    //set the sampler

document.addEventListener("click", (e)=>{
    const clickOnButtonSample = e.target.id;
    console.log(clickOnButtonSample, redValue, greenValue, blueValue);
    if (clickOnButtonSample == "HexSampleTest"){
        const sampleBoxColoring = document.querySelector(`.HexSampleColor`);
        sampleBoxColoring.setAttribute("style", `background-color: ${hexValue};`);
    }
    else if(clickOnButtonSample == "RGBSampleTest"){
        const sampleBoxColoring = document.querySelector(`.RGBSampleColor`);
        console.log(sampleBoxColoring);
        sampleBoxColoring.setAttribute("style", `background-color: RGB(${redValue}, ${greenValue}, ${blueValue});`);
    }
});

    // color the case with my RGB choice

function myRGBBoxColor(data){
    const boxClassesInString = data.target.className;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`.SketchCaseNumber${boxNumber}`);
    boxToColor.setAttribute("style", `background-color: RGB(${redValue}, ${greenValue}, ${blueValue});`);
};
    
    // color the case with my Hex choice
    
function myHexBoxColor(data){
    const boxClassesInString = data.target.className;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`.SketchCaseNumber${boxNumber}`);
    boxToColor.setAttribute("style", `background-color: ${hexValue};`);
};

    // store a RGB color in the palette

function myRGBColorPalette(data)
{
    const boxClassesInString = data.target.id;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`#ColorPalette${boxNumber}`);
    boxToColor.setAttribute("style", `background-color: RGB(${redValue}, ${greenValue}, ${blueValue});`);
}

    // store a Hex color in the palette

function myHexColorPalette(data)
{
    const boxClassesInString = data.target.id;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`#ColorPalette${boxNumber}`);
    boxToColor.setAttribute("style", `background-color: ${hexValue};`);
}

    //give the chosen coloring to the boxes & create a history of picking
let historyControl= 1;
document.addEventListener("click", function(e){
    
    const colorModePicker = e.target.id;
    console.log(colorModePicker);
    let colorControl;
    //color in black Mode

    if(colorModePicker == "ColorBlack"){
        document.addEventListener("mousedown", function(e){blackBoxColor(e);colorControl=1});
        document.addEventListener("mouseover", function(e){
            if(colorControl > 0){
                blackBoxColor(e);
            };
        });
        document.addEventListener("mouseup",function(e){colorControl= 0; console.log(colorModePicker);}); 
    } 
    //color in rainbow Mode

    else if(colorModePicker == "ColorRainbow"){
        document.addEventListener("mousedown", function(e){rainbowBoxColor(e);colorControl=1});
        document.addEventListener("mouseover", function(e){
            if(colorControl > 0){
                rainbowBoxColor(e);
            };
        });
        document.addEventListener("mouseup",function(e){colorControl= 0; console.log(colorModePicker);});
    }
    //color in chosen RGB

    else if(colorModePicker == "RGBSampleColor"){
        document.addEventListener("mousedown", function(e){myRGBBoxColor(e);colorControl=1});
        document.addEventListener("mouseover", function(e){
            if(colorControl > 0){
                myRGBBoxColor(e);
            };
        });
    //implementing a history control for RGB

        if (historyControl <=5){
            const history = document.querySelector(`#ColorHistory${historyControl}`);
            history.setAttribute("style", `background-color: RGB(${redValue}, ${greenValue}, ${blueValue});`);
            historyControl ++;
        }
        else {
            historyControl = 1;
            const history = document.querySelector(`#ColorHistory${historyControl}`);
            history.setAttribute("style", `background-color: RGB(${redValue}, ${greenValue}, ${blueValue});`);
            historyControl ++;
        };
        document.addEventListener("mouseup",function(e){colorControl= 0; console.log(colorModePicker);});
        document.addEventListener("click", function(e){
            const palette = e.target.className;
            if(palette == "MemorizedSampleColor ColorPaletteSample"){
                myRGBColorPalette(e);
            };
        });
    }
    //color in chosen Hex

    else if(colorModePicker == "HexSampleColor"){
        document.addEventListener("mousedown", function(e){myHexBoxColor(e);colorControl=1});
        document.addEventListener("mouseover", function(e){
            if(colorControl > 0){
                myHexBoxColor(e);
            };
        });
    //implementing a history control for Hex

        if (historyControl <=5){
            const history = document.querySelector(`#ColorHistory${historyControl}`);
            history.setAttribute("style", `background-color: ${hexValue};`);
            historyControl ++;
        }
        else {
            historyControl = 1;
            const history = document.querySelector(`#ColorHistory${historyControl}`);
            history.setAttribute("style", `background-color: ${hexValue};`);
            historyControl ++;
        };
        document.addEventListener("mouseup",function(e){colorControl= 0; console.log(colorModePicker);});
        document.addEventListener("click", function(e){
            const palette = e.target.className;
            if(palette == "MemorizedSampleColor ColorPaletteSample"){
                myHexColorPalette(e);
            };
        });
    }
});











