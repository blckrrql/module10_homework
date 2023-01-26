const button = document.querySelector(".button");

button.addEventListener("click", () => {
    const width = window.screen.width;
    const height = window.screen.height;
    alert("Ширина экрана: " + width + " пикселей; " + "Высота экрана: " + height + " пикселей")
})