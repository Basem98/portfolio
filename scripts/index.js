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
const imgIcon = document.getElementsByClassName('img-icon').item(0);
const imgContainer = document.getElementsByClassName('img-container').item(0);
const activeImg = document.getElementsByClassName('active-img').item(0);
const projectsContainer = document.getElementsByClassName('projects-container').item(0);
const projectsThumbnails = projectsContainer.getElementsByTagName('img');
const previewExitSign = document.getElementsByClassName('exit-sign').item(0);
const playNextVideo = document.getElementsByClassName('rArrow').item(0);
const playPrevVideo = document.getElementsByClassName('lArrow').item(0);
const projectDescriptionContainer = document.getElementsByClassName('project-description').item(0);
const currentProjectTitle = document.getElementsByClassName('project-title').item(0);
const videoPlayer = document.getElementsByClassName('video-player').item(0);


let prevContainer = '';
let projectDescription = '';
let currentDescriptionIndex = '';

/**
 * Helper Functions
 */


/**
 * @description Change the styling of a navigation item
 * when it's clicked
 * @param {Event} event An event object that's based on the main Event interface,
 * and has properties specific to the dispatched event
 */

function activateNavItem(event) {
    const clickedAnchor = event.target;
    if (document.body.clientWidth < 850)
        navMenu.style.display = 'none';

    if (!clickedAnchor.classList.contains('active-nav-anchor')) {
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
        clickedAnchor.classList.add('active-nav-anchor');
        clickedAnchor.parentElement.classList.add('active-nav-item');

    }
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
    navMenu.style.display = navMenu.style.display == 'none' ? 'flex' : 'none';
}


/**
 * Events
 */


/** Desktop-specific event handlers */

/**
 * When a navigation item is clicked, change its color and its background
 */
for (let i = 0; i < navItems.children.length; i += 1) {
    const currentAnchor = navItems.children.item(i).children.item(0);
    currentAnchor.addEventListener('click', activateNavItem);
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

/**
 * Set the position of the hidden navigation menu and the main section,
 * based on the position of the fixed navigation bar toggler,
 * only when the DOM content is loaded.
 * This is a mobile-specific event listener!
 */
if (document.body.clientWidth < 850)
    document.addEventListener('DOMContentLoaded', () => {
        const navBarTogglerHeight = window.getComputedStyle(mobileNav).height;
        navMenu.style.top = navBarTogglerHeight;
        mainSection.style.top = navBarTogglerHeight;
    });


/**
 * When the user clicks the image icon,
 * Make it scale and move smoothly to the center of the display
 */
imgIcon.addEventListener('click', () => {
    imgContainer.style.display = 'flex';
    activeImg.classList.add('animated-img');
    setTimeout(() => {
        activeImg.classList.remove('animated-img');
        imgContainer.style.display = 'none';
    }, 8000);
});

