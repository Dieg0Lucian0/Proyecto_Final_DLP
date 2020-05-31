window.onload = init;

function init(){
    if(localStorage.getItem("token")){
        document.querySelector(`.btn-success`).addEventListener('click', function() {
            window.location.href = "addEmp.html";
        });
        document.querySelector(`.btn-warning`).addEventListener('click', function() {
            window.location.href = "modifyEmp.html";
        });
        document.querySelector(`.btn-primary`).addEventListener('click', function() {
            window.location.href = "deleteEmp.html";
        });
        document.querySelector(`.btn-info`).addEventListener('click', function() {
            window.location.href = "searchEmp.html";
        });
        document.querySelector(`.btn-danger`).addEventListener('click', function() {
            localStorage.removeItem("token");
            window.location.href = "LOGIN.html";
        });
    }
    else{
        window.location.href = "LOGIN.html"
    }
}