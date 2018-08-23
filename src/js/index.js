
document.addEventListener("DOMContentLoaded", ()=>{

    let elementsStore = createElementsStore();

    let menuItems = document.querySelectorAll('body > div > nav > ul > li');

    menuItems.forEach((element, index, array) => {
        element.addEventListener('mouseover', () => {
            let elementId = element.getAttribute('id');

            let storedElement = elementsStore.find((storedElement) => {
                return storedElement.id == elementId;
            });
            
            let descriptionContainer = document.querySelector('div.menu-description > p');
            descriptionContainer.innerHTML = storedElement.description;
            descriptionContainer.setAttribute('class','active');
        });

        element.addEventListener('mouseout', () => {
            let descriptionContainer = document.querySelector('div.menu-description > p');
            descriptionContainer.innerHTML = '';
            descriptionContainer.removeAttribute('class');
        });
    });

});

class MenuItem{
    constructor(id, description){
        this.id = id;
        this.description = description;
    }
}

function createElementsStore() {
    let elements = [];

    elements.push(new MenuItem('loginCheck','Форма ввода логина и пароля с валидацией их значений и проверки на совпадение.'));
    elements.push(new MenuItem('menu','Меню с отмеченным активным пунктом меню.'));
    
    return elements;
}