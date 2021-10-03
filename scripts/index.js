/**
 * Global Variables
 */

/**
 * A list of the navigation items in the side navigation bar
 */
const navItems = document.getElementsByClassName('nav-items').item(0);
const mobileNav = document.getElementsByClassName('toggle-nav').item(0);
const navToggler = document.getElementsByClassName('navbar-toggler').item(0);
const navMenu = document.getElementsByClassName('nav-menu').item(0);
const mainSection = document.getElementsByClassName('main-section').item(0);
const resumeSections = document.getElementsByClassName('resume-itm');
const imgIcon = document.getElementsByClassName('img-icon').item(0);
const imgContainer = document.getElementsByClassName('img-container').item(0);
const closeImg = document.getElementsByClassName('close-img').item(0);
const activeImg = document.getElementsByClassName('active-img').item(0);
const projectsContainer = document.getElementsByClassName('projects-container').item(0);
const projectsThumbnails = projectsContainer.getElementsByTagName('img');
const previewExitSign = document.getElementsByClassName('close-preview').item(0);
const playNextVideo = document.getElementsByClassName('rArrow').item(0);
const playPrevVideo = document.getElementsByClassName('lArrow').item(0);
const projectDescriptionContainer = document.getElementsByClassName('project-description').item(0);
const currentProjectTitle = document.getElementsByClassName('project-title').item(0);
const videoPlayer = document.getElementsByClassName('video-player').item(0);
const ToggleModeContainer = document.getElementsByClassName('toggle-mode-container').item(0);
const modeSwitchBtn = document.getElementsByClassName('mode-switch').item(0);
const currentMode = document.getElementsByClassName('current-mode').item(0);

const colorPalette = {
    light: {
        primary: '#f8f1f1',
        secondary: '#459996',
        nav: '#a3d2ca'
    },
    dark: {
        primary: '#1B262C',
        secondary: '#BBE1FA',
        nav: '#0F4C75'
    }
};

let lastActivatedSection = '';
let prevContainer = '';
let projectDescription = '';
let currentDescriptionIndex = '';

/**
 * Helper Functions
 */

/**
 * @description Switch the color mode,
 * while smoothly changing the position and color of the toggler
 */
function switchColorModes() {
    if (modeSwitchBtn.classList.contains('active-dark')) {
        modeSwitchBtn.classList.remove('active-dark');
        modeSwitchBtn.classList.add('active-light');
        currentMode.classList.remove('active-dark-text');
        currentMode.classList.add('active-light-text');
        currentMode.textContent = 'Light';
        setTimeout(() => {
            document.documentElement.style.setProperty('--primary-bg', colorPalette.light.primary);
            document.documentElement.style.setProperty('--nav-bg', colorPalette.light.nav);
            document.documentElement.style.setProperty('--txt-color', colorPalette.light.secondary);
        }, 500);

    } else {
        modeSwitchBtn.classList.remove('active-light');
        modeSwitchBtn.classList.add('active-dark');
        currentMode.classList.remove('active-light-text');
        currentMode.classList.add('active-dark-text');
        currentMode.textContent = 'Dark';
        setTimeout(() => {
            document.documentElement.style.setProperty('--primary-bg', colorPalette.dark.primary);
            document.documentElement.style.setProperty('--nav-bg', colorPalette.dark.nav);
            document.documentElement.style.setProperty('--txt-color', colorPalette.dark.secondary);
        }, 500);
    }
}

/**
 * @description Given a specified anchor element, activate it along with its parent list item,
 * and make sure to deactivate any previously activated navigation items
 * @param {HTMLElement} specifiedAnchor The anchor element that should be activated 
 */
function activateNavItem(specifiedAnchor) {
    if (!specifiedAnchor.classList.contains('active-nav-anchor')) {
        for (let i = 0; i < navItems.children.length; i += 1) {
            const currentListItem = navItems.children.item(i);


            if (currentListItem.classList.contains('active-nav-item')) {
                currentListItem.classList.remove('active-nav-item');
                currentListItem.children.item(0).classList.remove('active-nav-anchor');
                currentListItem.classList.add('inactive-nav-item');
                setTimeout(
                    () => currentListItem.classList.remove('inactive-nav-item')
                    , 300
                );
                break;
            }
        }
        specifiedAnchor.classList.add('active-nav-anchor');
        specifiedAnchor.parentElement.classList.add('active-nav-item');
    }
}


/**
 * @description Check to determine which section is currently in the viewport,
 * and activate that section's navigation item in the navigation bar
 */
function activateNavOnScrolling() {
    /**
     * Get the current viewport position, and keep double the height of the mobile navigation bar in mind
     */
    const windowPosition = window.scrollY + 2 * navToggler.clientHeight;
    let sectionOffset = lastActivatedSection.offsetTop;
    let sectionHeight = lastActivatedSection.offsetHeight;
    let sectionIndex;

    /**
     * Check whether the latest activated section is still in the viewport,
     * if so, then termine, because executing the code would be useful only when the section changes.
     */
    if (sectionOffset <= windowPosition && (sectionOffset + sectionHeight) > windowPosition)
        return;

    for (let i = 0; i < resumeSections.length; i += 1) {
        sectionOffset = resumeSections.item(i).offsetTop;
        sectionHeight = resumeSections.item(i).offsetHeight;
        if (sectionOffset <= windowPosition && (sectionOffset + sectionHeight) > windowPosition) {
            sectionIndex = i;
            break;
        }
    }
    lastActivatedSection = resumeSections.item(sectionIndex);
    const currentSectionID = lastActivatedSection.id;
    const selector = `a[href='#${currentSectionID}']`;
    const currentSectionsAnchor = document.querySelector(selector);

    activateNavItem(currentSectionsAnchor);

}


