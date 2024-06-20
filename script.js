// Функция для отображения/скрытия выпадающего списка
function toggleDropdown() {
    var dropdown = document.getElementById("cityDropdown");
    dropdown.classList.toggle("show");
}

// Функция для фильтрации городов в выпадающем списке
function filterCities() {
    var input, filter, a, i;
    input = document.getElementById("citySearch");
    filter = input.value.toUpperCase();
    var dropdown = document.getElementById("cityDropdown");
    a = dropdown.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        var txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

// Функция для выбора города
function selectCity(city) {
    document.getElementById("cityButton").innerText = city;
    toggleDropdown(); // Скрыть выпадающий список после выбора города
}

// Закрыть выпадающий список при клике вне него
window.onclick = function(event) {
    if (!event.target.matches('#cityButton')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

document.querySelectorAll('.view-task-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('taskModal').style.display = 'block';
        currentTask = event.target.id; // Запоминаем текущую задачу

        // Меняем текст и стиль кнопки "Задание выполняется"
        const taskButton = event.target;
        taskButton.innerText = 'Задание выполняется';
        taskButton.style.backgroundColor = 'orange';
        taskButton.style.color = '#ffffff'; // Белый цвет текста
        taskButton.disabled = true;
    });
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('taskModal').style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == document.getElementById('taskModal')) {
        document.getElementById('taskModal').style.display = 'none';
    }
    if (event.target == document.getElementById('thankYouModal')) {
        document.getElementById('thankYouModal').style.display = 'none';
    }
    if (event.target == document.getElementById('congratulationsModal')) {
        document.getElementById('congratulationsModal').style.display = 'none';
    }
};

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('taskModal').style.display = 'none';
    document.getElementById('thankYouModal').style.display = 'block';

    // Загружаем файл
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
    if (file) {
        console.log('Загруженный файл:', file.name);
    }
});

document.getElementById('continueButton').addEventListener('click', function() {
    document.getElementById('thankYouModal').style.display = 'none';
    markTaskAsCompleted(currentTask);
});

let currentTask = '';
let completedTasks = 0;

function markTaskAsCompleted(taskId) {
    const taskButton = document.getElementById(taskId);
    taskButton.innerText = 'Задание выполнено';
    taskButton.style.backgroundColor = 'green';
    taskButton.style.color = '#ffffff'; // Белый цвет текста
    taskButton.disabled = true;

    const taskItem = taskButton.closest('.timeline-item');
    taskItem.classList.add('completed');
    taskItem.querySelector('.marker').classList.add('checked');

    completedTasks++;

    if (completedTasks === 5) {
        document.getElementById('congratulationsModal').style.display = 'block';
    }
}

document.getElementById('finalTestButton').addEventListener('click', function() {
    window.location.href = 'final-test.html';
});

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('taskModal');
    var closeModal = document.getElementsByClassName('close')[0];
    var continueButton = document.getElementById('continueButton');
    var taskButtons = document.querySelectorAll('.view-task-button');
    var completedTasks = 0;
    var taskModalOpen = false;

    taskButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            modal.style.display = 'block';
            taskModalOpen = true;
        });
    });

    closeModal.onclick = function() {
        modal.style.display = 'none';
        if (taskModalOpen) {
            completedTasks++;
            taskModalOpen = false;
            updateTaskStatus();
        }
    };

    continueButton.onclick = function() {
        document.getElementById('thankYouModal').style.display = 'none';
    };

    function updateTaskStatus() {
        if (completedTasks === taskButtons.length) {
            document.getElementById('congratulationsModal').style.display = 'block';
        }
    }

    document.getElementById('finalTestButton').addEventListener('click', function() {
        window.location.href = 'final-test.html';
    });

    document.getElementById('openRegistration').addEventListener('click', function() {
        document.getElementById('registrationModal').style.display = 'block';
    });

    document.querySelector('.close-registration').addEventListener('click', function() {
        document.getElementById('registrationModal').style.display = 'none';
    });

    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Регистрация завершена');
        document.getElementById('registrationModal').style.display = 'none';
    });

    // Функции для фильтрации вакансий по городам
    var cityButton = document.getElementById('cityButton');
    var cityDropdown = document.getElementById('cityDropdown');
    var vacancies = document.querySelectorAll('.vacancy');

    function toggleDropdown() {
        cityDropdown.classList.toggle('show');
    }

    function selectCity(city, event) {
        event.preventDefault();
        cityButton.innerHTML = city + ' <span>&#9660;</span>';
        filterVacancies(city);
        toggleDropdown();
    }

    function filterVacancies(city) {
        vacancies.forEach(function(vacancy) {
            if (vacancy.getAttribute('data-city') === city) {
                vacancy.style.display = 'block';
            } else {
                vacancy.style.display = 'none';
            }
        });
    }

    window.onclick = function(event) {
        if (!event.target.matches('#cityButton')) {
            var dropdowns = document.getElementsByClassName('dropdown-content');
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };
});


// script.js
document.addEventListener("DOMContentLoaded", function() {
    var registrationModal = document.getElementById("registrationModal");
    var openRegistrationBtn = document.getElementById("openRegistration");
    var closeRegistrationBtn = document.getElementsByClassName("close-registration")[0];

    openRegistrationBtn.onclick = function() {
        registrationModal.style.display = "block";
    }

    closeRegistrationBtn.onclick = function() {
        registrationModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == registrationModal) {
            registrationModal.style.display = "none";
        }
    }
});

function toggleDropdown() {
    document.getElementById("cityDropdown").classList.toggle("show");
}

function selectCity(city, event) {
    event.preventDefault();
    document.getElementById("cityButton").innerText = city;
    filterVacancies(city);
}

function filterVacancies() {
    var city = document.getElementById("citySelect").value;
    var vacancies = document.getElementsByClassName("vacancy");

    for (var i = 0; i < vacancies.length; i++) {
        if (city === "all" || vacancies[i].getAttribute("data-city") === city) {
            vacancies[i].style.display = "block";
        } else {
            vacancies[i].style.display = "none";
        }
    }
}
