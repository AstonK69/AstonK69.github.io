window.onload = function () {

    const textElement = document.getElementById("typing");
    const text = "Welcome to Newcastle Racing!";
    const typingSpeed = 65; // milliseconds
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

let mybutton = document.getElementById("scrolltopbutton");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}