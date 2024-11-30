function startRecognition() {
    // Функция для запуска распознавания жестов
    alert("Recognition started!");
 }
 
 // Анимации для секций при загрузке страницы
 document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
 
    sections.forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
 
        setTimeout(() => {
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, Math.random() * 500); // случайная задержка для появления
    });
 });