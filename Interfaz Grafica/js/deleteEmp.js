window.onload = init;
var headers = {};

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
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("token")
            }
        }
        deleteEmpleado();
    }
    else{
        window.location.href = "LOGIN.html";
    }
}
function deleteEmpleado() {
    var name = document.getElementById('input-name').value;
    console.log(name);

    axios({
        method: 'delete',
        url: 'http://localhost:3000/empleadosDB/deleteEmp',
        headers, 
        data: {
            emp_name: name
        }
    }).then(function(res) {
        console.log(res);
        alert("Empleado eliminado correctamente");
        window.location.href = "menu.html";
    }).catch(function(err) {
        console.log(err);
        alert("Ocurrio un error");
    })
}