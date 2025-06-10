document.addEventListener('DOMContentLoaded', () => {
    // Basic Timed Carousel Logic for Hero Section
    const carouselImages = document.querySelectorAll('.carousel-container .carousel-image');
    let currentImageIndex = 0;
    const imageChangeInterval = 5000; // Change image every 5 seconds

    function showNextImage() {
        if (carouselImages.length === 0) return;

        carouselImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        carouselImages[currentImageIndex].classList.add('active');
    }

    if (carouselImages.length > 1) { // Only start carousel if there's more than one image
        carouselImages[0].classList.add('active'); // Show first image immediately
        setInterval(showNextImage, imageChangeInterval);
    } else if (carouselImages.length === 1) {
        carouselImages[0].classList.add('active'); // Show the single image
    }

    // Scroll-Driven Animations for Text/Sections (using Intersection Observer)
    // Add the class "animated-element" to HTML elements you want to animate on scroll.
    // The corresponding CSS is in style.css
    const animatedElements = document.querySelectorAll('.info-section'); // Animate all info sections

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Optional: unobserve after animation to save resources if animation should only happen once
                    // observerInstance.unobserve(entry.target);
                } else {
                    // Optional: remove class if you want animation to repeat when scrolling out and back in
                    // entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    console.log("Angie's 40th Invite Page Loaded! Let's get this party started!");
});