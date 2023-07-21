var sitName = document.getElementById("sitInput");
var urlName = document.getElementById("urlInput");
var collect;

if(localStorage.getItem("ourStorage") == null){
    collect=[];
}
else{
    collect = JSON.parse(localStorage.getItem("ourStorage"));
    displaySite();
}

function addSite() {
    if (validationSite() == true && validationurl() == true ) {
        var oneSite={
        sName : sitName.value,
        uName : urlName.value,
    }
    collect.push(oneSite);
    localStorage.setItem("ourStorage",JSON.stringify(collect))
    displaySite();
    clearSite();
    }
    else{
        alert(`Site Name or Url is not valid, Please follow the rules below
        -Site name must contain at least 3 characters
        -Site URL must be a valid one`)
    }
    
}
function clearSite(){
   sitName.value= "";
   urlName.value= ""; 
}
function displaySite(){
   var collection=``;
   for (var i = 1; i < collect.length; i++) {
    var urlLink="https://"+collect[i].uName;
    collection += `
    <tr>
       <td>${i}</td>
       <td>${collect[i].sName}</td>
       <td><button class="btn btn-secondary" onclick=" window.open('${urlLink}')"><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
       <td><button class="btn btn-danger" onclick="deleteSite(${i})" >Delete</button></td>
    </tr>
    `
   }
   document.getElementById("tBody").innerHTML= collection;
}
function deleteSite(pIndex){
    collect.splice(pIndex,1);
    displaySite()
    localStorage.setItem("ourStorage" , JSON.stringify(collect))
 }
function validationSite(){
    var regexSite=/^[a-zA-Z0-9-]{3,}$/;
    return regexSite.test(sitName.value);
}
function validationurl(){
    var regexUrl=/^www\.\w{3,}(\.com){1,1}$/;
    return regexUrl.test(urlName.value);
}