document.addEventListener('DOMContentLoaded', () => {
    // --- Carousel Logic ---
    const carouselImages = document.querySelectorAll('.carousel-container .carousel-image');
    const infoSections = document.querySelectorAll('main .info-section');
    let currentActiveImageIndex = -1; // Use -1 to ensure the first image is set

    function setActiveCarouselImage(index) {
        if (index >= 0 && index < carouselImages.length) {
            carouselImages.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
            currentActiveImageIndex = index;
        }
    }

    // Initialize first image (for hero area)
    if (carouselImages.length > 0) {
        setActiveCarouselImage(0);
    }

    // --- Animation Logic for .animated-element ---
    const animatedElements = document.querySelectorAll('.animated-element');

    function checkAnimationsInView() {
        const triggerBottom = window.innerHeight / 5 * 4.5; // Element top needs to be above this line

        animatedElements.forEach(element => {
            const boxTop = element.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                element.classList.add('in-view');
            } else {
                // Optional: remove class if you want elements to re-animate when scrolling up
                element.classList.remove('in-view');
            }
        });
    }

    // --- Scroll Event Handler ---
    function handlePageScroll() {
        // Background image change logic
        let targetImageIndex = 0; // Default to hero image (index 0)

        // Determine which info-section is "active" to change the background
        // The image index will be section_index + 1 (as image 0 is for hero)
        for (let i = infoSections.length - 1; i >= 0; i--) {
            const section = infoSections[i];
            const sectionRect = section.getBoundingClientRect();

            // If the section's top is above the viewport's vertical center,
            // it (or a section before it) dictates the background.
            if (sectionRect.top < window.innerHeight / 2) {
                targetImageIndex = Math.min(i + 1, carouselImages.length - 1);
                break; // Found the highest relevant section
            }
        }

        if (targetImageIndex !== currentActiveImageIndex) {
            setActiveCarouselImage(targetImageIndex);
        }

        // Content animations
        checkAnimationsInView();
    }

    // Initial checks on load
    checkAnimationsInView();
    handlePageScroll(); // Call once to set initial image based on any pre-scroll state

    window.addEventListener('scroll', handlePageScroll);
});