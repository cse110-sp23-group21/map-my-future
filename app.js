// Main page map JavaScript file

// Wait for all DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
    const locations = document.querySelectorAll(".location");

    // Highlight region when mouse hover
    locations.forEach(location => {
        location.addEventListener('mouseover', () => {
            location.classList.add('highlight');
        });

        location.addEventListener('mouseout', () => {
            location.classList.remove('highlight');
        });

        location.addEventListener('click', () => {
            const locationName = location.getAttribute('data-location');
            // Add navigation to mini-app during Sprint 2 here.
            console.log(`${locationName} is selected.`);
        });
    });
});