const url = "data/members.json";
const cardsContainer = document.querySelector(".directory-cards");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector("nav");

const levels = { 1: "Member", 2: "Silver", 3: "Gold" };

async function getCompaniesData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        displayCompanies(data.companies);
    } catch (error) {
        console.error("Error fetching data:", error);
        cardsContainer.innerHTML = "<p>Sorry, the member directory could not be loaded.</p>";
    }
}

const displayCompanies = (companies) => {
    cardsContainer.innerHTML = "";

    companies.forEach((company) => {
        const card = document.createElement("section");
        card.classList.add("card");

        const level = levels[company.membershipLevel] ?? company.membershipLevel;

        card.innerHTML = `
            <div class="card-header">
                <h2>${company.name}</h2>
                <p class="tagline">${level} Member</p>
            </div>
            <div class="card-body">
                <img src="images/${company.image}" alt="${company.name}" loading="lazy" width="80" height="80">
                <div class="card-info">
                    <p><strong>ADDRESS:</strong> ${company.address}</p>
                    <p><strong>PHONE:</strong> ${company.phone}</p>
                    <p><strong>URL:</strong> <a href="${company.website}" target="_blank" rel="noopener noreferrer">${company.website}</a></p>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
};

function setView(view) {
    const isGrid = view === "grid";
    cardsContainer.classList.toggle("grid", isGrid);
    cardsContainer.classList.toggle("list", !isGrid);
    gridButton.classList.toggle("active", isGrid);
    listButton.classList.toggle("active", !isGrid);
    gridButton.setAttribute("aria-pressed", isGrid);
    listButton.setAttribute("aria-pressed", !isGrid);
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.classList.toggle("show", isOpen);
    menuBtn.setAttribute("aria-expanded", isOpen);
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

getCompaniesData();