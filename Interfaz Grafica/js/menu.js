window.onload = init;

function init(){
    if(localStorage.getItem("token")){
        document.getElementById('agregar').addEventListener('click', function(){
            window.location.href = "addEmp.html";
        });
        document.getElementById('modificar').addEventListener('click', function() {
            window.location.href = "modifyEmp.html";
        });
        document.getElementById('eliminar').addEventListener('click', function() {
            window.location.href = "deleteEmp.html";
        });
        document.getElementById('buscar').addEventListener('click', function() {
            window.location.href = "searchEmp.html";
        });
        document.getElementById('salir').addEventListener('click', function() {
            localStorage.removeItem("token");
            window.location.href = "LOGIN.html";
        });
    }
    else{
        window.location.href = "LOGIN.html"
    }
}