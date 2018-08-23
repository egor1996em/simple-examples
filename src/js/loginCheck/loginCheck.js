

document.addEventListener('DOMContentLoaded', () =>{
    document.querySelector('#login-button').onclick = (event) => {
        event.preventDefault();
        
        let login = document.querySelector('input[name = "login"]').value;

        let loginValidationMessage = document.querySelector('#login-message');

        let isValid = true;

        if(!isValidLogin(login)){
            isValid = false;
            showValidationError('Необходимо ввести логин', loginValidationMessage);
        } else {
            hideValidationError(loginValidationMessage);
        }

        let password = document.querySelector('input[name = "password"]').value;

        let passwordValidationMessage = document.querySelector('#password-message');

        if(!isValidPassword(password)){
            isValid = false;
            showValidationError('Необходимо указать пароль', passwordValidationMessage);
        } else {
            hideValidationError(passwordValidationMessage);
        }

        if(isValid == true){
            if(checkIdentificationData(login, password)){
                showModalForm('Добро пожаловать!');
            } else {
                showModalForm('Неверный логин или пароль!');
            }
        }
    };

    document.querySelector('#close-modal-form-btn').onclick = () => {
        closeModalForm();
    };
});

function isValidLogin(login) {
    if(login.length == 0 || login == null){
        return false;
    } else {
        return true;
    }
}

function isValidPassword(password){
    if(password.length == 0 || password == null){
        return false;
    } else {
        return true;
    }
}

function showValidationError(message, element){
    element.innerHTML = message;
    element.classList.add('shown');
}

function hideValidationError(element){
    if(element.classList.contains('shown')){
        element.classList.remove('shown');
        element.classList.add('hide');
        element.innerHTML = '';       
    }
}

function showModalForm(message) {
    let modalBackground = document.querySelector('#modal-background');

    modalBackground.classList.add('show-modal-background');

    setTimeout(() => {
        let modalForm = document.querySelector('#modal-complete-message');
        let modalFormText = document.querySelector('#modal-text');
        modalFormText.innerHTML = message;
        modalForm.classList.add('show-message');
    }, 500);
}

function closeModalForm() {
    let modalForm = document.querySelector('#modal-complete-message');

    let modalFormText = document.querySelector('#modal-text');

    modalForm.classList.remove('show-message');
    modalFormText.innerHTML = '';
    
    setTimeout(() => {
        let modalBackground = document.querySelector('#modal-background');
        modalBackground.classList.remove('show-modal-background')
    }, 200);
}

function checkIdentificationData(login, password){
    return login == 'Admin' && password == 'Admin' ? true : false;
}