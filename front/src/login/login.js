const loginNickInput = document.getElementById("nickInput");
const loginPasswordInput = document.getElementById("passwordInput");
const loginLoginBtn = document.getElementById("loginButton");

const loginNickDiv = document.getElementById("nickInputDiv");
const loginPasswordDiv = document.getElementById("passwordInputDiv");
const loginInputWarn = document.getElementsByClassName("warnText");

const loginMoveToSignUp = document.getElementById("signupButton");
axios.defaults.baseURL = 'http://192.168.52.156:8080';

/** 닉네임&비밀번호 내용이 있는지를 구분해 경고 */
function inputWarnMaker(){
    switch(blankScanner()){
        case 'nick':
            loginNickDiv.classList.add("warn");
            loginInputWarn[0].classList.remove('transparent');
            break;
        case 'passwd':
            loginPasswordDiv.classList.add("warn");
            loginInputWarn[1].classList.remove('transparent');
            break;
        case 'empty':
            break;
    }
}

function blankScanner(){
    if(loginNickInput.value.length==0){
        return 'nick';
    }
    else if(loginPasswordInput.value.length==0){
        return 'passwd';
    }
    else if(loginPasswordInput.value.length!=0&&loginNickInput.value.length!=0){
        return 'empty';
    }
}

function loginServerPost(){
    if(blankScanner()==='empty'){
        axios({
            method:'post',
            url:'/auth/login',
            data:{
                "userNick": loginNickInput.value,
                "password": loginPasswordInput.value,
            }
        })
        .then(function(response){
            localStorage.setItem("accessTkn",response.data.accessToken);
            location.href = "../mainpage/main.html";
        })
        .catch(function(error){
            if(error.response.status===404||error.response.status===401) alert("닉네임과 비밀번호를 확인해주세요");
            else if(error.response.status===400) alert("알 수 없는 오류입니다.");
        });
    }
    else{
        inputWarnMaker();
    }
}

loginNickInput.addEventListener('change',function(){
    loginInputWarn[0].classList.add('transparent');
    loginNickDiv.classList.remove("warn");
});
loginPasswordInput.addEventListener('change',function(){
    loginInputWarn[1].classList.add('transparent');
    passwordInputDiv.classList.remove("warn");
});

loginLoginBtn.addEventListener('click',loginServerPost);
loginMoveToSignUp.addEventListener("click",function(){location.href = "../signup/signup.html";});