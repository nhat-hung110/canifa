const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Trượt banner

const listBanner = $(".list-banner");
const banners = $$(".list-banner a");
const rightBtn = ('.banner__right-btn')
const leftBtn = ('.banner__left-btn')

const bannerWidth = banners[0].offsetWidth;
let currentIndex = 0;

setInterval(() => {
  currentIndex++;
  if (currentIndex >= banners.length) {
    currentIndex = 0;
  }
  const offset = -currentIndex * bannerWidth;
  listBanner.style.transform = `translateX(${offset}px)`;
}, 4000);
