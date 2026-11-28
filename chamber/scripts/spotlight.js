const membersUrl = "data/members.json";
const spotlightContainer = document.querySelector("#spotlight-cards");

const levelNames = { 1: "Member", 2: "Silver", 3: "Gold" };

// Accepts 1/2/3 (number or text) or the words member/silver/gold
function getLevel(value) {
    if (/^\d+$/.test(String(value))) {
        return Number(value);
    }
    const byName = { member: 1, silver: 2, gold: 3 };
    return byName[String(value).toLowerCase()] || 1;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();

        const eligible = data.companies.filter((company) => {
            const level = getLevel(company.membershipLevel);
            return level === 2 || level === 3;
        });

        displaySpotlights(shuffle([...eligible]).slice(0, 3));
    } catch (error) {
        console.warn("Spotlights could not be loaded:", error);
        spotlightContainer.innerHTML = "<p>Spotlights are currently unavailable.</p>";
    }
}

function displaySpotlights(companies) {
    spotlightContainer.innerHTML = "";

    companies.forEach((company) => {
        const level = levelNames[getLevel(company.membershipLevel)];
        const href = /^https?:\/\//.test(company.website) ? company.website : `https://${company.website}`;

        const card = document.createElement("section");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-header">
                <h3>${company.name}</h3>
                <p class="tagline">${level} Member</p>
            </div>
            <div class="card-body">
                <img src="images/${company.image}" alt="${company.name} logo" loading="lazy" width="80" height="80">
                <div class="card-info">
                    <p><strong>PHONE:</strong> ${company.phone}</p>
                    <p><strong>ADDRESS:</strong> ${company.address}</p>
                    <p><strong>URL:</strong> <a href="${href}" target="_blank" rel="noopener noreferrer">${company.website}</a></p>
                </div>
            </div>
        `;
        spotlightContainer.appendChild(card);
    });
}

getSpotlights();