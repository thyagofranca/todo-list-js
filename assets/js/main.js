'use strict'

const addTasks = document.getElementById('addTasks');
const body = document.getElementById('content');
const submit = document.getElementById('send');

let dataBase = [
    { 'task': 'Estudar JavaScript', 'status': '' }, 
    { 'task': 'Praticar JavaScript', 'status': '' }, 
    { 'task': 'Criar uma aplicação real com JavaScript', 'status': '' }
];

const getDataBase = () => JSON.parse(localStorage.getItem('dataBase')) ?? [];
const setDataBase = () => localStorage.setItem('dataBase', JSON.stringify(dataBase));

const createList = (task, status, indice) => {
    const newItem = document.createElement('div');
    newItem.classList.add('task');
    newItem.innerHTML = `
        <input type="checkbox" ${status} data-action="${indice}" />
        <p class="card">${task}</p>
        <input type="button" class="trash" value="&#xf2ed;" data-action="${indice}" />
    `
    document.getElementById('content').appendChild(newItem);
};

const loadItemsInScreen = () => {
    clearTasks();
    getDataBase();
    dataBase.forEach((items, indice) => {
        createList(items.task, items.status, indice);
    });
};

const clearTasks = () => {
    while(body.firstChild) { 
        body.removeChild(body.lastChild);
    }
};

const preventTecleEnter = (event) => {
    if(event.keyCode === 13) {
        event.preventDefault();
    }else {
        const insertTaskInDataBase = () => {
            const texto = document.getElementById('addTasks').value;
            if(texto == '') {
                document.getElementById('addTasks').focus();
                return false;
            }else {
                getDataBase();
                dataBase.push({ 'task': texto, 'status': '' });
                setDataBase();
                loadItemsInScreen();
                clearField();
                document.getElementById('sound').play();
            }
        };
        submit.addEventListener('click', insertTaskInDataBase);
    }
};
document.addEventListener('keydown', preventTecleEnter);

const clearField = () => {
    addTasks.value = '';
};

const markCheckbox = (event) => {
    const elemento = event.target;
    if(elemento.type === 'button') {
        const indice = elemento.dataset.action;
        removeItems(indice);
    }else if(elemento.type === 'checkbox') {
        const indice = elemento.dataset.action;
        checkIsTrueOurFalse(indice);
    }
};
body.addEventListener('click', markCheckbox);

const removeItems = (indice) => {
    getDataBase();
    dataBase.splice(indice, 1);
    setDataBase();
    loadItemsInScreen();
};

const checkIsTrueOurFalse = (indice) => {
    getDataBase();
    dataBase[indice].status = dataBase[indice].status === '' ? 'checked' : '';
    setDataBase();
    loadItemsInScreen();
};

loadItemsInScreen();