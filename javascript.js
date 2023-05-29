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
    boxToColor.removeAttribute("style");
    boxToColor.setAttribute("style", "background-color: black;");
};

    //color the case in shades

function shadeBoxColor(data) {
    const boxClassesInString = data.target.className;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`.SketchCaseNumber${boxNumber}`);
    const computedStyle = window.getComputedStyle(boxToColor);
    const shader = computedStyle.getPropertyValue("opacity");
    const numberisation = parseFloat(shader);
    const realFuckingNumber = numberisation+0.1;
    boxToColor.removeAttribute("style");
    if (numberisation === 0.9) {
        boxToColor.setAttribute("style", "background-color: rgb(0,0,0); opacity: 1;");
    } else if (numberisation < 0.9) { 
        boxToColor.setAttribute("style", `background-color: rgb(0,0,0); opacity: ${realFuckingNumber.toFixed(1)};`);
    } else if (numberisation > 0.9) {
        boxToColor.setAttribute("style", "background-color: rgb(0,0,0); opacity: 0.1;");
    };
};    

    //color with my own color

function myOwnBoxColor(data, colorPaletteData){
    const boxClassesInString = data.target.className;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`.SketchCaseNumber${boxNumber}`);
    boxToColor.removeAttribute("style");
    boxToColor.setAttribute("style", `background-color: ${colorPaletteData};`);
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
    boxToColor.removeAttribute("style");
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
};

    //set the sampler

document.addEventListener("click", (e)=>{
    const clickOnButtonSample = e.target.id;
    
    if (clickOnButtonSample == "HexSampleTest"){
        const sampleBoxColoring = document.querySelector(`.HexSampleColor`);
        boxToColor.removeAttribute("style");
        sampleBoxColoring.setAttribute("style", `background-color: ${hexValue};`);
    }
    else if(clickOnButtonSample == "RGBSampleTest"){
        const sampleBoxColoring = document.querySelector(`.RGBSampleColor`);
        boxToColor.removeAttribute("style");
        sampleBoxColoring.setAttribute("style", `background-color: RGB(${redValue}, ${greenValue}, ${blueValue});`);
    }
});

    // color the case with my RGB choice

function myRGBBoxColor(data){
    const boxClassesInString = data.target.className;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`.SketchCaseNumber${boxNumber}`);
    boxToColor.removeAttribute("style");
    boxToColor.setAttribute("style", `background-color: RGB(${redValue}, ${greenValue}, ${blueValue});`);
};
    
    // color the case with my Hex choice
    
function myHexBoxColor(data){
    const boxClassesInString = data.target.className;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`.SketchCaseNumber${boxNumber}`);
    boxToColor.removeAttribute("style");
    boxToColor.setAttribute("style", `background-color: ${hexValue};`);
};

    // store a RGB color in the palette

function myRGBColorPalette(data)
{
    const boxClassesInString = data.target.id;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`#ColorPalette${boxNumber}`);
    boxToColor.removeAttribute("style");
    boxToColor.setAttribute("style", `background-color: RGB(${redValue}, ${greenValue}, ${blueValue});`);
    dataStorageMode = 0;
}

    // store a Hex color in the palette

function myHexColorPalette(data)
{
    const boxClassesInString = data.target.id;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`#ColorPalette${boxNumber}`);
    boxToColor.removeAttribute("style");
    boxToColor.setAttribute("style", `background-color: ${hexValue};`);
    dataStorageMode = 0;
}

    //give the chosen coloring to the boxes & create a history of picking
let historyControl= 1;
let dataStorageMode = 0;


document.addEventListener("click", function(e){
    
    const colorModePicker = e.target.id;
    
    let colorControl;
    let colorPaletteData;
    //activate save button
    
    if(colorModePicker == "RGBStoreData"){dataStorageMode = 1;}
    else if(colorModePicker == "HexStoreData"){dataStorageMode = 2;}
    
    //clear the board

    else if(colorModePicker == "ColorClear"){
        for(let i = 1;i<100;i++){
            const clear = document.querySelector(`.SketchCaseNumber${i}`);
            if(clear){
                clear.removeAttribute("style");
            }
            else break;
            
        };
    } 

    //color with palette

    else if(/^ColorPalette\d+$/.test(colorModePicker) || /^ColorHistory\d+$/.test(colorModePicker)){
        const getID = document.querySelector(`#${colorModePicker}`);
        
        const styles = window.getComputedStyle(getID);
        colorPaletteData = styles.getPropertyValue('background-color');
        document.addEventListener("mousedown", function(e){myOwnBoxColor(e, colorPaletteData);colorControl=1});
        document.addEventListener("mouseover", function(e){
            if(colorControl > 0){
                myOwnBoxColor(e, colorPaletteData);
            };
        });
        document.addEventListener("mouseup",function(e){colorControl= 0; console.log(colorModePicker);}); 
    }

    //color in black Mode

    else if(colorModePicker == "ColorBlack"){
        document.addEventListener("mousedown", function(e){blackBoxColor(e);colorControl=1});
        document.addEventListener("mouseover", function(e){
            if(colorControl > 0){
                blackBoxColor(e);
            };
        });
        document.addEventListener("mouseup",function(e){colorControl= 0; console.log(colorModePicker);}); 
    } 

    //color in shades
    
    else if(colorModePicker == "ColorShade"){
        document.addEventListener("mousedown", function(e){shadeBoxColor(e);colorControl=1});
        document.addEventListener("mouseover", function(e){
            if(colorControl > 0){
                shadeBoxColor(e);
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

        //implementing the RGB data storage in palette

        document.addEventListener("mouseup",function(e){colorControl= 0; console.log(colorModePicker);});
        document.addEventListener("click", function(e){
            const palette = e.target.className;
            if(palette == "MemorizedSampleColor ColorPaletteSample" && dataStorageMode == 1){
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

    //implementing the Hex data storage in palette

        document.addEventListener("mouseup",function(e){colorControl= 0; console.log(colorModePicker);});
        document.addEventListener("click", function(e){
            const palette = e.target.className;
            if(palette == "MemorizedSampleColor ColorPaletteSample" && dataStorageMode == 2){
                myHexColorPalette(e);
            };
        });
    }
});











