// Подгружаем GSAP и SplitType
const scriptGSAP = document.createElement('script');
scriptGSAP.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.min.js";
document.head.appendChild(scriptGSAP);

const scriptSplit = document.createElement('script');
scriptSplit.src = "https://unpkg.com/split-type";
document.head.appendChild(scriptSplit);

window.onload = () => {
    lucide.createIcons();

    // 1. АНИМАЦИЯ ГЕРОЯ (GSAP + SplitType)
    setTimeout(() => {
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
    }, 500);

    // 2. МОБИЛЬНОЕ МЕНЮ
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    const mobileNav = document.getElementById('mobile-nav');

    menuOpen.onclick = () => mobileNav.classList.add('active');
    menuClose.onclick = () => mobileNav.classList.remove('active');
    document.querySelectorAll('.mobile-nav__list a').forEach(link => {
        link.onclick = () => mobileNav.classList.remove('active');
    });

    // 3. КАПЧА И ВАЛИДАЦИЯ ФОРМЫ
    const form = document.getElementById('main-form');
    const phoneInput = document.getElementById('phone-input');
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('captcha-input');

    // Генерируем случайный пример
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const correctAnswer = num1 + num2;
    captchaLabel.innerText = `Решите пример: ${num1} + ${num2} = ?`;

    // Валидация телефона (только цифры)
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d+]/g, '');
    });

    form.onsubmit = (e) => {
        e.preventDefault();

        if (parseInt(captchaInput.value) !== correctAnswer) {
            alert('Ошибка в капче! Попробуйте снова.');
            return;
        }

        // Имитация AJAX
        const btn = form.querySelector('button');
        btn.innerText = 'Отправка...';
        btn.disabled = true;

        setTimeout(() => {
            form.reset();
            btn.style.display = 'none';
            document.getElementById('form-success').style.display = 'block';
        }, 1500);
    };

    // 4. COOKIE POPUP
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => cookiePopup.classList.add('active'), 2000);
    }

    cookieAccept.onclick = () => {
        localStorage.setItem('cookies-accepted', 'true');
        cookiePopup.classList.remove('active');
    };
};