window.onload = init;

function init(){
    document.querySelector(`.btn-primary`).addEventListener('click', login);
}

function login(){
    var mail = document.getElementById('input-mail').value;
    var passcode = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/admin/login',
        data: {
            admin_mail : mail,
            admin_password: passcode,
        }
    }).then(function(res){
        console.log(res.data)
        if(res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "menu.html";
        }
        else{
            alert("Usuario y/o contraseña incorrectos");
            window.location.href = "LOGIN.html";
        }
    }).catch(function(err){
        console.log(err);
    })
}