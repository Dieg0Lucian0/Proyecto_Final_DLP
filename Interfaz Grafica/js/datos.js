window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadBase();
    }
    else{
        window.location.href = "index.html"
    }
}

function loadBase(){
    axios.get(url+"/datos", headers)
    .then(function(res){
        console.log(res);
        displayEmpleado(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayEmpleado(empleado){
    var body = document.querySelector("body");
    for(var i = 0; i <empleado.length; i++){
        body.innerHTML += `<h3>${empleado[i].user_name}</h3>`;
    }
}
