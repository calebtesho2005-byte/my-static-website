const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const formFeedback = document.getElementById("formFeedback");
    const messagePreview = document.getElementById("messagePreview");

    function validateFormValues(name, email, message) {
        if (name.trim() === "") {
            return "Please enter your name.";
        }

        if (email.trim() === "") {
            return "Please enter your email address.";
        }

        if (message.trim() === "") {
            return "Please enter a message.";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.trim())) {
            return "Please enter a valid email address.";
        }

        return "";
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;

        formFeedback.textContent = "";
        messagePreview.hidden = true;

        const validationError = validateFormValues(name, email, message);

        if (validationError) {
            formFeedback.textContent = validationError;
            return;
        }

        document.getElementById("previewName").textContent = "Name: " + name.trim();
        document.getElementById("previewEmail").textContent = "Email: " + email.trim();
        document.getElementById("previewMessage").textContent = "Message: " + message.trim();

        messagePreview.hidden = false;
        formFeedback.textContent = "Your data was validated successfully. Browser demonstration only — no message is sent.";
    });
}

const galleryImage = document.getElementById("galleryImage");
const galleryCaption = document.getElementById("galleryCaption");
const previousPhoto = document.getElementById("previousPhoto");
const nextPhoto = document.getElementById("nextPhoto");
const galleryCounter = document.getElementById("galleryCounter");

const photos = [
    {
        src: "image/WhatsApp Image 2026-09-28 at 00.06.20.jpeg",
        caption: "Photo 1: Outdoor scenery from my personal archive.",
        alt: "A scenic outdoor image showing natural greenery and a calm landscape from my personal archive."
    },
    {
        src: "image/WhatsApp Image 2026-09-28 at 00.51.34.jpeg",
        caption: "Photo 2: A campus-style view with green tones and a peaceful walk path.",
        alt: "A campus-style landscape photo with a green pathway and soothing natural colors."
    },
    {
        src: "image/IMG-20260107-WA0120.jpg",
        caption: "Photo 3: A scenic campus image. My favorite study-life landscape.",
        alt: "A scenic campus scene with trees and a calm outdoor background."
    }
];

let currentPhoto = 0;

// Display the selected image and update the caption while keeping the first and last buttons in the correct state.
function showPhoto(index) {
    if (!galleryImage || !galleryCaption || !galleryCounter || !previousPhoto || !nextPhoto) {
        return;
    }

    currentPhoto = index;
    galleryImage.src = photos[currentPhoto].src;
    galleryImage.alt = photos[currentPhoto].alt;
    galleryCaption.textContent = photos[currentPhoto].caption;
    galleryCounter.textContent = "Photo " + (currentPhoto + 1) + " of " + photos.length;

    previousPhoto.disabled = currentPhoto === 0;
    nextPhoto.disabled = currentPhoto === photos.length - 1;
}

if (previousPhoto && nextPhoto && galleryImage && galleryCaption && galleryCounter) {
    previousPhoto.addEventListener("click", function () {
        if (currentPhoto > 0) {
            showPhoto(currentPhoto - 1);
        }
    });

    nextPhoto.addEventListener("click", function () {
        if (currentPhoto < photos.length - 1) {
            showPhoto(currentPhoto + 1);
        }
    });

    showPhoto(0);
}

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");

// Toggle the mobile menu and switch the website between light and dark appearances.
if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.textContent = isOpen ? "Close" : "Menu";
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.textContent = "Menu";
        });
    });
}

if (themeToggle) {
    const savedTheme = localStorage.getItem("themePreference");

    function applyTheme(theme) {
        document.body.dataset.theme = theme;
        themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
        themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }

    if (savedTheme) {
        applyTheme(savedTheme);
    }

    themeToggle.addEventListener("click", function () {
        const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
        localStorage.setItem("themePreference", nextTheme);
        applyTheme(nextTheme);
    });
}
