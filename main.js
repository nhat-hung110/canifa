const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const productApi = "http://localhost:3000/";

// Trượt banner
const slideBanner = () => {
  const listBanner = $(".list-banner");
  const banners = $$(".list-banner a");
  const rightBtn = $(".banner__right-btn");
  const leftBtn = $(".banner__left-btn");
  const indexBanner = $$(".index-banner__item");
  const bannerWidth = banners[0].offsetWidth;
  let currentIndex = 0;

  const handleChangeBanner = () => {
    currentIndex++;
    if (currentIndex >= banners.length) {
      currentIndex = 0;
    }
    const offset = -currentIndex * bannerWidth;
    listBanner.style.transform = `translateX(${offset}px)`;
    updateIndicator();
  };

  let handleAutoChangeBanner = setInterval(handleChangeBanner, 4000);

  rightBtn.onclick = () => {
    clearInterval(handleAutoChangeBanner);
    handleChangeBanner();
    handleAutoChangeBanner = setInterval(handleChangeBanner, 4000);
  };

  leftBtn.onclick = () => {
    clearInterval(handleAutoChangeBanner);
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = banners.length - 1;
    }
    const offset = -currentIndex * bannerWidth;
    listBanner.style.transform = `translateX(${offset}px)`;
    handleAutoChangeBanner = setInterval(handleChangeBanner, 4000);
    updateIndicator();
  };

  const updateIndicator = () => {
    $(".index-banner--active")?.classList.remove("index-banner--active");
    indexBanner[currentIndex].classList.add("index-banner--active");
  };
};

slideBanner();

// Lay san pham tu API ==> done
// Render san pham vao tung box:
// 1. Dat ten class cac box trung voi productListType, neu trung thi render ra san pham cua nhom do ==> done
// 2. Lap qua tung san pham cua tung loai, render tung san pham vao box ==> done

const productsList = ["AoCN", "AoPhong", "QuanShort", "SPMoi"];
const productsBox = $$(".group-product__list");

productsList.forEach((productsType) => {
  fetch(`${productApi}${productsType}`)
    .then((response) => response.json())
    .then((products) => {
      productsBox.forEach((productBox) => {
        if (productBox.classList.contains(productsType)) {
          const html = products
            .map((product) => renderProduct(product))
            .join("");
          productBox.innerHTML = html;
        }
      });
      products.forEach((product) => {
        handleChangeColor(product)})
    });
});

// Render product color, thêm class current vào color đầu tiên
const renderProductColor = (colors) => {
  const html = colors
    .map((color, index) => {
      return `
        <div class="product__color-border ${
          index == 0 ? "product__color--current" : ""
        }">
          <div class="product__color-inside product-color--${color} "></div>
        </div>
    `;
    })
    .join("");
  return html;
};

// Render ra sản phẩm
const renderProduct = (product) => {
  return `
    <div class="group-product__item">
              <a href="product.html">
                <div class="product__img ">
                 <img src="${product.img[0][0]}" alt="" />
                  <div class="product__add">
                    <span>Thêm nhanh vào giỏ</span>
                  </div>
                </div>
                <div class="product__info">
                <div class="product__name">${product.title}</div>
                <div class="product__price">
                ${product.price}
                <span> đ</span>
                </div>
                </div>
                </a>
                <div class="product__color">
                  ${renderProductColor(product.color)}
                </div>
            </div>`;
};

// Lay ra colorList cua moi san pham:
//1. Lay danh sach mau toan bo san pham => done
//2. Khi click lay the cha dang chua color do => done
//3. Lay san pham chua color => done
//4. Lay anh cua san pham hien tai => done

const handleChangeColor = (product) => {
  const colorList = $$(".product__color-border");

  colorList.forEach((color) => {
    color.onclick = () => {
      const productColorList = color.parentElement;
      const productColor = productColorList.querySelectorAll(".product__color-border");
      
      productColor.forEach((c) => c.classList.remove("product__color--current"));
      color.classList.add("product__color--current");
      
      const productItem = color.closest(".group-product__item");
      const mainImg = productItem.querySelector(".product__img img"); 

      console.log(product.img)
    }
  })
};


