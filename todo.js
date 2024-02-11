const inputTask=document.getElementById("inp");
const add=document.getElementById("add");
const list=document.getElementById("points");
const tas=document.getElementById("task");
const completeButton=document.getElementById("complete");
const incompleteButton=document.getElementById("incomplete");
const allButton=document.getElementById("all");
const completeAllButton=document.getElementById("completeAll");
const clearAll=document.getElementById("clear");
const deleteAll=document.getElementById("deleteAll");


let task=0; //initial counter to count the number of tasks
//initialise the arrays to store the tasks
let all=[];
let completeArray=[];
let incompleteArray=[];
//Initialise current array as All
let currentArray='all';


// Event Listeners
//setting the 'All' to bold when the page loads
addEventListener("DOMContentLoaded", () => {
    allButton.setAttribute("style","font-size:large;color:black");
})

//to make the add button visible when there is any value in the input
inputTask.addEventListener('input',()=>{
    inputTask.value.trim() === "" ?add.setAttribute('style',"visibility:hidden"):
    add.setAttribute('style',"visibility:visible");
    }
);

//on click add, adding the task to the list
add.addEventListener('click',()=>{
    if (inputTask.value.trim()!=""){
    adding();   
    }
});

//adding the task on keyboard enter key as well
inputTask.addEventListener('keydown',(event)=>{
    if(event.key==="Enter"){
        event.preventDefault();
        if(inputTask.value.trim()===""){
            alert("Sorry!Enter atleast one String!")
        }else{
        adding();}
    }
})

// Listeners to show completed/incompleted tasks
completeButton.addEventListener('click',()=>{
    currentArray='completeArray';
    completeButton.setAttribute("style","font-size:large;color:black");
    allButton.removeAttribute("style","font-size:large;color:black");
    incompleteButton.removeAttribute("style","font-size:large;color:black");
    display(completeArray);
    });

incompleteButton.addEventListener('click',()=>{
    currentArray='incompleteArray';
    completeButton.removeAttribute("style","font-size:large;color:black");
    allButton.removeAttribute("style","font-size:large;color:black");
    incompleteButton.setAttribute("style","font-size:large;color:black");
    display(incompleteArray);
    });

allButton.addEventListener('click',()=>{
    currentArray='all';
    completeButton.removeAttribute("style","font-size:large;color:black");
    allButton.setAttribute("style","font-size:large;color:black");
    incompleteButton.removeAttribute("style","font-size:large;color:black");
    display(all);
});


// functions
// function to add the task in the list
function adding(){
    const div=document.createElement("div");
    div.className="check";
    const li = document.createElement("input");
    li.type="checkbox";
    li.className="btns";
    li.value=inputTask.value;
    

    const label = document.createElement("label");
    label.className="label";
    label.textContent = inputTask.value;
    div.appendChild(li);
    div.appendChild(label);
    all.push(div);
    display(all);
    deleting(div,li);
    completed(li,div);
    incompleteArray.push(div);
    inputTask.value = "";
    add.setAttribute('style',"visibility:hidden");
    task++;
    taskDisplay();
    completeAll();
    clearcmp();
    deleteAllfunc();
}

//function to add or remove from completed and incompleted array
function completed(li,div){
    li.addEventListener('change',()=>{checkComplete(li,div);}); 
}
// function to check in complete or completed and act accordingly
function checkComplete(li,div){ 

    if(li.checked===true){
       if(incompleteArray.indexOf(div)!=-1){
           incompleteArray.splice(incompleteArray.indexOf(div),1);
          }
          div.setAttribute('style','background-color:lightgreen');
      completeArray.push(div);
      check();
      task--;
      taskDisplay();
    }else{
      if(completeArray.indexOf(div)!=-1){
       
          completeArray.splice(completeArray.indexOf(div),1);
         }
         div.setAttribute('style','color:black');
      incompleteArray.push(div);
      check();
      task++;
      taskDisplay();
    } 
  }

//adding cross button for deleting
function deleting(ele,li){
    let cross;
    ele.addEventListener('mouseenter',()=>{
       
        cross=document.createElement('span');
        cross.textContent='x';
        cross.id="cross";
        ele.appendChild(cross);
        deleteCross(li);
    })
    ele.addEventListener('mouseleave',()=>{
        
        if(cross&&ele.contains(cross))
        ele.removeChild(cross);
    })
    
}

// deleting the clicked cross div

function deleteCross(li){
    const crossButton=document.getElementById('cross');
    crossButton.addEventListener('click',()=>{
        const parentDiv = crossButton.closest('.check');
        if (parentDiv) { 
             parentDiv.remove(); //remove the parent Div from DOM
            all.splice(all.indexOf(parentDiv),1); // remove from all array
            completeArray.includes(parentDiv)?completeArray.splice(completeArray.indexOf(parentDiv),1): 
            incompleteArray.splice(incompleteArray.indexOf(parentDiv),1); //check if completed or incompleted and then removing
    if(!li.checked)
    task--;
    taskDisplay();
        }
});
}

function display(arr){
    list.innerHTML="";
    for(let el of arr){
        list.appendChild(el);
    }
}
// function to check in which array we are currently
function check(){
    if (currentArray==='all'){
        display(all);
    }else if(currentArray==='completeArray'){
        display(completeArray);
    }else{
        display(incompleteArray);
    }
}

// display the number of tasks left
function taskDisplay(){
    tas.textContent=`${task} tasks left`;
}

//function to mark all the tasks as completed
function completeAll() {
    completeAllButton.addEventListener('click', () => {
        const btn = document.querySelectorAll(".btns");

        for (let el of btn) {
            el.checked = true;
            const parentDiv = el.closest('.check');
            parentDiv.setAttribute('style', 'background-color:lightgreen');
            checkComplete(el, parentDiv);
        }
        // Update arrays after completing all tasks
        completeArray = [...all];
        incompleteArray = [];
        task = 0;
        taskDisplay();
        check();
    });
}


// clear the completed tasks
function clearcmp(){
    clearAll.addEventListener('click',()=>{
        completeArray=[];  // empty the completed array
        const btn=document.querySelectorAll(".btns");
     for(let el of btn){  
         if(el.checked===true){
//to check the closest parent that has class .check    
         const parentDiv = el.closest('.check');
                if (parentDiv) {
                    parentDiv.remove();
                    all.splice(all.indexOf(parentDiv),1); // remove from all array
                }
            }
    }
})
}

// function to delete all the tasks
function deleteAllfunc(){
    deleteAll.addEventListener('click',()=>{
    all=[];
    incompleteArray=[];
    completeArray=[];
    display(all);
    task=0;
    taskDisplay();
    }); 
}
