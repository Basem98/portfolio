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
 * @description Toggle the navigation menu in smaller displays
 */

function toggleMobileNavBar() {
    navMenu.style.display = navMenu.style.display == 'none' ? 'flex' : 'none';
}


/**
 * Events
 */


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