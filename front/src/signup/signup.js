
const signUpNickInput = document.querySelector(".nickInput");
const signUpPasswordInput = document.querySelector(".passwordInput");
const signUpPasswordReInput = document.querySelector(".passwordCheckInput");
const signUpWarntext = document.querySelectorAll(".warnText");
const signUpInputDivs = document.querySelectorAll(".inputDiv");
const signUpButton = document.querySelector(".signupButton");
axios.defaults.baseURL = 'http://localhost:8000';

function inputWarnMaker(){
    switch(blankScanner()){
        case 'nick':
            signUpWarntext[0].classList.remove('transparent');
            signUpInputDivs[0].classList.add('warnborder');
            break;
        case 'pswd':
            signUpWarntext[1].classList.remove('transparent');
            signUpInputDivs[1].classList.add('warnborder');
            break;
        case 'pwre':
            signUpWarntext[2].classList.remove('transparent');
            signUpInputDivs[2].classList.add('warnborder');
            break;
    }
}

function blankScanner(){
    if(signUpNickInput.value.length<=0)
        return 'nick';

    else if(signUpPasswordInput.value.length<=0)
        return 'pswd';

    else if(signUpPasswordReInput.value.length<=0)
        return 'pwre';

    else 
        return 200;
}

function signUpServerPost(){
    if(signUpPasswordInput.value!==signUpPasswordReInput.value){
        alert('비밀번호/다시 입력이 다릅니다');
    }
    else if(blankScanner()===200){
        axios({
            method:'post',
            url:'http://localhost:8000/auth/signup',
            data:{
                "nick": signUpNickInput.value,
                "password": signUpPasswordInput.value
            }
        })
        .then(function(response){
            alert("회원가입에 성공했습니다");
            location.href = "../login/login.html";
        })
        .catch(function(error){
            if(error.response.status===409) alert("계정 정보가 중복됩니다.");
            else if(error.response.status===400) alert("알 수 없는 오류입니다.");
            else alert(`오류 (${error.response.status})`);
        })
    }
    else{
        inputWarnMaker();
    }
}

/** input 내용 변경을 감지해 경고 지우는 팡션 */
signUpNickInput.addEventListener('change',function(){
    signUpWarntext[0].classList.add('transparent');
    signUpInputDivs[0].classList.remove("warnborder");
});
signUpPasswordInput.addEventListener('change',function(){
    signUpWarntext[1].classList.add('transparent');
    signUpInputDivs[1].classList.remove("warnborder");
});
signUpPasswordReInput.addEventListener('change',function(){
    signUpWarntext[2].classList.add('transparent');
    signUpInputDivs[2].classList.remove("warnborder");
});

signUpButton.addEventListener("click",signUpServerPost);