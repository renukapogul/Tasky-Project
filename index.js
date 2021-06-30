
//parent element to store cards
const taskContainer = document.querySelector(".task__container");

//global store 
let globalStore = [];

const newCard =({
    id, 
    imageUrl, 
    taskTitle, 
    taskDescription, 
    taskType
}) => 
    `<div class="col-md-6 col-lg-4" id =${id}>
        <div class="card">
            <div class="card-header d-flex justify-content-end gap-2">
                <button 
                    type="button" 
                    id=${id}
                    class="btn btn-outline-success" onClick="editCard.apply(this, arguments)">
                    <i 
                        class="fas 
                        fa-pencil-alt"
                        id =${id}
                        onClick="editCard.apply(this, arguments)">
                    </i>
                </button>
                <button 
                    type="button"  
                    id=${id}  
                    class="btn btn-outline-danger" 
                    onClick="deleteCard.apply(this, arguments)">
                    <i 
                        class="fas fa-trash-alt" 
                        id=${id} 
                        onClick="deleteCard.apply(this, arguments)">
                    </i>
                </button>
            </div>
            <img class="rounded"
                src=${imageUrl}
                class="card-img-top" 
                alt="card image">
            <div class="card-body">
                <h5 class="card-title">${taskTitle}</h5>
                <p class="card-text">
                    ${taskDescription}
                </p>
                <span class="badge bg-primary">${taskType}</span>
            </div>
            <div class="card-footer text-muted ">
                <button type="button" id=${id} class="btn btn-outline-primary float-end">Open Task</button>
            </div>
        </div>
    </div>`

    const loadInitialTaskCards = () => {
        //access localstorage
        const getInitialData = localStorage.tasky;
        if(!getInitialData) return;
        
        //convert stringifeigd to objecct
        const { cards } = JSON.parse(getInitialData);

        //map aroud the  array to html card and inject it to jvm
        cards.map((card) => {
            const createNewCard = newCard(card);
            taskContainer.insertAdjacentHTML("beforeend", createNewCard);
            globalStore.push(card);
        });
    };

    const updateLocalStorage = () =>{
        localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));
    }
//getting the element value from html
    const saveChanges = () =>{
    const taskData = {
        id:`${Date.now()}`,  //unique number for card id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle:document.getElementById("tasktitle").value,
        taskType:document.getElementById("tasktype").value,
        taskDescription:document.getElementById("taskdescription").value,
    };

    const createNewCard =newCard(taskData);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);   
    globalStore.push(taskData);
    
    //calling local storage API i.e application programming interface
    //add to local storage
    updateLocalStorage();
    

    };

    const deleteCard = (event) => {
        //id
        event = window.event;
        const targetID = event.target.id;
        const tagname = event.target.tagName;
        console.log(tagname);
        //search the globalStore, Remove the object which matches with the id
        globalStore = globalStore.filter((cardObject) => cardObject.id != targetID);
        updateLocalStorage();
         //WE have access DOM to remove them 
        if(tagname == "BUTTON"){
            return taskContainer.removeChild(
                event.target.parentNode.parentNode.parentNode
            );
        }

        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode.parentNode
        );
        
    };


    const editCard = (event) => {
        event = window.event;
        const targetID = event.target.id;
        const tagname = event.target.tagName;

        let parentElement;

        if(tagname === "BUTTON") {
            parentElement = event.target.parentNode.parentNode;
        }

        else{
            parentElement = event.target.parentNode.parentNode.parentNode;
        }
        let taskTitle =parentElement.childNodes[5].childNodes[1];
        let taskDescription=parentElement.childNodes[5].childNodes[3];
        let taskType =parentElement.childNodes[5].childNodes[5];
        let submitButton = parentElement.childNodes[7].childNodes[1];

        taskTitle.setAttribute("contenteditable", "true");
        taskDescription.setAttribute("contenteditable", "true");
        taskType.setAttribute("contenteditable", "true");
        submitButton.setAttribute("onClick", "saveEditChanges.apply(this, arguments)");
        submitButton.innerHTML= "save Changes";
    
    };

    const saveEditChanges =(event) => {
        event = window.event;
        const targetID = event.target.id;
        const tagname = event.target.tagName;

        let parentElement;

        if(tagname === "BUTTON") {
            parentElement = event.target.parentNode.parentNode;
        }

        else{
            parentElement = event.target.parentNode.parentNode.parentNode;
        }
        let taskTitle =parentElement.childNodes[5].childNodes[1];
        let taskDescription=parentElement.childNodes[5].childNodes[3];
        let taskType =parentElement.childNodes[5].childNodes[5];
        let submitButton = parentElement.childNodes[7].childNodes[1];

        const updatedData = {
            taskTitle:taskTitle.innerHTML,
            taskType:taskType.innerHTML,
            taskDescription:taskDescription.innerHTML,
        };
        globalStore = globalStore.map((task) => {
            if(task.id ===targetID){
                return {
                    id:task.id,
                    taskTitle: updatedData.taskTitle,
                    taskType: updatedData.taskType,
                    taskDescription: updatedData.taskDescription,
                };
            };
            return task;
       });
       updateLocalStorage();
    };

        //parent object of browser -> window
    //parent object html -> DOM -> Document
    //localstorage -> interface -> programming
    // interface -> it provides the interface to work with a local storage

    //issues
    
    //the modal was not closing upon adding new card   //solved
    //the cards were deleted after refresh -> localstorage(5mb)  //solved

    //features

    //delete modal feature //solved
    //open task
    //edit task


