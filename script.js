window.onload = function() {

    const textElement = document.getElementById("typing");
    const text = "Welcome to Newcastle Racing!";
    const typingSpeed = 100; // milliseconds
    let index = 0;

    function typeText() {
        if (index < text.length) {
            textElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeText, typingSpeed);
        }
    }
    typeText();

    const fadeInElement = document.querySelector('.fade-in-text');
    fadeInElement.classList.add('fade-in');
};