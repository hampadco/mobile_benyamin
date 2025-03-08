window.initializeDatePickers = function () {
    const yearSlider = new Swiper('.year-slider', {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        loop: false,
        slideToClickedSlide: true,
        effect: 'slide',
        speed: 400
    });

    const monthSlider = new Swiper('.month-slider', {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        loop: false,
        slideToClickedSlide: true,
        effect: 'slide',
        speed: 400
    });

    const daySlider = new Swiper('.day-slider', {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        loop: false,
        slideToClickedSlide: true,
        effect: 'slide',
        speed: 400
    });
}; 