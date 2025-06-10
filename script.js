// --- Intro Page Script ---
const introScreen = document.getElementById('intro-screen');
const hackerTextElement = document.getElementById('hacker-text');
const cursorElement = document.getElementById('cursor');

const introStatements = [
    "Scanning for vulnerabilities...",
];
let currentStatementIndex = 0;
let introCharIndex = 0; // Renamed to avoid conflict
const introTypingSpeed = 50; // milliseconds per character for intro
const introDelayBetweenStatements = 1500; // milliseconds

function typeIntroText() {
    if (currentStatementIndex < introStatements.length) {
        const currentStatement = introStatements[currentStatementIndex];
        if (introCharIndex < currentStatement.length) {
            hackerTextElement.textContent += currentStatement.charAt(introCharIndex);
            introCharIndex++;
            setTimeout(typeIntroText, introTypingSpeed);
        } else {
            // Statement finished, wait a bit then clear and move to next
            setTimeout(() => {
                introCharIndex = 0;
                hackerTextElement.textContent = '';
                currentStatementIndex++;
                if (currentStatementIndex < introStatements.length) {
                    typeIntroText();
                } else {
                    // All statements typed, now fade out intro screen
                    setTimeout(hideIntroScreen, 0); // Small delay before fade out
                }
            }, introDelayBetweenStatements);
        }
    }
}

function hideIntroScreen() {
    introScreen.classList.add('hidden');
    introScreen.addEventListener('transitionend', () => {
        introScreen.style.display = 'none';
        // Now that intro is gone, start the main page's typing effect
        typeMainHeading();
    }, { once: true }); // Use { once: true } to ensure listener runs only once
}


// --- Your Existing Website Scripts ---

// Main Page Heading Typing (Renamed from original typeWriter)
const mainHeadingText = "Hello, I'm Akhil K Wilson";
const typingEl = document.getElementById("typing");
let mainHeadingCharIndex = 0; // Renamed for clarity

function typeMainHeading() {
    if (mainHeadingCharIndex < mainHeadingText.length) {
        typingEl.textContent += mainHeadingText.charAt(mainHeadingCharIndex);
        // typeSound.play(); // Uncomment if audio is needed on each char
        mainHeadingCharIndex++;
        setTimeout(typeMainHeading, 50); // Original speed for main heading
    }
}

// Scroll to section
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ScrollSpy
const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        // Check if section is visible
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + section.offsetHeight) {
            current = section.id;
        }
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
        if (dot.dataset.target === current) {
            dot.classList.add("active");
        }
    });
});

// Dot click event
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        scrollToSection(dot.dataset.target);
    });
});

// Binary Matrix Background
const container = document.getElementById('binary-container');
// Only run this if the container exists (it might not be on the intro screen)
if (container) {
    // Calculate total digits based on visual need, not exact pixels if not necessary for performance
    const totalDigits = Math.floor(window.innerWidth / 10) * Math.floor(window.innerHeight / 14);

    for (let i = 0; i < totalDigits; i++) {
        const digit = document.createElement('span');
        digit.classList.add('binary-digit');
        digit.textContent = Math.round(Math.random());
        digit.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(digit);
    }
}


// Timeline Item Observer
const items = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally, unobserve after it becomes visible if you only want it to animate once
            // observer.unobserve(entry.target);
        } else {
            // Optional: Remove 'visible' if it goes out of view, to re-trigger on scroll back
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.1 });

items.forEach(item => observer.observe(item));

// Function to open resume (if you have one)
function openResume() {
    // Replace with your actual resume URL, e.g., 'assets/your_resume.pdf'
    window.open('path/to/your/resume.pdf', '_blank');
}

// Start the intro typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    typeIntroText();
});

// Function to open resume
function openResume() {
    window.open('assets/akhil_k_wilson_resume.pdf', '_blank');
}