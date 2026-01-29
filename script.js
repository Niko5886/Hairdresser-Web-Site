// AI Chat Assistant - Симулирана интелигентна система
const aiResponses = {
    greeting: [
        "Здравей! 👋 Как мога да ти помогна днес?",
        "Добре дошъл/дошла! 😊 Какво могу да направя за теб?"
    ],
    services: [
        "Предлагаме разнообразни услуги: подстригване, оцветяване, маски и ламиниране. Интересува ли те някоя конкретна услуга?",
        "Имаме пълен спектър от фризьорски услуги. Запитай за конкретна услуга и ще ти дам подробна информация!"
    ],
    booking: [
        "Можеш да запазиш час чрез нашия форуляр или да позвониш на +359 88 234 5678. Каква услуга искаш?",
        "Резервирай час лесно! Кажи ми кога ti e удобно и какво искаш да направиш."
    ],
    prices: [
        "Подстригване: От 25 лв. | Оцветяване: От 45 лв. | Маски: От 35 лв. | Перманентна вълна: От 55 лв.",
        "Имаме конкурентни цени и често предложения за верни клиенти!"
    ],
    location: [
        "Намираме се на ул. Красотата 42, София. Лесен достъп и паркинг!",
        "Адреса ни е ул. Красотата 42, София. До нас можеш да дойдеш лесно с всяко превозно средство."
    ],
    hours: [
        "Отворени сме: Пн-Пт 09:00-19:00 | Сб 10:00-18:00. Неделя - почивка.",
        "Работното ни време е Пн-Пт 09:00-19:00 и Сб 10:00-18:00."
    ],
    default: [
        "Интересен въпрос! 🤔 Можеш ли да бъдеш по-конкретен?",
        "Hmm, не съм сигурна как да отговоря. Позвони на +359 88 234 5678 за повече детайли!",
        "Отличен въпрос! Най-добре е да потърсиш в разделите на сайта или да се свържеш с нас директно."
    ]
};

// Функция за разпознаване на ключови думи
function detectKeywords(message) {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes("услуга") || lowerMsg.includes("какво") || lowerMsg.includes("правите")) {
        return "services";
    } else if (lowerMsg.includes("резервирай") || lowerMsg.includes("запази") || lowerMsg.includes("час") || lowerMsg.includes("време")) {
        return "booking";
    } else if (lowerMsg.includes("цена") || lowerMsg.includes("лв") || lowerMsg.includes("цени")) {
        return "prices";
    } else if (lowerMsg.includes("адрес") || lowerMsg.includes("където") || lowerMsg.includes("местонахождение")) {
        return "location";
    } else if (lowerMsg.includes("отворени") || lowerMsg.includes("работно") || lowerMsg.includes("време")) {
        return "hours";
    } else if (lowerMsg.includes("привет") || lowerMsg.includes("здравей") || lowerMsg.includes("hello")) {
        return "greeting";
    }
    
    return "default";
}

// Функция за вземане на отговор
function getAIResponse(keyword) {
    const responses = aiResponses[keyword];
    return responses[Math.floor(Math.random() * responses.length)];
}

// ===== COUNTER ANIMATION ФУНКЦИЯ =====
function animateCounter(element, target, duration, label, isDecimal = false) {
    if (!element) {
        console.error('Element не намерен за анимация');
        return;
    }
    
    const start = 0;
    const increment = target / (duration / 16); // 60fps = 16ms per frame
    let current = start;
    let animationId = null;

    const updateCounter = () => {
        current += increment;
        if (current >= target) {
            current = target;
            if (isDecimal) {
                element.textContent = target.toFixed(1) + label;
            } else {
                element.textContent = Math.floor(target) + label;
            }
            console.log('Анимация завършена:', target + label);
            return;
        }
        if (isDecimal) {
            element.textContent = current.toFixed(1) + label;
        } else {
            element.textContent = Math.floor(current) + label;
        }
        animationId = requestAnimationFrame(updateCounter);
    };

    animationId = requestAnimationFrame(updateCounter);
}

// Наблюдава статистиката при скролване
function setupStatsObserver() {
    console.log('Инициализира се Statistics Observer...');
    
    const statsElements = document.querySelectorAll('.stat');
    console.log('Намерени stat елементи:', statsElements.length);
    
    if (statsElements.length === 0) {
        console.error('Не са намерени stat елементи!');
        return;
    }
    
    const animatedStats = new Set();

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        console.log('Intersection Observer активиран, записи:', entries.length);
        entries.forEach(entry => {
            console.log('Entry:', entry.target, 'Видим:', entry.isIntersecting);
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const statId = statElement.getAttribute('data-stat-id');
                
                console.log('Статистика с ID:', statId, 'вече анимирана?', animatedStats.has(statId));
                
                // Проверяваме дали вече е анимирана
                if (!animatedStats.has(statId)) {
                    animatedStats.add(statId);
                    
                    const numberElement = statElement.querySelector('.stat-number');
                    console.log('Number element намерен:', numberElement);
                    
                    const target = parseFloat(statElement.getAttribute('data-target'));
                    const label = statElement.getAttribute('data-label') || '';
                    const duration = parseInt(statElement.getAttribute('data-duration')) || 2000;
                    const isDecimal = statElement.getAttribute('data-is-decimal') === 'true';
                    
                    console.log('Стартира анимация - Target:', target, 'Label:', label, 'Duration:', duration);
                    animateCounter(numberElement, target, duration, label, isDecimal);
                }
            }
        });
    }, observerOptions);

    statsElements.forEach((stat, index) => {
        stat.setAttribute('data-stat-id', index);
        console.log('Наблюдаване на stat:', index);
        observer.observe(stat);
    });
    
    console.log('Statistics Observer инициализиран успешно');
}

