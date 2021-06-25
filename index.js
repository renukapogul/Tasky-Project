
//parent element to store cards
const taskContainer = document.querySelector(".task__container");


const newCard =({id, imageUrl, taskTitle, taskDescription, taskType}) => 
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
};


    //parent object of browser -> window
    //parent object html -> DOM -> Document 

    //issues
    
    //the modal was not closing upon adding new card
    //the cards were deleted after refresh

    //features

    //delete modal feature
    //open task
    //edit task
