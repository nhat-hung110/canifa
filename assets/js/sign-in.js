import{$, $$ } from './main.js'
import{addedProduct, renderCart } from './cart.js'

const userApi = "http://localhost:3000/user";

// Hàm valid form:
// Khi không có value thì show lỗi => done
// Kiểm tra SĐT => done
// Kiểm tra độ dài => done
// Kiểm tra mật khẩu nhập lại => done
const handleValidForm = () => {
  const signUpInputs = $$(".sign-up-wrapper input");
  const numberInput = $("#number-sign-up-input");
  const nameInput = $("#fullname-input");
  const passwordInput = $("#sign-up-password-input");
  const confirmPasswordInput = $("#confirm-password-input");
  const signUpBtn = $(".sign-up-btn");
  const signInBtn = $(".sign-in-btn");
  const signInInputs = $$(".sign-in-wrapper input");

  const showError = (input, message) => {
    const parentElement = input.parentElement;
    const errorElement = parentElement.querySelector(".message");
    errorElement.innerHTML = message;
  };

  const isEmpty = (input) => {
    return input.value.trim() == "";
  };

  const isValidPhone = (value) => {
    const regex = /^(0|\+84)\d{9}$/;
    return regex.test(value.trim());
  };

  const minLength = (value, length) => {
    return value.length >= length;
  };

  const isConfirmPassword = (value, valueConfirm) => {
    return value == valueConfirm;
  };

  const validForm = (input) => {
    if (isEmpty(input)) {
      showError(input, "Bạn phải nhập trường này");
      input.classList.add("invalid");
    } else {
      showError(input, "");
      input.classList.remove("invalid");
      if (input == numberInput && !isValidPhone(input.value)) {
        showError(input, "Phải nhập đúng định dạng số điện thoại");
        input.classList.add("invalid");
      }
      if (input == passwordInput && !minLength(input.value, 6)) {
        showError(input, "Mật khẩu phải có tối thiểu 6 ký tự");
        input.classList.add("invalid");
      }
      if (
        input == confirmPasswordInput &&
        !isConfirmPassword(passwordInput.value, input.value)
      ) {
        showError(input, "Mật khẩu nhập lại không đúng");
        input.classList.add("invalid");
      }
    }
  };

  signUpInputs.forEach((input) => {
    input.onblur = () => validForm(input);
    input.oninput = () => {
      showError(input, "");
      input.classList.remove("invalid");
    };
  });

  signInInputs.forEach((input) => {
    input.onblur = () => validForm(input);
    input.oninput = () => {
      showError(input, "");
      input.classList.remove("invalid");
    };
  });

  // Nếu có input invalid thì hiển thị lỗi
  // Nếu tất cả đã valid thì hiển thị đăng ký thành công và post dữ liệu lên API
  signInBtn.onclick = () => {
    signInInputs.forEach((input) => validForm(input));
  };

  signUpBtn.onclick = () => {
    signUpInputs.forEach((input) => validForm(input));

    const hasInvalidInput = [...signUpInputs].some((input) =>
      input.classList.contains("invalid")
    );

    if (!hasInvalidInput) {
      const userInfo = {
        number: numberInput.value,
        user: nameInput.value,
        password: passwordInput.value,
      };

      updateUserInfo(userInfo);

      signUpInputs.forEach((input) => (input.value = ""));

      const toSignUpBtn = $(".to-sign-up-btn");
      const signInBtn = $(".user-box-title .sign-in");
      const signUpBtn = $(".user-box-title .sign-up");
      const signInBox = $(".sign-in-wrapper");
      const signUpBox = $(".sign-up-wrapper");
      const successSignUpBox = $(".succes-sign-up");

      signUpBox.classList.remove("active");
      successSignUpBox.classList.add("active");

      toSignUpBtn.onclick = () => {
        successSignUpBox.classList.remove("active");
        signUpBtn.classList.remove("active");
        signInBtn.classList.add("active");
        signInBox.classList.add("active");
      };
    }
  };
};

const updateUserInfo = (data) => {
  fetch(userApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

// hàm xử lý đăng nhập:
// Get userApi để lấy đúng user và mk ==> done
// Đăng nhập thành công: lưu user vào local storage, hiển thị tên tài khoản và số điện thoại
// Đăng xuất: xóa dữ liệu khỏi local storage và trả lại giao diện đăng nhập

const getUserInfo = () => {
  return fetch(userApi).then((response) => response.json());
};

const handleSignInBox = () => {
  const signInBtn = $(".user-box-title .sign-in");
  const signUpBtn = $(".user-box-title .sign-up");
  const signInBox = $(".sign-in-wrapper");
  const signUpBox = $(".sign-up-wrapper");

  signInBtn.onclick = () => {
    signUpBtn.classList.remove("active");
    signUpBox.classList.remove("active");
    signInBtn.classList.add("active");
    signInBox.classList.add("active");
  };

  signUpBtn.onclick = () => {
    signInBtn.classList.remove("active");
    signInBox.classList.remove("active");
    signUpBtn.classList.add("active");
    signUpBox.classList.add("active");
  };
};

const handleSignIn = () => {
  const errorElement = $(".sign-in-mesage");
  const signInBtn = $(".sign-in-btn");
  const signInBox = $(".user-box__content");
  const userInfoBox = $(".user-box__content.user-info");
  const userName = $(".user-name span");
  const userNumber = $(".user-number span");

  signInBtn.onclick = () => {
    const number = $("#sign-in-input").value.trim();
    const password = $("#sign-in-password-input").value.trim();
    if (!number || !password) {
      errorElement.innerHTML = `Số điện thoại và mật khẩu không được để trống`;
    } else {
      getUserInfo().then((users) => {
        const matchedUser = users.find(
          (user) => user.number == number && user.password == password
        );
        if (matchedUser) {
          localStorage.setItem("currentUser", JSON.stringify(matchedUser));
          localStorage.setItem("isLogin", JSON.stringify(true));
          errorElement.innerHTML = "";
          signInBox.classList.remove("active");
          userInfoBox.classList.add("active");
          userName.innerHTML = matchedUser.user;
          userNumber.innerHTML = matchedUser.number;
          alert("Đăng nhập thành công");
          renderCart(addedProduct);
        } else {
          errorElement.innerHTML = `*Số điện thoại hoặc mật khẩu không đúng`;
        }
      });
    }
  };
};

const handleLogOut = () => {
  const logOutBtn = $(".log-out-btn");
  const signInBox = $(".user-box__content");
  const userInfoBox = $(".user-box__content.user-info");

  logOutBtn.onclick = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLogin");

    userInfoBox.classList.remove("active");
    signInBox.classList.add("active");
    renderCart(addedProduct);
  };
};

const checkLoginStatus = () => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const signInBox = $(".user-box__content");
  const userInfoBox = $(".user-box__content.user-info");
  const userName = $(".user-name span");
  const userNumber = $(".user-number span");

  if (isLogin && currentUser) {
    signInBox.classList.remove("active");
    userInfoBox.classList.add("active");
    userName.innerHTML = currentUser.user;
    userNumber.innerHTML = currentUser.number;
  }
};

handleValidForm();
handleSignInBox();
handleSignIn();
checkLoginStatus();
handleLogOut();
