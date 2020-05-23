/* interface User {
    cell : string
    dob : {
        date: string
        age: number
    }
    email : string
    gender: string
    name: {
        title: string
        first: string
        last: string
    }
    picture:{
        large: string
        medium: string
        thumbnail: string
    }
}*/


window.addEventListener('load', onDOMLoad);

let userNameInput = null,
    userNameInputSubmit = null,
    userQueryResult = null,
    userQueryResultTitle = null,
    userQueryResultData = null,
    userQueryStatistics = null,
    userQueryStatisticsTitle = null,
    userQueryStatisticsData = null,
    arrUser = [],
    arrUserResult = [],
    query = '';

async function fetchUsersFromAPIAsync(){
    const APIURL = 'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
    const res = await fetch(APIURL);
    const json = await res.json();
    return json.results
}

async function onDOMLoad () {
    userNameInput = document.querySelector('#userNameInput')
    userNameInputSubmit = document.querySelector('#userNameInputSubmit')
    userQueryResult = document.querySelector('#userQueryResult')
    userQueryResultTitle = document.querySelector('#userQueryResultTitle')
    userQueryResultData = document.querySelector('#userQueryResultData')
    userQueryStatistics = document.querySelector('#userQueryStatistics')
    userQueryStatisticsTitle = document.querySelector('#userQueryStatisticsTitle')
    userQueryStatisticsData = document.querySelector('#userQueryStatisticsData')
    arrUser = await fetchUsersFromAPIAsync()

    userNameInput.disabled = false;
    userNameInput.addEventListener("input",onUserNameInputChange)
    userNameInput.addEventListener("keydown",onUserNameInputKeyPress)
    userNameInputSubmit.addEventListener("click",executeQuery)
}

function onUserNameInputChange(event){
    if(event.inputType === "insertText"){
        query += event.data;
    }else if (event.inputType === "deleteContentBackward"){
        query = query.substring(0,query.length - 1)
    }
    enableQueryButton(query.length === 0)
}

function enableQueryButton(isDisabled){
    userNameInputSubmit.className  = isDisabled?
     userNameInputSubmit.className  + " disabled" :
     userNameInputSubmit.className.replace(" disabled","")
}

function onUserNameInputKeyPress(event){
    if (event.keyCode == '13'){
        executeQuery()
    }
}

function executeQuery(){
    resetQueryBoxes();
    arrUserResult = arrUser.filter(userFullNameContainsQuery)
    updateUserQueryStatisticsBox(arrUserResult);
    updateUserQueryResultBox(arrUserResult);
}

function resetQueryBoxes(){
    userQueryStatisticsTitle.innerHTML = 'Nada a ser exibido'
    userQueryStatisticsData.innerHTML = ''
    userQueryResultTitle.innerHTML = 'Nenhum usuário filtrado'
    userQueryResultData.innerHTML = ''
}

function userFullNameContainsQuery(user){
    return user.name.first.toLowerCase().includes(query.toLowerCase()) || user.name.last.toLowerCase().includes(query.toLowerCase())
}

function updateUserQueryStatisticsBox(arrUser){

    let numberMaleUsers = 0, numberFemaleUsers = 0, ageSum = 0, ageAverage = 0;

    numberMaleUsers = arrUser.filter( user => user.gender === 'male').length;
    numberFemaleUsers = arrUser.filter( user => user.gender === 'female').length;
    ageSum = arrUser.map(user => user.dob.age).reduce((a,b) => a + b)
    ageAverage = (ageSum/arrUser.length).toFixed(2);

    userQueryStatisticsTitle.innerHTML="Estatísticas";
    userQueryStatisticsData.innerHTML=`
        <ul>
            <li> Sexo masculino: <b>${numberMaleUsers} </b> </li>
            <li> Sexo feminino: <b>${numberFemaleUsers} </b> </li>
            <li> Soma das idades: <b>${ageSum} </b> </li>
            <li> Média das idades: <b>${ageAverage} </b> </li>
        </ul>    
    `
}

function updateUserQueryResultBox(arrUser){
    userQueryResultTitle.innerHTML=`${arrUserResult.length} usuário(s) encontrado(s)`
    console.log('userQueryResultData', userQueryResultData.innerHTML);
    arrUser.sort(compararUsuarios).forEach( (user) => {
        userQueryResultData.innerHTML += `
        <div class="card horizontal">
            <div class="card-image circle">
                <img src="${user.picture.thumbnail}">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <span>${user.name.first} ${user.name.last}, ${user.dob.age} anos</span>
                </div>
            </div>
        </div>
        `
    })
}

function compararUsuarios(user1, user2){
    if(user1.name.first > user2.name.first){
        return 1;
    }
    return -1;
}