// DOM Elements
const aiChatToggle = document.getElementById("aiChatToggle");
const aiChatModal = document.getElementById("aiChatModal");
const closeModal = document.querySelector(".close-modal");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendChatBtn = document.getElementById("sendChatBtn");

// Event Listeners
aiChatToggle.addEventListener("click", () => {
    aiChatModal.style.display = aiChatModal.style.display === "block" ? "none" : "block";
    if (aiChatModal.style.display === "block") {
        chatInput.focus();
        if (chatMessages.children.length === 0) {
            addAIMessage("Здравей! 👋 Добре дошъл/дошла в GLOSS салона. Как мога да ти помогна?");
        }
    }
});

closeModal.addEventListener("click", () => {
    aiChatModal.style.display = "none";
});

sendChatBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// Функции за чат
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addUserMessage(message);
    chatInput.value = "";

    // Симулираме отговор с малка закъснение
    setTimeout(() => {
        const keyword = detectKeywords(message);
        const response = getAIResponse(keyword);
        addAIMessage(response);
    }, 600);
}

function addUserMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message user";
    messageDiv.innerHTML = `<div class="message-text">${escapeHtml(text)}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addAIMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message ai";
    messageDiv.innerHTML = `<div class="message-text">${escapeHtml(text)}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Функция за защита от XSS атаки
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Booking Button Handler
const bookingBtn = document.querySelector(".booking-btn");
if (bookingBtn) {
    bookingBtn.addEventListener("click", () => {
        window.location.href = "contact.html";
    });
}

// Smooth scroll for navigation links
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдавай всички service cards
document.querySelectorAll(".service-card, .gallery-item").forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Contact Form Handler
document.querySelector(".contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Благодаря! 😊 Ще се свържем с теб скоро!");
    e.target.reset();
});

// Mobile menu toggle (if needed for smaller screens)
const menuItems = document.querySelectorAll(".nav-menu a");
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        // Close mobile menu if it exists
        const navMenu = document.querySelector(".nav-menu");
        if (navMenu.style.display === "flex") {
            navMenu.style.display = "none";
        }
    });
});

// Инициализира статистиката при зареждане
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded изпълнен - инициализира се Observer');
    
    // Първо опит с Intersection Observer
    try {
        setupStatsObserver();
    } catch (e) {
        console.error('Грешка в Observer:', e);
    }
    
    // Fallback - стартира анимацията след 100ms от скрол или веднага
    window.addEventListener('scroll', triggerStatsAnimation, { once: true });
    
    // Или веднага ако вече са видими
    setTimeout(triggerStatsAnimation, 500);
    
    // Инициализира Scroll to Top функционалност
    setupScrollToTop();
});

let statsAnimationTriggered = false;

function triggerStatsAnimation() {
    if (statsAnimationTriggered) return;
    statsAnimationTriggered = true;
    
    console.log('Trigger Stats Animation активирана');
    
    const statsElements = document.querySelectorAll('.stat');
    console.log('Анимиране на', statsElements.length, 'елементи');
    
    statsElements.forEach((stat, index) => {
        const numberElement = stat.querySelector('.stat-number');
        if (numberElement) {
            const target = parseFloat(stat.getAttribute('data-target'));
            const label = stat.getAttribute('data-label') || '';
            const duration = parseInt(stat.getAttribute('data-duration')) || 2000;
            const isDecimal = stat.getAttribute('data-is-decimal') === 'true';
            
            console.log('Анимира елемент', index, '- target:', target, 'label:', label);
            animateCounter(numberElement, target, duration, label, isDecimal);
        }
    });
}

// ===== SCROLL TO TOP ФУНКЦИЯ =====
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (!scrollToTopBtn) {
        console.warn('Scroll to Top button не намерен');
        return;
    }

    // Показва/скрива бутона при скролване
    const toggleScrollButton = () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY > 150) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleScrollButton);
    toggleScrollButton(); // Първоначална проверка след зареждане

    // Scroll към вершината при клик
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// HAMBURGER MENU FUNCTIONALITY - инициализация след зареждане
function initHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');

    if (!hamburgerMenu || !mobileNav) {
        console.warn('Hamburger menu елементи не намерени.');
        return;
    }

    console.log('Hamburger menu инициализирано успешно!');

    const closeMenu = () => {
        hamburgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
    };

    const toggleMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked!');
        hamburgerMenu.classList.toggle('active');
        mobileNav.classList.toggle('active');
    };

    // Премахни стари listeners ако има
    hamburgerMenu.removeEventListener('click', toggleMenu);
    hamburgerMenu.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.hamburger-menu') && !e.target.closest('.mobile-nav')) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// Инициализирай веднага и на DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
} else {
    initHamburgerMenu();
}

console.log("✨ GLOSS Салон е готов! ✨");
