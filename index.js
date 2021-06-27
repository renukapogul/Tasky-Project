
//parent element to store cards
const taskContainer = document.querySelector(".task__container");

//global store 
const globalStore = [];

const newCard =({
    id, 
    imageUrl, 
    taskTitle, 
    taskDescription, 
    taskType
}) => 
    `<div class="col-md-6 col-lg-4 id =${id}">
        <div class="card">
            <div class="card-header d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
                <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
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
                <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
            </div>
        </div>
    </div>`

    const loadInitialTaskCards = () => {
        //access localstorage
        const getInitialData = localStorage.getItem("tasky");
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
    localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));
    

};


    //parent object of browser -> window
    //parent object html -> DOM -> Document
    //localstorage -> interface -> programming
    // interface -> it provides the interface to work with a local storage

    //issues
    
    //the modal was not closing upon adding new card
    //the cards were deleted after refresh -> localstorage(5mb)

    //features

    //delete modal feature
    //open task
    //edit task


