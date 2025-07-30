import {
  addedProduct,
  renderCart,
  renderCartProduct,
  handleEditCart,
  displayPayment,
  handlePayment,
  handleSignInBox,
  validForm,
  updateUserInfo,
  getUserInfo,
  handleSignIn,
  handleLogOut,
  checkLoginStatus,
} from "./product.js";

import {
  $,
  $$,
  productApi,
  renderProductColor,
  renderProduct,
  handleChangeColor,
} from "./main.js";

const productsList = ["AoPhongNu"];
const tagProductBox = $$(".tag-product__list");

console.log(tagProductBox);
console.log(123)

productsList.forEach((productsType) => {
  fetch(`${productApi}${productsType}`)
    .then((response) => response.json())
    .then((products) => {
        console.log(products)
      tagProductBox.forEach((productBox) => {
        if (productBox.classList.contains(productsType)) {
          const html = products
            .map((product) => renderProduct(product, productsType))
            .join("");
          productBox.innerHTML = renderTagBtn() + html;
        }
      });
    })
    .then(() => handleChangeColor());
});

const renderTagBtn = () => {
  return `
    <div class="tag-product__left-icon">
                <i class="fa-solid fa-arrow-left"></i>
              </div>
              <div class="tag-product__right-icon">
                <i class="fa-solid fa-arrow-right"></i>
              </div>`;
};
