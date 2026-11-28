// Shared by every page: hamburger menu and footer dates
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuBtn.classList.toggle("show", isOpen);
        menuBtn.setAttribute("aria-expanded", isOpen);
    });
}

const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const modifiedPara = document.querySelector("#lastModified");
if (modifiedPara) {
    modifiedPara.textContent = `Last Modification: ${document.lastModified}`;
}
