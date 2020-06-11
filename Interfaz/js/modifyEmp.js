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
    var lastname = document.getElementById('input-lastname').value;
    var phone = document.getElementById('input-phone').value;
    var mail = document.getElementById('input-mail').value;
    var direction = document.getElementById('input-direction').value;

    data = {
        data: {
            emp_name: name, 
            emp_lastname: lastname, 
            emp_phone: phone, 
            emp_mail: mail, 
            emp_direction: direction
        }
    }
    axios.put(url+"/empleadosDB/modify",data, headers)
    .then(function(res){
        console.log(res);
        alert('Empleado modificado correctamente')
    }).catch(function(err){
        console.log(err);
        alert('Ocurrio un error');
    })
}