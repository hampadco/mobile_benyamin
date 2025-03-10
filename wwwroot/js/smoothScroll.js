function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const offset = 80; // Adjust this value based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function addSmoothScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Make functions available globally
window.scrollToElement = scrollToElement;
window.addSmoothScroll = addSmoothScroll; 