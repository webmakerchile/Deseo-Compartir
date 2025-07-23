// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const donationForm = document.getElementById('donationForm');
const amountButtons = document.querySelectorAll('.amount-btn');
const customAmountInput = document.getElementById('customAmount');
const modal = document.getElementById('successModal');
const closeModal = document.querySelector('.close');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Donation amount selection
amountButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all buttons
        amountButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Set the amount in the custom input
        const amount = button.getAttribute('data-amount');
        customAmountInput.value = amount;
    });
});

// Custom amount input handler
customAmountInput.addEventListener('input', () => {
    // Remove active class from all preset buttons when custom amount is entered
    if (customAmountInput.value) {
        amountButtons.forEach(btn => btn.classList.remove('active'));
    }
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        asunto: formData.get('asunto'),
        mensaje: formData.get('mensaje')
    };

    // Validate form
    if (!validateContactForm(data)) {
        return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        contactForm.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Show success modal
        showModal('¡Mensaje Enviado!', 'Gracias por contactarnos. Te responderemos pronto.');

        // In a real application, you would send the data to your server
        console.log('Contact form data:', data);
    }, 2000);
});

// Donation form submission
donationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(donationForm);
    const data = {
        amount: formData.get('amount'),
        frequency: formData.get('frequency'),
        donorName: formData.get('donorName'),
        donorEmail: formData.get('donorEmail'),
        donorPhone: formData.get('donorPhone')
    };

    // Validate form
    if (!validateDonationForm(data)) {
        return;
    }

    // Show loading state
    const submitBtn = donationForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Procesando...';
    submitBtn.disabled = true;

    // Simulate payment processing (replace with actual payment gateway)
    setTimeout(() => {
        // Reset form
        donationForm.reset();
        amountButtons.forEach(btn => btn.classList.remove('active'));

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Show success modal
        showModal(
            '¡Donación Exitosa!',
            `Gracias ${data.donorName} por tu generosa donación de $${data.amount}. Recibirás un recibo por email.`
        );

        // In a real application, you would process the payment
        console.log('Donation data:', data);
    }, 3000);
});

// Form validation functions
function validateContactForm(data) {
    const errors = [];

    if (!data.nombre.trim()) {
        errors.push('El nombre es requerido');
    }

    if (!data.email.trim()) {
        errors.push('El email es requerido');
    } else if (!isValidEmail(data.email)) {
        errors.push('El email no es válido');
    }

    if (!data.asunto.trim()) {
        errors.push('El asunto es requerido');
    }

    if (!data.mensaje.trim()) {
        errors.push('El mensaje es requerido');
    }

    if (errors.length > 0) {
        alert('Por favor corrige los siguientes errores:\n' + errors.join('\n'));
        return false;
    }

    return true;
}

function validateDonationForm(data) {
    const errors = [];

    if (!data.amount || data.amount <= 0) {
        errors.push('Selecciona un monto válido');
    }

    if (!data.frequency) {
        errors.push('Selecciona la frecuencia de donación');
    }

    if (!data.donorName.trim()) {
        errors.push('El nombre es requerido');
    }

    if (!data.donorEmail.trim()) {
        errors.push('El email es requerido');
    } else if (!isValidEmail(data.donorEmail)) {
        errors.push('El email no es válido');
    }

    if (errors.length > 0) {
        alert('Por favor corrige los siguientes errores:\n' + errors.join('\n'));
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Modal functions
function showModal(title, message) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    modal.style.display = 'block';
}

function hideModal() {
    modal.style.display = 'none';
}

// Modal event listeners
closeModal.addEventListener('click', hideModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.program-card, .about-content, .contact-content');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Format the number based on original content
            const originalText = counter.textContent;
            if (originalText.includes('+')) {
                counter.textContent = Math.floor(current) + '+';
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const handleScroll = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Form field focus effects
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('input, textarea, select');

    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        hideModal();
    }

    // Toggle mobile menu with Enter key on hamburger
    if (e.key === 'Enter' && e.target === hamburger) {
        hamburger.click();
    }
});

// Print styles and functionality
function printPage() {
    window.print();
}

// Add print button functionality if needed
document.addEventListener('DOMContentLoaded', () => {
    const printButtons = document.querySelectorAll('.print-btn');
    printButtons.forEach(btn => {
        btn.addEventListener('click', printPage);
    });
});

console.log('Fundación Esperanza - Website loaded successfully!');