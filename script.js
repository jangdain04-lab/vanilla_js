const wrapperBox=document.getElementById('wrapper');
const inputFieldGroup=document.getElementsByClassName("inputGroup");
const allInputs= document.querySelectorAll("input");
const userNickname = document.getElementById("nickname");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const userPhone = document.getElementById("phone");
const userRegistrationForm = document.getElementById("registrationForm");

const updateHelperText = (input,message,isValid)=>{
    const inputGroup = input.parentElement;
    console.log(userEmail.parentElement);
    //한개의 input 태그의 부모 태그에 접근하는것.
    //예시로 input 태그를 userEmail로 접근하였다고 하면, 아래 태그들의 최상위태그를 의미한다.
    //<div class="inputGroup"> 
    //<label for="nickname"class=> 사용자이름</label>
    //<input type="text" id="nickname" class="nicknameInput">
    //<span class="helperText"> 알림</span>
    //<!--span: 글자표현-->
    //</div>
    const helperText = inputGroup.getElementsByClassName("helperText")[0];
    //-> 알림 
    if(isValid == true){
        //isvalid에는 boolean데이터 true/false가 들어가야함
        inputGroup.classList.remove("invalid");
        inputGroup.classList.add("valid");
        helperText.style.visibility = "hidden";
    }
    if(isValid == false){
        //isvalid에는 boolean데이터 true/false가 들어가야함
        inputGroup.classList.remove("valid");
        inputGroup.classList.add("invalid");
        helperText.style.visibility = "visible";
        helperText.innerText = message;
    }
}; 

//알림이 사용이 되는것까지는 설정을 했는데, 언제 사용이 되어야 하냐, 조건을 설정을 안했음.
//입력필드가 비어있는지 확인하는 함수기능을 만듭니다.
const checkEmptyInput=(input)=>{
    if(input.value.trim()===''){
        //인풋입력칸에 입력한 문자열중 띄어쓰기를 없애는 기능
        updateHelperText(input,'값을 입력해주세요',false);
        return false;
    }else{
        //입력이 있으면 도움말을 지웁니다.
        updateHelperText(input,"",true)
        return true;
    }
}


//이메일형식이 올바른지 확인하는 함수
//이메일 주소가 규칙에 맞게 작성이 되었는지 확인하는것!
const validateEmailFormat = (input) =>{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if(emailPattern.test(input.value.trim())== true){
        updateHelperText(input,"",true);
        return true;
    } else {
        updateHelperText(input,"유효한 이메일 주소를 입력부탁드립니다.",false);
        return false;
    }
    // 정규식=> 마법, 이메일에 골뱅이가 안들어갔다거나, .com 등의 형식을 지키지 않았을때 검사를 해서 
    // true 혹은 false를 return하게 할 수 있음
}

//비밀번호 강도 설정
const checkPasswordStrength = (password) =>{
    const strongPattern= /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    if(strongPattern.test(password.value) == true) {
        updateHelperText(password,"비밀번호 강도: 강함",true);
        return true;
    }else{
        updateHelperText(password,"비밀번호는 8자이상이여야하며, 대문자, 소문자, 특수문자를 포함해야 합니다.",false);
        return false;
    }
}

//비밀번호와 비밀번호 확인 입력칸이 같은지 확인
const validatePasswordMatch = (passwordinput,confirmInput) =>{
    if(passwordinput.value !== confirmInput.value){
        updateHelperText(confirmInput,"비밀번호가 일치하지 않습니다.",false);
        return false;
    }else{
        updateHelperText(confirmInput,"",true);
        return true;
    }
}

//전화번호가 올바른 형식인지 확인하는 함수
const validatePhoneNumber = (input)=>{
    const phonePattern = /^0\d{1,2}-\d{3,4}-\d{4}$/;
    if(phonePattern.test(input.value.trim())==true){
         updateHelperText(input,"",true);
         return true;
    }else{
        updateHelperText(input,"유효한 전화번호를 입력해주세요. (예: 010-1234-5678)",false)
        return false;
    }

}

//폼제출시(회원가입버튼누르면 회원가입이 진행되게 하는것) 입력필드가 유효한지 확인하는 함수
//숙제검사에서 모든 항목을 검토하는 것과 같다.
const validateForm = ()=>{
    const isNicknameValid = checkEmptyInput(userNickname);
    //boolean 값으로 에러검사시 문제가 없으면 true를 값으로 가지고 있으면 false를 값으로 가진다.
    const isEmailValid = validateEmailFormat(userEmail);
    //boolean 값으로 에러검사시 문제가 없으면 true를 값으로 가지고 있으면 false를 값으로 가진다.
    const isPasswordStrong = checkPasswordStrength(userPassword);
    const isPasswordMatch = validatePasswordMatch(userPassword,confirmPassword);
    const isPhoneValid = validatePhoneNumber(userPhone);


    //모든 검사를 해서 모든 검사가 통과해야 회원가입 버튼을 눌렀을때 회원가입이 진행되게끔
    return isNicknameValid&&isEmailValid&&isPasswordStrong&&isPasswordMatch&&isPhoneValid
    
} //모든 조건들 isNicknameValid 이런 변수들은 전부 현재 boolean 데이터를 가지고 있고
// 전부 true 여야지 true 값을 반환한다.

userRegistrationForm.addEventListener('submit',(e) => {
    //폼안의 submit 타입의 버튼을 눌렀을때 이벤트가 발생합니다.
    //근데, 여기서 버튼을 눌렀을대 발생하는 기능들을 압축해서 객체 {key:value} 기능들을
    //모아둔것을 바로 e라고 한다.
    e.preventDefault();
    if(validateForm()==true){
        console.log("모든 필드가 유효합니다. 즉 사용이 가능합니다.")
    }else{
        console.log("위 필드 중 일부분이 에러가 터진다. 유효성검사 실패했습니다.")
    }
    //기본적으로 폼태그에서 submit 태그를 누르면 자동수행되는 기능이 있는데 이게
    //폼제출동작을 막는다.
    //폼제출동작은 자동수행되는 기능이 있는데 이게 새로고침이다.
    //=>console에 있던 데이터들이 날아감
    //인풋태그의 에러확인 (유효성 검사)이 불가능해진다.
    //얘를 써줘야 유효성검사가 가능하다.
    console.log(e);
    
});

//각 input 태그 입력을 눌렀을대 테두리색깔이나 알림이 뜨게하고싶다.
document.querySelectorAll("input").forEach(input=>{
    //for each는 배열안의 데이터를 각각 뽑아오고 싶을때 이용합니다.
    input.addEventListener('input',()=>{
        switch(input.id){
            case 'nickname':
                checkEmptyInput(input);
                break
            case 'email':
                validateEmailFormat(input);
                break;
            case 'userPassword':
                checkPasswordStrength(input);
                break;
            case 'confirmPassword':
                validatePasswordMatch(userPassword,confirmPassword);
                break; 
            case 'phone':
                validatePhoneNumber(input);
                break;           
       

        }
    })
})