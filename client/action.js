// Persisting Data using Node server and Mysql database

const baseUlr='http://127.0.0.1:5002/api/tasks';
async function createTask(taskType,title,desc){ // fetch POST
    const response= await fetch(`${baseUlr}/${taskType}`, {   // POST Data in server
                        method: 'POST',
                        body: `title=${title}&desc=${desc}`
                        ,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }
                    )
    if(!response.ok){ // Bad HTTP status
        const message= `An error occured while creating task card: ${response.status}`
        throw new Error(message);
    }

    const data= await response.json();
    console.log(`Id of created Task using POST method : ${data[data.length -1].id}`)
    return data;

}

async function updateTask(taskType,cardId,title,desc){ // fetch PUT
    const response= await fetch(`${baseUlr}/${taskType}/${cardId}`, {   // POST Data in server
            method: 'PUT',
            body: `id=${cardId}&title=${title}&desc=${desc}`
            ,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        )
    if(!response.ok){ // Bad HTTP status
        const message= `An error occured while updating task card: ${response.status}`
        throw new Error(message);
    }

    const data= await response.json();
    return data;
    

}
async function deleteTask(taskType,cardId){ // fetch DELETE
    const response= await fetch(`${baseUlr}/${taskType}/${cardId}`, {
        method: 'DELETE'
    })
    if(!response.ok){ // Bad HTTP status
        const message= `An error occured while deleting task card: ${response.status}`
        throw new Error(message);
    }
    const res= await response.json()
    return res;
}



// ABOUT TO-DO CARD 
const form = document.getElementById('form');
const cardContainer = document.getElementById('toDo')

function createCardElement(id,title, desc) {  // create to-do card 
    const card = document.createElement('div')
    card.className = 'to-do-card';
    card.id = id 
    console.log('Id of created card',card.id)

    card.setAttribute('draggable', 'true');
    card.addEventListener('dragstart', cardDragStartHandler);

    const header = document.createElement('div') // header 
    header.className = 'card-header';

    const a1 = document.createElement('a');
    a1.setAttribute('href', '#!');
    const img1 = document.createElement('img');
    img1.id = "edit-task";
    img1.setAttribute('src', 'tiny-pencil.png');
    img1.addEventListener('click', editCardHandler)
    a1.append(img1);

    // const checkBox=document.createElement('input');
    // checkBox.id="complete-task";
    // checkBox.setAttribute('type','checkbox');

    const a2 = a1.cloneNode(true); // Cancel ICon
    const img2 = a2.childNodes[0];
    img2.id = "delete-task";
    img2.setAttribute('src', 'close.png');
    img2.addEventListener('click', removeCardHandler)
    a2.append(img2);

    header.append(a1);
    //header.append(checkBox);
    header.append(a2);

    const cardTitle = document.createElement('div') // Title
    cardTitle.className = 'card-title';
    cardTitle.innerText = title;


    const cardDesc = cardTitle.cloneNode(true) // Description
    cardDesc.className = 'card-desc';
    cardDesc.innerText = desc;


    card.append(header);
    card.append(cardTitle);
    card.append(cardDesc);

    return card;
}

function removeCardHandler(event) { // Remove card Handler
    const cardId = event.target.parentNode.parentNode.parentNode.id;
    let cardTitle = document.getElementById(cardId).childNodes[1].innerText;
    let cardDesc = document.getElementById(cardId).childNodes[2].innerText;

    
    deleteTask('todo',cardId)
    .then(()=>{
        console.log('Id of deleted card',cardId)
        document.getElementById(cardId).remove();
    } )
    
}





form.addEventListener('submit', function (event) {  // CREAT TASK CARD

    createTask('todo',form.elements[0].value,form.elements[1].value) // async Call
    .then((data)=>{
        // console.log(data[data.length -1].id);
        const newId= data[data.length -1].id;
        const card = createCardElement(newId,form.elements[0].value, form.elements[1].value);
        cardContainer.append(card);
    })
    event.preventDefault();
    // console.log('Submit button clicked')
});

// create Modal for edit Card
function createModal(cardId, titleText, descText) {
    // make background blur
    document.body.style.backgroundColor = 'rgba(1,1,1,0.8)';

    const modalDiv = document.createElement('div');
    modalDiv.className = 'card-modal';
    modalDiv.id = 'modal';

    const modalHeading = document.createElement('h1');
    modalHeading.className = 'modal-heading';
    modalHeading.innerText = 'Edit task';

    const modalForm = document.createElement('form');
    modalForm.className = 'modal-form';

    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('type', 'text');
    inputTitle.className = 'modal-title';
    inputTitle.defaultValue = titleText;

    const inputDesc = document.createElement('textarea');
    inputDesc.className = 'modal-desc';
    inputDesc.innerText = descText;

    const btn = document.createElement('input');
    btn.setAttribute('type', 'submit');
    btn.setAttribute('value', 'Update');
    btn.className = 'modal-submit';
    btn.addEventListener('click', function (event) {

        // console.log('Title and desc updated');
        document.getElementById(cardId).querySelector('.card-title').textContent = modalForm.elements[0].value;
        document.getElementById(cardId).querySelector('.card-desc').textContent = modalForm.elements[1].value;


        updateTask('todo',cardId,modalForm.elements[0].value,modalForm.elements[1].value)
        .then(()=>{
            console.log('Task card updated')
        })
        modalDiv.style.display = 'none';
        document.body.style.backgroundColor = 'white';
    })

    modalForm.append(inputTitle);
    modalForm.append(inputDesc);
    modalForm.append(btn);

    modalDiv.append(modalHeading);
    modalDiv.append(modalForm);

    document.querySelector('#toDo').append(modalDiv);
    return modalDiv;
}

function editCardHandler(event) {
    const cardId = event.target.parentNode.parentNode.parentNode.id;
    const title = document.getElementById(cardId).childNodes[1].innerText;
    const desc = document.getElementById(cardId).childNodes[2].innerText;

    const modalDiv = createModal(cardId, title, desc)
    modalDiv.style.display = 'flex';

}

// When Modal is open and user click anywhere
// document.body.addEventListener('click', function (event){
//     if(modalDiv.style.display=='flex'){ // modal 
//         modalDiv.style.display='none';
//     }
// })

function createItemElement(id,title, desc) {
    const item = document.createElement('div');
    item.className = 'item-card';
    item.id =id;
    console.log('Id of new Item: ',item.id)

    item.setAttribute('draggable', 'true');
    item.addEventListener('dragstart', itemDragStartHandler);

    const itemTitle = document.createElement('div');
    itemTitle.className = 'item-title'
    itemTitle.innerText = title;

    const itemDesc = document.createElement('div');
    itemDesc.className = 'item-desc'
    itemDesc.innerText = desc;

    item.append(itemTitle);
    item.append(itemDesc);
    return item;
}


// DRAG and Drop ACTION
// 1. from ToDO -> Completed 
function cardDragStartHandler(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
}

// Drop event
const itemListWrapper = document.getElementById('item-list-wrapper');
itemListWrapper.addEventListener('dragover', function (event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'allowed';
})

itemListWrapper.addEventListener('drop', function (event) {
    event.preventDefault();
    let cardId = event.dataTransfer.getData('text/plain');
    let title = document.getElementById(cardId).childNodes[1].innerText;
    let desc = document.getElementById(cardId).childNodes[2].innerText;
    
    createTask('done', title, desc)
    .then((data)=>{
        const newId=data[data.length-1].id;
        let item = createItemElement(newId,title, desc);
        itemListWrapper.append(item);
    })

    console.log(`Id of dropped card:${cardId}` )
    deleteTask('todo',cardId)
    .then(()=>{
        document.getElementById(cardId).remove();
    })
})


// 2. Drag-drop from Completed -> to-do
const dropzone = cardContainer;
function itemDragStartHandler(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
}
dropzone.addEventListener('dragover', function (event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'allowed';

})
dropzone.addEventListener('drop', function (event) {
    event.preventDefault();
    let itemId = event.dataTransfer.getData('text/plain');
    let title = document.getElementById(itemId).childNodes[0].innerText;
    let desc = document.getElementById(itemId).childNodes[1].innerText;
    
    
    deleteTask('done', itemId)
    .then(()=>{
        document.getElementById(itemId).remove();
    })

    // const newId=Math.floor(Math.random()*1000);
   
    createTask('todo',title, desc)
    .then((data)=>{
        const newId=data[data.length-1].id;
        const newCard = createCardElement(newId,title, desc);
        dropzone.append(newCard);
    })
})



// persisting the data using Node server
fetch('http://127.0.0.1:5002/api/tasks/todo')
    .then(data => data.json())
    .then(res => {
        if(res){
            res.map(({ id,title, desc }) => {
                let card = createCardElement(id,title, desc);
                cardContainer.append(card);
            })
        }
    })
    .catch(err => {
        console.error(err);
    })
    
 fetch('http://127.0.0.1:5002/api/tasks/done')
 .then(data => data.json())
 .then( res=>{
    if(res){
        res.map(({ id,title, desc }) => {
            let item = createItemElement(id,title, desc);
            itemListWrapper.append(item);
        })
    }
 })   