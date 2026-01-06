// Load GSAP and SplitType dynamically
const scriptGSAP = document.createElement('script');
scriptGSAP.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
document.head.appendChild(scriptGSAP);

const scriptSplit = document.createElement('script');
scriptSplit.src = "https://unpkg.com/split-type";
document.head.appendChild(scriptSplit);

window.onload = () => {
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 1. HERO ANIMATION (GSAP + SplitType)
    setTimeout(() => {
        if (document.querySelector('.hero__title')) {
            const typeSplit = new SplitType('.hero__title', { types: 'words, chars' });
            gsap.from(typeSplit.chars, {
                opacity: 0,
                y: 50,
                rotate: 10,
                duration: 0.8,
                stagger: 0.05,
                ease: "back.out(1.7)"
            });

            gsap.from('.hero__text', { opacity: 0, x: -30, duration: 1, delay: 0.5 });
            gsap.from('.hero__card', { opacity: 0, scale: 0.8, rotate: -10, duration: 1, delay: 0.8 });
        }
    }, 500);

    // 2. MOBILE MENU
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuOpen && menuClose && mobileNav) {
        menuOpen.onclick = () => mobileNav.classList.add('active');
        menuClose.onclick = () => mobileNav.classList.remove('active');
        document.querySelectorAll('.mobile-nav__list a').forEach(link => {
            link.onclick = () => mobileNav.classList.remove('active');
        });
    }

    // 3. CAPTCHA AND FORM VALIDATION
    const form = document.getElementById('main-form');
    const phoneInput = document.getElementById('phone-input');
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('captcha-input');

    if (form && captchaLabel) {
        // Generate random math challenge
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const correctAnswer = num1 + num2;
        captchaLabel.innerText = `Solve this: ${num1} + ${num2} = ?`;

        // Phone validation (digits only)
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d+]/g, '');
        });

        form.onsubmit = (e) => {
            e.preventDefault();

            // Captcha check
            if (parseInt(captchaInput.value) !== correctAnswer) {
                alert('Captcha error! Please try again.');
                return;
            }

            // Simulate AJAX request
            const btn = form.querySelector('button');
            const originalBtnText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                form.reset();
                btn.style.display = 'none';
                const successMsg = document.getElementById('form-success');
                if (successMsg) successMsg.style.display = 'block';
            }, 1500);
        };
    }

    // 4. COOKIE POPUP
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup && !localStorage.getItem('cookies-accepted')) {
        setTimeout(() => cookiePopup.classList.add('active'), 2000);
    }

    if (cookieAccept) {
        cookieAccept.onclick = () => {
            localStorage.setItem('cookies-accepted', 'true');
            cookiePopup.classList.remove('active');
        };
    }
};