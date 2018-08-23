
document.addEventListener('DOMContentLoaded', () => {
    let arrayOfMenuItems = document.querySelectorAll('body > header > nav > ul > li > a');

    arrayOfMenuItems.forEach((menuItem, index, arr) => {
        menuItem.onclick = (event) => {
            event.preventDefault();

            let previousActiveItem = document.querySelector('.active');

            if(previousActiveItem != null && previousActiveItem != menuItem){
                previousActiveItem.classList.remove('active');
            }

            menuItem.parentElement.classList.add('active');
        };
    });
});