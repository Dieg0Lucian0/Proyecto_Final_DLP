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
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("token")
            }
        }
        modifyEmpleado();
    }
    else{
        window.location.href = "LOGIN.html";
    }
}

function modifyEmpleado(){
    var name = document.getElementById('input-name').value;
    axios.get(url+"/empleadosDB/", headers
    ).then(function(res) {
        console.log(res)
    }).catch(function(err) {
        console.log(err)
    })
}