"use strict";

const mobileScreenSlider = new Swiper(".mobile-screen-slider", {
  slidesPerView: 1,
  slidesToShow: 1,
  paginationClickable: true,
  spaceBetween: 24,
  simulateTouch: false,
});

const navigationButton = document.querySelector(".navigation");
const signInLinks = document.querySelector(".links");

const onboardingStepsSlider = new Swiper(".onboarding-steps-slider", {
  slidesPerView: 1,
  slidesToShow: 1,
  paginationClickable: true,
  spaceBetween: 48,
  pagination: {
    el: ".onBoardingsliderPagingation",
    clickable: true,
  },
  navigation: {
    nextEl: document.querySelector(".ara-next"),
  },
  thumbs: {
    swiper: mobileScreenSlider,
  },
});

onboardingStepsSlider.on("reachEnd", function () {
  navigationButton.classList.add("hidden");
  navigationButton.classList.remove("flex");

  signInLinks.classList.remove("hidden");
  signInLinks.classList.add("flex");
});

const sliderProgress = document.querySelector(".progress");
const circleTwo = document.querySelector(".circleTwo");
const circleThree = document.querySelector(".circleThree");
const circleFour = document.querySelector(".circleFour");

const circles = [circleTwo, circleThree, circleFour];
const progressValues = [33, 67, 100];

onboardingStepsSlider.on("slideChange", () => {
  const currentIndex = onboardingStepsSlider.realIndex;

  // Loop through each circle and update the styles based on the current index
  circles.forEach((circle, index) => {
    if (index <= currentIndex - 1) {
      circle.classList.remove("bg-white");
      circle.classList.add("bg-p1", "dark:bg-p1");
    } else {
      circle.classList.remove("bg-p1", "dark:bg-p1");
      circle.classList.add("bg-white");
    }
  });

  // Update the progress bar width
  if (currentIndex === 0) {
    sliderProgress.style.width = 0 + "%";
  }
  sliderProgress.style.width = progressValues[currentIndex - 1] + "%";
});

const adultCountSlider = new Swiper(".adult-count-slider", {
  slidesPerView: 3,
  slidesToShow: 1,
  spaceBetween: 6,
  direction: "vertical",
  centeredSlides: true,
});
const childCountSlider = new Swiper(".child-count-slider", {
  slidesPerView: 3,
  slidesToShow: 1,
  spaceBetween: 6,
  direction: "vertical",
  centeredSlides: true,
});

const hotelDetailsSlider = new Swiper(".hotel-details-slider", {
  slidesPerView: 1,
  slidesToShow: 1,
  spaceBetween: 0,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
