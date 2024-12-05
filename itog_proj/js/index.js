document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded");
  
    // Инициализация команды
    const teamContainer = document.querySelector("#team .row");
    const teamMembers = [
      {
        name: "John Doe",
        role: "Backend Developer",
        img: "pictures/team/backend_dev.jpg",
      },
      {
        name: "Jane Smith",
        role: "AI Specialist",
        img: "pictures/team/ai_specialist.jpg",
      },
      {
        name: "Mark Lee",
        role: "Frontend Developer",
        img: "pictures/team/frontend_dev.jpg",
      },
      {
        name: "Sarah Connor",
        role: "UI/UX Designer",
        img: "pictures/team/uiux_designer.jpg",
      },
    ];
  
    teamContainer.innerHTML = teamMembers
      .map(
        (member) => `
          <div class="col-md-3">
            <div class="card p-3 text-center">
             <img src="${member.img}" alt="${member.name}" class="img-fluid rounded-circle mb-3" style="width: 100px; height: 100px; object-fit: cover;">
              <h5>${member.name}</h5>
              <p>${member.role}</p>
            </div>
          </div>`
      )
      .join("");
  
// Переключение форм
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const modalTitle = document.getElementById("modalTitle");
const toggleAuthBtn = document.getElementById("toggleAuth");

// Установка начального состояния форм
const toggleForm = (isLogin) => {
  loginForm.style.display = isLogin ? "block" : "none";
  registerForm.style.display = isLogin ? "none" : "block";
  modalTitle.textContent = isLogin ? "Login" : "Register";
  toggleAuthBtn.textContent = isLogin
    ? "Don't have an account? Register"
    : "Already have an account? Login";
};

toggleForm(true);

// Слушатель на кнопку переключения
toggleAuthBtn.addEventListener("click", () => {
  toggleForm(loginForm.style.display === "none");
});
});