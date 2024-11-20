// // app.js
// document.addEventListener('DOMContentLoaded', function () {
//     // Находим элементы пароля и иконки глазика
//     const passwordInput = document.getElementById('password');
//     const togglePassword = document.getElementById('togglePassword');

//     // Добавляем обработчик события клика на иконку глазика
//     togglePassword.addEventListener('click', function () {
//         // Проверяем текущее состояние поля ввода пароля
//         const currentType = passwordInput.getAttribute('type');

//         // Если поле ввода скрывает пароль, показываем его
//         if (currentType === 'password') {
//             passwordInput.setAttribute('type', 'text'); // Меняем тип на текст
//             togglePassword.src = 'icons/eye.svg'; // Меняем на иконку открытого глаза
//         } else {
//             // Если пароль уже виден, скрываем его
//             passwordInput.setAttribute('type', 'password'); // Меняем тип на пароль
//             togglePassword.src = 'icons/eye-closed.svg'; // Меняем на иконку закрытого глаза
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    // Находим элементы пароля и иконки глазика
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const emailInput = document.getElementById('email');
    const registerButton = document.getElementById('registerButton');
    
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    togglePassword.addEventListener('click', function () {
        togglePasswordVisibility(passwordInput, togglePassword);
    });

    toggleConfirmPassword.addEventListener('click', function () {
        togglePasswordVisibility(confirmPasswordInput, toggleConfirmPassword);
    });

    registerButton.addEventListener('click', function () {
        // Сбросить сообщения об ошибках
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        let isValid = true;

        // Валидация email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Введите корректный email';
            isValid = false;
        }

        // Валидация пароля
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Пароль должен содержать не менее 8 символов';
            isValid = false;
        }

        // Валидация подтверждения пароля
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Пароли не совпадают';
            isValid = false;
        }

        // Если все проверки пройдены
        if (isValid) {
            // Здесь можно добавить логику для отправки формы или регистрации
            alert('Регистрация успешна!'); // Временное сообщение
        }
    });

    function togglePasswordVisibility(input, toggle) {
        const currentType = input.getAttribute('type');
        if (currentType === 'password') {
            input.setAttribute('type', 'text');
            toggle.src = 'assets/icons/eye.svg';
        } else {
            input.setAttribute('type', 'password');
            toggle.src = 'assets/icons/eye-closed.svg';
        }
    }
});
