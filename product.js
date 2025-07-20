// 1. Click vào img-item ==> đổi main-img và thêm class active cho img đang click ==> DONE
// 2. Click vào button trên img ==> đổi main-img và thêm class active cho img đang click ==> done
// 3. Render ra color-list
// 4. Click vào color ==> đổi color-title và đổi ảnh sản phẩm
// 5. Click vào size ==> đổi size-title
// 6. Click vào detail-icon ==> đổi icon sang '-' và hiện detail
// 7. Click vào add-btn thì hiện toast "Thêm thành công"

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const leftBtn = $(".img-left-btn");
const rightBtn = $(".img-right-btn");
const navImgList = $$(".nav-img-item");
const mainImg = $(".main-img img");
const navImgArray = Array.from(navImgList); // Chuyển nodelist thành array
let currentIndex = 0;

// Thay đổi ảnh dựa trên sự kiện click vào nav-img
// Gán mainImg.src = navImgItem.src
const handleChangeImg = () => {
  mainImg.src = navImgList[0].src;
  navImgList.forEach((item) =>
    item.addEventListener("click", () => {
      mainImg.src = item.src;
      removeClassActive()
      item.classList.add("active");
      currentIndex = navImgArray.findIndex((item) =>
        item.classList.contains("active")
      ); // Tìm index của phần tử có chứa class active
    })
  );
};

// Thay đổi ảnh dựa trên sự kiện click Btn
const handleChangeImgOnBtn = () => {
  leftBtn.onclick = () => {
    if (currentIndex <= 0) {
      currentIndex = navImgList.length - 1;
    } else {
      currentIndex--;
    }
    mainImg.src = navImgList[currentIndex].src;
    removeClassActive()
    navImgList[currentIndex].classList.add("active");
  };

  rightBtn.onclick = () => {
    if (currentIndex >= navImgList.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    mainImg.src = navImgList[currentIndex].src;
    removeClassActive()
    navImgList[currentIndex].classList.add("active");
  };
};

// Remove item chứa class active
const removeClassActive = () => {
  const activeImg = $(".nav-img-item.active");
  activeImg.classList.remove("active");
};

handleChangeImg();
handleChangeImgOnBtn();
