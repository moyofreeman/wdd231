import { places } from "../data/discover.mjs";

const container = document.querySelector(".discover-container");
const visitMessage = document.querySelector("#visit-message");

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const STORAGE_KEY = "manama-last-visit";

function showVisitMessage() {
    const now = Date.now();
    let lastVisit = null;

    try {
        lastVisit = Number(localStorage.getItem(STORAGE_KEY)) || null;
    } catch (error) {
        console.warn("localStorage is not available:", error);
    }

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const days = Math.floor((now - lastVisit) / MS_PER_DAY);

        if (days < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (days === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${days} days ago.`;
        }
    }

    try {
        localStorage.setItem(STORAGE_KEY, now);
    } catch (error) {
        console.warn("Could not save the visit date:", error);
    }
}

function displayPlaces() {
    places.forEach((place, index) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");
        // Each card gets its own named grid area: card1 ... card8
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="${place.image}" alt="${place.alt}" width="300" height="200"${index > 0 ? ' loading="lazy"' : ""}>
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button type="button">Learn more</button>
        `;

        container.appendChild(card);
    });
}

showVisitMessage();
displayPlaces();
