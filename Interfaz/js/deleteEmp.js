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
    
    deleteEmpleado();
}

function deleteEmpleado(){
    var name = document.getElementById('input-name').value;
    data = {
        data: {
            emp_name: name
        }
    }
    axios.delete(url+"/empleadosDB/deleteEmp",data, headers)
    .then(function(res){
        console.log(res);
        alert('Empleado dado de baja correctamente')
    }).catch(function(err){
        console.log(err);
        alert('Ocurrio un error');
    })
}