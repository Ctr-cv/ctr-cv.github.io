function createStars() {
    const container = document.querySelector(".stars");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    for (let i = 0; i < 150; i += 1) {
        const star = document.createElement("div");
        const size = `${Math.random() * 2.4 + 0.6}px`;

        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = size;
        star.style.height = size;
        star.style.animation = `twinkle ${Math.random() * 2.4 + 1.4}s infinite`;
        star.style.opacity = (Math.random() * 0.5 + 0.25).toString();
        container.appendChild(star);
    }
}

createStars();
window.addEventListener("resize", createStars);

const navButtons = [...document.querySelectorAll(".nav-btn")];
const pageSections = [...document.querySelectorAll("main section[id]")];

navButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.preventDefault();

        const targetId = btn.dataset.section;
        const section = document.getElementById(targetId);

        if (!section) {
            return;
        }

        const yOffset = window.innerWidth <= 768 ? -24 : -36;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
            top: y,
            behavior: "smooth"
        });
    });
});

function updateActiveSection() {
    const checkpoint = window.scrollY + window.innerHeight * 0.35;
    let activeId = "hero";

    pageSections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (checkpoint >= top && checkpoint < bottom) {
            activeId = section.id;
        }
    });

    navButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.section === activeId);
    });
}

updateActiveSection();
window.addEventListener("scroll", updateActiveSection, { passive: true });

document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
        const item = header.closest(".accordion-item");

        document.querySelectorAll(".accordion-item").forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });
});

const photoItems = [...document.querySelectorAll(".photo-item")];
const dots = [...document.querySelectorAll(".dot")];

function setActivePhoto(targetIndex) {
    photoItems.forEach((photo) => {
        photo.classList.toggle("active-photo", photo.dataset.index === targetIndex);
    });

    dots.forEach((dot) => {
        dot.classList.toggle("active", dot.dataset.target === targetIndex);
    });
}

photoItems.forEach((photo) => {
    photo.addEventListener("click", () => {
        setActivePhoto(photo.dataset.index);
    });
});

dots.forEach((dot) => {
    dot.addEventListener("click", () => {
        setActivePhoto(dot.dataset.target);
    });
});

const resumeDownload = document.getElementById("resume-download");

if (resumeDownload) {
    resumeDownload.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = "Software_Resume.pdf";
        link.download = "Vivi-Huang-Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
