const inp=document.getElementById("inp");
const add=document.getElementById("add");
const list=document.getElementById("points");
const tas=document.getElementById("tas");
const com=document.getElementById("comp");
const inco=document.getElementById("inco");
const al=document.getElementById("all");
const cmal=document.getElementById("cmal");
const clr=document.getElementById("clear");
const dlal=document.getElementById("dlal");


let task=0;
let all=[];
let cmp=[];
let inc=[];
let curr='all';


// Event Listeners
addEventListener("DOMContentLoaded", () => {
    al.setAttribute("style","font-size:large;color:black");
})


inp.addEventListener('input',()=>{
    inp.value.trim() === "" ?add.setAttribute('style',"visibility:hidden"):
    add.setAttribute('style',"visibility:visible");
    }
);

add.addEventListener('click',()=>{
    if (inp.value.trim()!=""){
    adding();   
    }
});

inp.addEventListener('keydown',(event)=>{
    if(inp.value.trim()!="" && event.key==="Enter"){
        event.preventDefault();
        adding();
    }
})

com.addEventListener('click',()=>{
    curr='cmp';
    com.setAttribute("style","font-size:large;color:black");
    al.removeAttribute("style","font-size:large;color:black");
    inco.removeAttribute("style","font-size:large;color:black");
    display(cmp);
    });
inco.addEventListener('click',()=>{
    curr='inc';
    com.removeAttribute("style","font-size:large;color:black");
    al.removeAttribute("style","font-size:large;color:black");
    inco.setAttribute("style","font-size:large;color:black");
    display(inc);
    });

al.addEventListener('click',()=>{
    curr='all';
    com.removeAttribute("style","font-size:large;color:black");
    al.setAttribute("style","font-size:large;color:black");
    inco.removeAttribute("style","font-size:large;color:black");
    display(all);
});


// functions
function adding(){
    const div=document.createElement("div");
    div.className="check";
    const li = document.createElement("input");
    li.type="checkbox";
    li.className="btns";
    li.value=inp.value;
    

    const label = document.createElement("label");
    label.className="label";
    label.textContent = inp.value;
    div.appendChild(li);
    div.appendChild(label);
    all.push(div);
    display(all);
    deleting(div,li);
    completed(li,div);
    inc.push(div);
    inp.value = "";
    add.setAttribute('style',"visibility:hidden");
    task++;
    taskDisplay();
    completeAll();
    clearcmp();
    dlall();
}

//function to add or remove from completed and incompleted array
function completed(li,div){
    li.addEventListener('change',()=>{ 
      if(li.checked===true){
         if(inc.indexOf(div)!=-1){
             inc.splice(inc.indexOf(div),1);
            }
            div.setAttribute('style','background-color:green');
        cmp.push(div);
        check();
        task--;
        taskDisplay();
      }else{
        if(cmp.indexOf(div)!=-1){
            cmp.splice(cmp.indexOf(div),1);
           }
           div.setAttribute('style','color:black');
        inc.push(div);
        check();
        task++;
        taskDisplay();
      }
      
    }) 
}

//adding cross button for deleting
function deleting(ele,li){
    let cross;
    ele.addEventListener('mouseenter',()=>{
       
        cross=document.createElement('span');
        cross.textContent='X';
        cross.id="cross";
        ele.appendChild(cross);
        dlt(li);
    })
    ele.addEventListener('mouseleave',()=>{
        
        if(cross&&ele.contains(cross))
        ele.removeChild(cross);
    })
    
}

// deleting the clicked cross div

function dlt(li){
    const crs=document.getElementById('cross');
    crs.addEventListener('click',()=>{
        const parentDiv = crs.closest('.check');
        if (parentDiv) { 
             parentDiv.remove();
            all.splice(all.indexOf(parentDiv),1); // remove from all array
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
    if (curr==='all'){
        display(all);
    }else if(curr==='cmp'){
        display(cmp);
    }else{
        display(inc);
    }
}
function taskDisplay(){
    tas.textContent=`${task} tasks left`;
}

function completeAll(){
    cmal.addEventListener('click',()=>{
        const btn=document.querySelectorAll(".btns");
     for(let el of btn){  
         el.checked=true;
    }
})
}
function clearcmp(){
    clr.addEventListener('click',()=>{
        cmp=[];  // empty the completed array
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
function dlall(){
    dlal.addEventListener('click',()=>{
    all=[];
    inc=[];
    cmp=[];
    display(all);
    task=0;
    taskDisplay();
    }); 
}