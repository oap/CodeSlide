// Function to toggle fullscreen mode for an element
function toggleFullScreen(element) {
    if (!element) {
        console.error("No element provided for fullscreen toggle.");
        return;
    }

    if (!document.fullscreenElement) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen(); // Firefox
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(); // Chrome, Safari, Opera
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen(); // IE/Edge
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen(); // Firefox
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen(); // Chrome, Safari, Opera
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen(); // IE/Edge
        }
    }
}

// Function to add a fullscreen button above the iframe on the current slide
function addFullscreenButtonToIframe() {
    const visibleSlide = document.querySelector('.remark-visible');
    if (visibleSlide) {
        const iframe = visibleSlide.querySelector('iframe');
        if (iframe) {
            console.log('Found iframe within the visible slide:', iframe);

            // Check if the button already exists for this iframe
            if (
                !iframe.previousSibling || // Ensure previousSibling is valid
                !iframe.previousSibling.classList || // Ensure it has a classList
                !iframe.previousSibling.classList.contains('fullscreen-button') // Check for button
            ) {
                const button = document.createElement('button');
                button.textContent = 'Toggle Fullscreen';
                button.className = 'fullscreen-button';
                button.style.marginBottom = '10px';
                button.style.padding = '10px 20px';
                button.style.backgroundColor = '#007BFF';
                button.style.color = 'white';
                button.style.border = 'none';
                button.style.borderRadius = '5px';
                button.style.cursor = 'pointer';

                // Add click event to toggle fullscreen for the iframe
                button.onclick = () => toggleFullScreen(iframe);

                // Insert the button above the iframe
                iframe.parentNode.insertBefore(button, iframe);
                console.log('Fullscreen button added above the iframe.');
            } else {
                console.log('Fullscreen button already exists.');
            }
        } else {
            console.warn('No iframe found within the visible slide.');
        }
    } else {
        console.error('No visible slide found.');
    }
}

function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to wait until slides are fully rendered and attach event listeners
function initializeRemarkSlides() {
    const markdownFile = getQueryParameter('file');

    if (markdownFile) {
        console.log('Markdown file specified:', markdownFile);
        const slideshow = remark.create({
            sourceUrl: `../slides/${markdownFile}`,
            ratio: '16:9'
        });
        // Add the fullscreen button when the slide changes
        slideshow.on('showSlide', () => {
            setTimeout(() => addFullscreenButtonToIframe(), 100); // Small delay for rendering
        });
    } else {
        // Show an error if no markdown file is specified
        document.body.innerHTML = '<h1>Error</h1><p>No markdown file specified.</p>';
        console.error('No markdown file specified.');
    }


}

// Wait for the DOM to load, then initialize the slides
document.addEventListener('DOMContentLoaded', () => {
    console.log('Waiting for slides to render...');
    setTimeout(() => {
        initializeRemarkSlides();
        console.log('Slides initialized.');
    }, 300); // Delay to ensure rendering is complete
});