/**
 * @description When a project's thumbnail is clicked, open the preview page for that specific project,
 * based on the image's id. Then dynamically add all the project-specific data for that project.
 * @param {Event} event An event object that's based on the main Event interface,
 * and has properties specific to the dispatched event
 */
function previewProject(event) {
    const clickedThumbnail = event.target;
    const projectID = clickedThumbnail.id;

    /** 
     * Turn the array-like HTMLCollection of thumbnails into an array,
     * by using call() to make it the "this" value inside of slice,
     * then slice would make an array copy of the collection,
     * and eventually search it for the clickedThumbnail and get its index
     */
    currentDescriptionIndex = Array.prototype.slice.call(projectsThumbnails).indexOf(clickedThumbnail);

    prevContainer = document.getElementsByClassName('preview-container').item(0);
    projectDescription = document.getElementsByClassName(`${projectID}-desc`).item(0);

    currentProjectTitle.textContent = clickedThumbnail.alt;
    videoPlayer.src = `${clickedThumbnail.src.slice(0, -4)}.m4v`;
    projectDescription.style.display = 'flex';
    prevContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}


/**
 * @description When the exit "X" sign is clicked, close the preview page and return to the portfolio
 */
function exitProjectPreview() {
    if (prevContainer) {
        prevContainer.style.display = 'none';
        projectDescription.style.display = 'none';
        document.body.style.overflowY = 'scroll';
    }
}


/**
 * @description Preview the description page for either the next or the previoues project
 * @param {Number} indexIncrementer A number that can either be 1 or -1, based on the clicked arrow,
 * which is then used to determine whether to preview the next or the previous project
 */
function switchProject(indexIncrementer) {
    currentDescriptionIndex += indexIncrementer;
    currentDescriptionIndex = currentDescriptionIndex == projectsThumbnails.length ? 0
        : currentDescriptionIndex < 0 ? projectsThumbnails.length - 1 : currentDescriptionIndex;

    const newProjectThumbnail = projectsThumbnails.item(currentDescriptionIndex);

    projectDescription.style.display = 'none';

    currentProjectTitle.textContent = newProjectThumbnail.alt;
    videoPlayer.src = `${newProjectThumbnail.src.slice(0, -4)}.m4v`;

    projectDescription = document.getElementsByClassName(`${newProjectThumbnail.id}-desc`).item(0);
    projectDescription.style.display = 'flex';
}


/**
 * @description Toggle the navigation menu in smaller displays
 */
function toggleMobileNavBar() {
    if (navMenu.style.display == 'flex') {
        navMenu.classList.add('inactive-nav-menu');
        setTimeout(() => {
        navMenu.classList.remove('inactive-nav-menu');
        navMenu.style.display = 'none';
        }, 300);
    } else {
        navMenu.style.display = 'flex';
    }
}


/**
 * Events
 */


document.addEventListener('scroll', activateNavOnScrolling);

/** Desktop-specific event handlers */

/**
 * Switch color modes
 */
// modeSwitchBtn.addEventListener('click', switchColorModes);
ToggleModeContainer.addEventListener('click', switchColorModes);


/**
 * When a navigation item is clicked, change its color and its background
 */
if (document.body.clientWidth > 850) {
    for (let i = 0; i < navItems.children.length; i += 1) {
        const currentAnchor = navItems.children.item(i).children.item(0);
        currentAnchor.addEventListener('click', (event) => {
            activateNavItem(event.target);
        });
    }
}

/**
 * Toggle the navigation menu in smaller displays
 */
navToggler.addEventListener('click', toggleMobileNavBar);

/**
 * When a project thumbnail is clicked, open the preview page of that project
 */
for (let i = 0; i < projectsThumbnails.length; i += 1) {
    const currentProjectThumb = projectsThumbnails.item(i);
    currentProjectThumb.addEventListener('click', previewProject);
}


/**
 * When the exit "X" sign is clicked, close the project's preview page
 */
previewExitSign.addEventListener('click', exitProjectPreview);


/**
 * When the right arrow is clicked, switch to next project
 */
playNextVideo.addEventListener('click', () => switchProject(1));


/**
 * When the left arrow is clicked, switch to previous project
 */
playPrevVideo.addEventListener('click', () => switchProject(-1));


/** Mobile-specific event handlers */


if (document.body.clientWidth < 850) {
    /**
     * Set the position of the hidden navigation menu and the main section,
     * based on the position of the fixed navigation bar toggler,
     * only when the DOM content is loaded.
     * This is a mobile-specific event listener!
     */
    document.addEventListener('DOMContentLoaded', () => {
        const navBarTogglerHeight = window.getComputedStyle(mobileNav).height;
        navMenu.style.top = `${parseInt(navBarTogglerHeight) - 1}px`;
        mainSection.style.top = navBarTogglerHeight;
    });
    /**
     * Fold the navbar, whenever the user clicks out of it
     */
    mainSection.addEventListener('click', () => {
        navMenu.classList.add('inactive-nav-menu');
        setTimeout(() => {
            navMenu.style.display = 'none';
            navMenu.classList.remove('inactive-nav-menu');
        }, 300);
    });
}



/**
 * When the user clicks the image icon,
 * Make it scale and move smoothly to the center of the display
 */
imgIcon.addEventListener('click', () => {
    imgContainer.style.display = 'flex';
    activeImg.classList.add('animated-img');
});

closeImg.addEventListener('click', () => {
    activeImg.classList.remove('animated-img');
    imgContainer.style.display = 'none';
});

