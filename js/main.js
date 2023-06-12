// -------------------Global-------------------
var documentHTML = document;
var siteName = documentHTML.getElementById('siteName'),
    siteUrl = documentHTML.getElementById('siteUrl'),
    addBtn = documentHTML.getElementById('addBtn'),
    sitesContainer=[],
    updateBtn = documentHTML.getElementById('updateBtn'),
    currentIndex = 0 ,
    searchInput = documentHTML.getElementById('searchInput'),
    nameAlert = documentHTML.getElementById('nameAlert'),
    urlAlert = documentHTML.getElementById('urlAlert'),
    urlValid = documentHTML.getElementById('urlValid');


// -------------------When Start-------------------
if(getLocal() !== null){
    sitesContainer = getLocal();
    displaySites();
}
// -------------------Start Event------------------

addBtn.onclick = function (){
    addSite();
}

updateBtn.onclick = function(){
    updateSite();
}

searchInput.oninput = function(){
    searchSite();
}
// -------------------Start Function-------------------
function addSite(){
    if((nameValidation() === true) & (urlValidation() === true)){
        var sites={
            name: siteName.value,
            url: siteUrl.value
        };
        sitesContainer.push(sites);
        displaySites();
        reset();
        setLocal();
    }
}
function displaySites(){
    box = ``;
    var search=searchInput.value.toLowerCase();
    for(var i = 0 ; i < sitesContainer.length ; i++){
        if(sitesContainer[i].name.toLowerCase().includes(search)){
            box+=`
            <tr>
            <td scope="row">${sitesContainer[i].name.toLowerCase().replaceAll(search,`<span class="bg-info">${search}</span>`)}</td>
            <td>
                <p class="small text-truncate" style="width: 450px;">${sitesContainer[i].url}</p>
            </td>
            <td> 
                <div class="hstack gap-3">
                <a href="${sitesContainer[i].url}" target="_blank" class="btn btn-primary" id="visit">Visit</a>
                <button class="btn btn-warning"onclick="setUpdate(${i})" >Update</button>
                <button class="btn btn-danger" onclick="deleteSite(${i})">Delete</button>
                </div>
            </td>
        </tr>
            `
        }
    }
    documentHTML.getElementById('tableBody').innerHTML=box;
}
function reset(){
    siteName.value = "";
    siteUrl.value = "";
}
function deleteSite(index){
    sitesContainer.splice(index,1);
    displaySites();
    setLocal();
}
function setUpdate(index){
    currentIndex = index;
    siteName.value = sitesContainer[index].name;
    siteUrl.value = sitesContainer[index].url;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}
function updateSite(){
    var sites={
        name: siteName.value,
        url: siteUrl.value
    };
    sitesContainer.splice(currentIndex,1,sites);
    setLocal();
    displaySites();
    reset();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
}
function searchSite(){
    displaySites();
}
function setLocal(){
    localStorage.setItem("sites",JSON.stringify(sitesContainer));
}
function getLocal(){
    return JSON.parse(localStorage.getItem("sites"))
}
// -------------------Start Validation-------------------
function nameValidation(){
    if(siteName.value===""){
        nameAlert.classList.remove("d-none");
        return false;
    }else{
        nameAlert.classList.add("d-none")
        return true;
    }
}

function urlValidation(){
    if(siteUrl.value===""){
        urlAlert.classList.remove("d-none");
        return false;
    }else{
        var type=false;
        for(var i = 0; i<sitesContainer.length; i++){
            if(sitesContainer[i].url === siteUrl.value){
                type = true;
                break;
            }
        }
        if(type=== true){
            urlValid.classList.remove("d-none");
            return false;
        }else{
            urlValid.classList.add("d-none")
        }
        urlAlert.classList.add("d-none")
        return true;
    }
}