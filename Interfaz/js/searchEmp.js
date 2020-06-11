window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    if(localStorage.getItem("token")){
        document.querySelector(`.btn-primary`).addEventListener('click', accesoAutorizado);
        document.querySelector(`.btn-secondary`).addEventListener('click', function(){
            window.location.href = "menu.html";
        })}
    else{
        window.location.href = "LOGIN.html";
    }
}
function accesoAutorizado(){
    headers = {
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem("token")
        }
    }
    
    addEmpleado();
}

function addEmpleado(){
    var name = document.getElementById('input-name').value;
    data = {
        data: {
            emp_name: name
        }
    }
    axios.get(url+"/empleadosDB/searchEmp",data, headers)
    .then(function(res){
        console.log(res);
        resultado(res.data.message)
    }).catch(function(err){
        console.log(err);
        alert('Ocurrio un error');
    })
}

function resultado(emp){
    var body = document.querySelector("body");
    for(var i = 0; i <emp.length; i++){
        body.innerHTML += `<h4>${emp[i].emp_name}</h4>`;
        body.innerHTML += `<h3>${emp[i].emp_lastname}</h3>`;
        body.innerHTML += `<h3>${emp[i].emp_phone}</h3>`;
        body.innerHTML += `<h3>${emp[i].emp_mail}</h3>`;
        body.innerHTML += `<h3>${emp[i].emp_direction}</h3>`;
    }
}