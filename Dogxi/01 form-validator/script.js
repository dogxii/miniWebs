const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

// 显示错误信息
function showError(input, msg) {
  /** @type {HTMLDivElement} */
  const formGroup = input.parentElement;

  formGroup.className = "form-group error";

  const errorMessage = formGroup.querySelector(".error-message");
  errorMessage.textContent = msg;
  errorMessage.className = "error-message visible";
}

// 显示成功状态
function showSuccess(input) {
  const formGroup = input.parentElement;

  formGroup.className = "form-group success";

  const errorMessage = formGroup.querySelector(".error-message");
  errorMessage.textContent = "";
  errorMessage.className = "error-message";
}

// 检查邮箱格式
function checkEmail(input) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, "Email is not valid");
    return false;
  }
}

// 检查必填字段
function checkRequired(inputArray) {
  let isVaild = true;

  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${input.name} is required`);
      isVaild = false;
    } else {
      showSuccess(input);
    }
  });

  return isVaild;
}

// 检查输入长度
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${input.name} must be at least ${min} characters`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${input.name} must be less than ${max} characters`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// 检查密码是否匹配
function checkPasswordsMatch(password1, password2) {
  if (password1.value !== password2.value) {
    showError(password2, "Passwords do not match");
    return false;
  } else {
    return true;
  }
}

// 禁用默认 HTML5 表单验证
form.setAttribute("novalidate", true);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isRequiredValid = checkRequired([username, email, password, password2]);
  let isLengthValid = true;
  let isEmailValid = checkEmail(email);
  let isPasswordMatch = true;

  if (isRequiredValid) {
    isLengthValid =
      checkLength(username, 3, 15) && checkLength(password, 6, 25);

    isPasswordMatch = checkPasswordsMatch(password, password2);
  }

  if (isRequiredValid && isLengthValid && isEmailValid && isPasswordMatch) {
    alert("Login Done!");
  }
});
