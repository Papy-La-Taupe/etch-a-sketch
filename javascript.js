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

    //give the chosen coloring to the boxes

let coloring = 0;

    //color the cases in black by click-&-mouve-overing
let colorControl;
function blackBoxColor(data){
    const boxClassesInString = data.target.className;
    let boxNumber = boxClassesInString.split(/\D/g).filter(Number).toString();
    const boxToColor = document.querySelector(`.SketchCaseNumber${boxNumber}`);
    boxToColor.setAttribute("style", "background-color: black;");
};

document.addEventListener("mousedown", function(e){blackBoxColor(e);colorControl=1});
document.addEventListener("mouseover", function(e){
    if(colorControl > 0){
        blackBoxColor(e);
    };
});
document.addEventListener("mouseup",function(e){colorControl= -1});





