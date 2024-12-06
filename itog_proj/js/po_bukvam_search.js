//этот файлик не вызывается, это недоделаный поиск, он как ctrl F, если тот скажут не то, этот возьмем
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
                findMatchesInElement(element, query);
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

function findMatchesInElement(element, query) {
    // Создаем регулярное выражение для поиска точных совпадений (с флагом g)
    const regex = new RegExp(query, 'gi'); // флаг 'g' для глобального поиска, 'i' для игнорирования регистра
    // Найдем все текстовые узлы в элементе
    const textNodes = getTextNodes(element);
    textNodes.forEach(node => {
        let match;
        while ((match = regex.exec(node.textContent)) !== null) {
            // Если нашли совпадение, добавляем его в массив matches
            const matchObj = {
                node,
                matchIndex: match.index,
                length: match[0].length,
                element
            };
            matches.push(matchObj);
        }
    });
}

// Функция для получения всех текстовых узлов в элементе
function getTextNodes(element) {
    const nodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let currentNode;
    while (currentNode = walker.nextNode()) {
        nodes.push(currentNode);
    }
    return nodes;
}

// Функция для сброса всех выделений
function resetHighlight() {
    // Сбрасываем фоновый цвет и цвет текста для всех элементов на странице
    const allElements = document.body.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
        allElements[i].style.backgroundColor = '';
        allElements[i].style.color = '';
    }
    // Убираем выделение текста
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
}

// Функция для выделения найденного текста
function highlightText(match) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(match.node, match.matchIndex);
    range.setEnd(match.node, match.matchIndex + match.length);
    selection.removeAllRanges();
    selection.addRange(range);

    // Выделяем только найденный текст
    const span = document.createElement('span');
    span.style.backgroundColor = 'yellow';
    span.style.color = 'black';
    span.appendChild(range.extractContents());
    range.insertNode(span);
}

// Функция для перехода к следующему совпадению
function goToNextMatch() {
    if (matches.length > 0) {
        // Сбрасываем выделение предыдущего элемента, если оно было
        resetHighlight();

        // Переход к текущему совпадению
        const currentMatch = matches[currentMatchIndex];
        highlightText(currentMatch); // Выделяем только текст

        // Прокручиваем страницу к текущему совпадению
        currentMatch.node.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Обновляем индекс для следующего совпадения
        currentMatchIndex = (currentMatchIndex + 1) % matches.length; // После последнего элемента возвращаемся к первому
    }
}
