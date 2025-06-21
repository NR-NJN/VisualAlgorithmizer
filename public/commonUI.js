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


export function initWaveAnimation(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas with id "${canvasId}" not found.`);
        return;
    }
    const ctx = canvas.getContext('2d');

    
    const getCssVar = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

    let waves = [];
    let tick = 0;

    
    const waveConfig = [
        {
            amplitude: 50,
            frequency: 0.01, 
            color: getCssVar('--primary-color'),
            speed: 0.02, 
            lineWidth: 2,
        },
        {
            amplitude: 30,
            frequency: 0.02,
            color: getCssVar('--secondary-color'),
            speed: 0.03,
            lineWidth: 1.5,
        },
        {
            amplitude: 70,
            frequency: 0.005,
            color: 'rgba(240, 240, 240, 0.5)', 
            speed: 0.01,
            lineWidth: 1,
        }
    ];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        waveConfig.forEach(wave => {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.strokeStyle = wave.color;
            ctx.lineWidth = wave.lineWidth;

            for (let x = 0; x < canvas.width; x++) {
                
                const y = Math.sin(x * wave.frequency + tick * wave.speed) * wave.amplitude + canvas.height / 2;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        });

        tick++;
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resizeCanvas);
    
    
    resizeCanvas();
    draw();
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
