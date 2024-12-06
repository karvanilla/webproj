let currentMatchIndex = 0; // Индекс текущего совпадения
let matches = []; // Массив для хранения всех найденных совпадений

// Добавляем обработчик для события нажатия клавиши в поле ввода
document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (matches.length > 0) {
            // Если есть уже найденные совпадения, переходим к следующему
            goToNextMatch();
        } else {
            // Если совпадений нет, запускаем новый поиск
            performSearch();
        }
    }
});

function performSearch() {
    const query = document.getElementById('search-input').value.trim().toLowerCase(); // получаем поисковый запрос
    if (query !== '') {
        // Получаем все текстовые элементы на странице
        const elements = document.body.getElementsByTagName('*');
        matches = []; // Обнуляем массив совпадений
        currentMatchIndex = 0; // Сбрасываем индекс текущего совпадения
        resetHighlight(); // Сбрасываем все выделения

        // Проходим по всем элементам страницы
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element.children.length === 0 && element.textContent.trim().toLowerCase().includes(query)) {
                // Если элемент содержит текст и в нем есть совпадение с запросом
                matches.push(element); // Добавляем элемент в массив совпадений
            }
        }

        if (matches.length > 0) {
            // Переход к следующему совпадению, если оно есть
            goToNextMatch();
        } else {
            alert('No matches found.');
        }
    } else {
        alert('Please enter a search term.');
    }
}

// Функция для сброса всех выделений
function resetHighlight() {
    // Сбрасываем фоновый цвет и цвет текста для всех элементов на странице
    const allElements = document.body.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
        allElements[i].style.backgroundColor = '';
        allElements[i].style.color = '';
    }
}

// Функция для перехода к следующему совпадению
function goToNextMatch() {
    if (matches.length > 0) {
        // Сбрасываем выделение предыдущего элемента, если оно было
        resetHighlight();

        // Переход к текущему совпадению
        const currentMatch = matches[currentMatchIndex];
        currentMatch.style.backgroundColor = 'blue'; // Выделяем текущий элемент синим цветом
        currentMatch.style.color = 'white';

        // Прокручиваем страницу к текущему совпадению
        currentMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Обновляем индекс для следующего совпадения
        currentMatchIndex = (currentMatchIndex + 1) % matches.length; // После последнего элемента возвращаемся к первому
    }
}
