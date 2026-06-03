// ============================================
// GLOSS Салон — основен скрипт
// ============================================

// AI Chat Assistant — симулирана интелигентна система
const aiResponses = {
    greeting: [
        "Здравей! 👋 Как мога да ти помогна днес?",
        "Добре дошъл/дошла! 😊 Какво мога да направя за теб?"
    ],
    services: [
        "Предлагаме разнообразни услуги: подстригване, оцветяване, маски и ламиниране. Интересува ли те конкретна услуга?",
        "Имаме пълен спектър от фризьорски услуги. Попитай за конкретна услуга и ще ти дам подробна информация!"
    ],
    booking: [
        "Можеш да запазиш час чрез нашата форма или да се обадиш на +359 88 234 5678. Каква услуга желаеш?",
        "Резервирай час лесно! Кажи ми кога ти е удобно и какво искаш да направиш."
    ],
    prices: [
        "Подстригване: от 25 лв. | Оцветяване: от 45 лв. | Маски: от 35 лв. | Перманентна вълна: от 55 лв.",
        "Имаме конкурентни цени и често предложения за лоялни клиенти!"
    ],
    location: [
        "Намираме се на ул. Красотата 42, София. Лесен достъп и паркинг!",
        "Адресът ни е ул. Красотата 42, София. До нас се стига лесно с всякакъв транспорт."
    ],
    hours: [
        "Отворени сме: Пн–Пт 09:00–19:00 | Сб 10:00–18:00. Неделя — почивен ден.",
        "Работното ни време е Пн–Пт 09:00–19:00 и Сб 10:00–18:00."
    ],
    default: [
        "Интересен въпрос! 🤔 Можеш ли да бъдеш по-конкретен/на?",
        "Не съм сигурна как да отговоря. Обади се на +359 88 234 5678 за повече детайли!",
        "Чудесен въпрос! Най-добре потърси в разделите на сайта или се свържи с нас директно."
    ]
};

// Разпознаване на ключови думи
function detectKeywords(message) {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("услуга") || lowerMsg.includes("какво") || lowerMsg.includes("правите")) {
        return "services";
    } else if (lowerMsg.includes("резервирай") || lowerMsg.includes("запази") || lowerMsg.includes("час")) {
        return "booking";
    } else if (lowerMsg.includes("цена") || lowerMsg.includes("лв") || lowerMsg.includes("цени")) {
        return "prices";
    } else if (lowerMsg.includes("адрес") || lowerMsg.includes("къде") || lowerMsg.includes("местоположение")) {
        return "location";
    } else if (lowerMsg.includes("отворен") || lowerMsg.includes("работно") || lowerMsg.includes("време")) {
        return "hours";
    } else if (lowerMsg.includes("привет") || lowerMsg.includes("здравей") || lowerMsg.includes("hello")) {
        return "greeting";
    }

    return "default";
}

function getAIResponse(keyword) {
    const responses = aiResponses[keyword];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Защита от XSS при вмъкване на текст
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

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration, label, isDecimal = false) {
    if (!element) return;

    const increment = target / (duration / 16); // ~60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current >= target) {
            element.textContent = (isDecimal ? target.toFixed(1) : Math.floor(target)) + label;
            return;
        }
        element.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + label;
        requestAnimationFrame(updateCounter);
    };

    requestAnimationFrame(updateCounter);
}

const animatedStats = new Set();

function animateStat(statElement) {
    const statId = statElement.getAttribute('data-stat-id');
    if (animatedStats.has(statId)) return;
    animatedStats.add(statId);

    const numberElement = statElement.querySelector('.stat-number');
    const target = parseFloat(statElement.getAttribute('data-target'));
    const label = statElement.getAttribute('data-label') || '';
    const duration = parseInt(statElement.getAttribute('data-duration'), 10) || 2000;
    const isDecimal = statElement.getAttribute('data-is-decimal') === 'true';

    animateCounter(numberElement, target, duration, label, isDecimal);
}

function setupStatsObserver() {
    const statsElements = document.querySelectorAll('.stat');
    if (statsElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

    statsElements.forEach((stat, index) => {
        stat.setAttribute('data-stat-id', index);
        observer.observe(stat);
    });
}

// ===== SCROLL TO TOP =====
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (!scrollToTopBtn) return;

    const toggleScrollButton = () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        scrollToTopBtn.classList.toggle('show', scrollY > 150);
    };

    window.addEventListener('scroll', toggleScrollButton);
    toggleScrollButton();

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== AI CHAT =====
function setupAIChat() {
    const aiChatToggle = document.getElementById("aiChatToggle");
    const aiChatModal = document.getElementById("aiChatModal");
    const closeModal = document.querySelector(".close-modal");
    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const sendChatBtn = document.getElementById("sendChatBtn");

    if (!aiChatToggle || !aiChatModal || !chatMessages || !chatInput || !sendChatBtn) return;

    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.innerHTML = `<div class="message-text">${escapeHtml(text)}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage(message, "user");
        chatInput.value = "";

        setTimeout(() => {
            addMessage(getAIResponse(detectKeywords(message)), "ai");
        }, 600);
    }

    aiChatToggle.addEventListener("click", () => {
        const isOpen = aiChatModal.style.display === "block";
        aiChatModal.style.display = isOpen ? "none" : "block";
        if (!isOpen) {
            chatInput.focus();
            if (chatMessages.children.length === 0) {
                addMessage("Здравей! 👋 Добре дошъл/дошла в салон GLOSS. Как мога да ти помогна?", "ai");
            }
        }
    });

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            aiChatModal.style.display = "none";
        });
    }

    sendChatBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
}

// ===== BOOKING BUTTON =====
function setupBookingButton() {
    const bookingBtn = document.querySelector(".booking-btn");
    if (!bookingBtn) return;
    bookingBtn.addEventListener("click", () => {
        window.location.href = "contact.html";
    });
}

// ===== CONTACT FORM =====
function setupContactForm() {
    const contactForm = document.querySelector(".contact-form");
    if (!contactForm) return;
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Благодаря! 😊 Ще се свържем с теб скоро!");
        contactForm.reset();
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
function setupScrollReveal() {
    const revealItems = document.querySelectorAll(".service-card, .gallery-item, .service-card-full, .team-member");
    if (revealItems.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealItems.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== HAMBURGER MENU =====
function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburgerBtn || !mobileMenu) return;

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        mobileMenu.classList.add('active');
        hamburgerBtn.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
    };

    hamburgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMenu.classList.contains('active') ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('active')) return;
        if (hamburgerBtn.contains(e.target) || mobileMenu.contains(e.target)) return;
        closeMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    setupStatsObserver();
    setupScrollToTop();
    setupAIChat();
    setupBookingButton();
    setupContactForm();
    setupScrollReveal();
    setupHamburgerMenu();

    // Fallback за статистиката, ако IntersectionObserver не се задейства
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.stat').forEach(animateStat);
    }, { once: true });
    setTimeout(() => {
        document.querySelectorAll('.stat').forEach(animateStat);
    }, 1200);

    // Smooth scroll за вътрешни котви
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href === "#") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
