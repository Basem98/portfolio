/**
 * Global Variables
 */

/**
 * A list of the navigation items in the side navigation bar
 */
const navItems = document.getElementsByClassName('nav-items').item(0);


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
 * Events
 */


/**
 * When a navigation item is clicked, change its color and its background
 */
for (let i = 0; i < navItems.children.length; i += 1) {
    const currentAnchor = navItems.children.item(i).children.item(0);
    currentAnchor.addEventListener('click', activateNavItem);
}