// Main page map JavaScript file

// Wait for all DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
    const locations = document.querySelectorAll(".location");
    const map = document.getElementsByClassName("map")[0];

    // Background music
    var bgm = new Audio('/assets/map-my-future-bgm.ogg');
    bgm.play();
    bgm.loop = true;

    // Region clicked/selected
    locations.forEach(location => {
        location.addEventListener('click', () => {
            const locationName = location.getAttribute('data-location');
            // Add navigation to mini-app during Sprint 2 here.
            console.log(`${locationName} is selected.`);
        });
    });

    // Buttons
    let musicEnabled = true;
    let musicDuration = 0;
    let showInfo = false;
    const musicButton = document.getElementById('music-button');
    const infoButton = document.getElementById('info-button');

    musicButton.addEventListener('click', (e) => {
        const musicImg = document.querySelectorAll('img')[0];
        if (musicEnabled) {
            musicImg.src = '/assets/audio_off.png';
            bgm.pause();
        }
        else {
            musicImg.src = '/assets/audio_on.png';
            bgm.play();
        }
        musicEnabled = !musicEnabled;
    });

    infoButton.addEventListener('click', (e) => {
        const infoPopup = document.getElementById('info-popup');
        infoPopup.style.display = !showInfo ? 'flex' : 'none';
        showInfo = !showInfo;
    });

});

function makeDraggable(evt) {
    let selectedElement = null;
    let offset = { x: 0, y: 0 };
    let svg = evt.target;
    let transform = null;
    var minX, minY, maxX, maxY;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);

    function getMousePosition(evt) {
        let CTM = svg.getScreenCTM();
        return { x: (evt.clientX - CTM.e) / CTM.a, y: (evt.clientY - CTM.f) / CTM.d };
    }
    function startDrag(evt) {
        selectedElement = evt.target.parentNode;
        if (selectedElement.classList.contains('undraggable')) {
            selectedElement = null;
            return;
        }

        // Set drag constraint
        if (selectedElement.classList.contains("confined")) {
            bbox = selectedElement.getBBox();
            minX = -100 - bbox.x;
            maxX = 2200 - bbox.x - bbox.width;
            minY = -30 - bbox.y;
            maxY = 1200 - bbox.y - bbox.height;
        }
        offset = getMousePosition(evt);
        let transforms = selectedElement.transform.baseVal;

        if (transforms.length === 0 ||
            transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
            // Create an transform that translates by (0, 0)
            let translate = svg.createSVGTransform();
            translate.setTranslate(0, 0);
            // Add the translation to the front of the transforms list
            selectedElement.transform.baseVal.insertItemBefore(translate, 0);
        }
        // Get initial translation amount
        transform = transforms.getItem(0);
        offset.x -= transform.matrix.e;
        offset.y -= transform.matrix.f;
    }
    function drag(evt) {
        if (selectedElement) {
            evt.preventDefault();
            var coord = getMousePosition(evt);
            var dx = coord.x - offset.x;
            var dy = coord.y - offset.y;

            // Add drag constraint
            if (selectedElement.classList.contains("confined")) {
                if (dx < minX) { dx = minX; }
                else if (dx > maxX) { dx = maxX; }
                if (dy < minY) { dy = minY; }
                else if (dy > maxY) { dy = maxY; }
            }
            transform.setTranslate(dx, dy);
        }
    }
    function endDrag(evt) {
        selectedElement = null;
    }
}