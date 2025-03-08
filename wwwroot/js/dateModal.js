window.initializeDateSwipers = function () {
    // Initialize year slider
    const yearSlider = new Swiper('.year-slider', {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        loop: false,
        slideToClickedSlide: true,
        effect: 'slide',
        speed: 400,
        initialSlide: 0,
        slideActiveClass: 'swiper-slide-active'
    });

    // Initialize month slider
    const monthSlider = new Swiper('.month-slider', {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        loop: false,
        slideToClickedSlide: true,
        effect: 'slide',
        speed: 400,
        initialSlide: 0,
        slideActiveClass: 'swiper-slide-active'
    });

    // Initialize day slider
    const daySlider = new Swiper('.day-slider', {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        loop: false,
        slideToClickedSlide: true,
        effect: 'slide',
        speed: 400,
        initialSlide: 0,
        slideActiveClass: 'swiper-slide-active'
    });

    // Store slider instances
    window.dateSliders = {
        yearSlider,
        monthSlider,
        daySlider
    };
};

window.getActiveSwiperSlideContent = function (sliderName) {
    const slider = window.dateSliders[sliderName.replace('-slider', 'Slider')];
    if (slider && slider.slides[slider.activeIndex]) {
        return slider.slides[slider.activeIndex].textContent.trim();
    }
    return '';
}; 