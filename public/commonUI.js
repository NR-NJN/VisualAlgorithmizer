export function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

  


export function setupNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (!burger || !nav || !navLinks.length) return;

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

export function initTypewriter(selector, textToType) {
    const typingTextElement = document.querySelector(selector);
    if (!typingTextElement) return;

    let i = 0;
    function type() {
        if (i < textToType.length) {
            typingTextElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();  
}


export function initMatrixAnimation(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof canvas.getContext !== 'function') {  
        console.error(`Element with id "${canvasId}" is not a canvas or not found.`);
        return;
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const binary = '01';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0aefff';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < rainDrops.length; i++) {
            const char = binary.charAt(Math.floor(Math.random() * binary.length));
            ctx.fillText(char, i * fontSize, rainDrops[i] * fontSize);
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    setInterval(draw, 30);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
         
    });
}

export function setupFormHighlights() {
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const highlight = input.nextElementSibling;
            if (highlight && highlight.classList.contains('form-highlight')) {
                highlight.style.width = '100%';
                highlight.style.left = '0';
            }
        });
        input.addEventListener('blur', () => {
            const highlight = input.nextElementSibling;
            if (highlight && highlight.classList.contains('form-highlight')) {
                highlight.style.width = '0';
                highlight.style.left = '50%';
            }
        });
    });
}

export function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const nav = document.querySelector('.nav-links');  
            const burger = document.querySelector('.burger');  

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,  
                    behavior: 'smooth'
                });

                if (nav && nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    if (burger) burger.classList.remove('toggle');
                    const navLinks = document.querySelectorAll('.nav-links li');
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
}
