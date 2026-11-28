import { places } from "../data/discover.mjs";

const container = document.querySelector(".discover-container");
for (let i = 0; i < places.length; i++) {
    const card = document.createElement("section");
    
    card.innerHTML = `
    <div class=discover-card>
    <h2>${places[i].name}</h2>
    <img src="${places[i].image}" alt="${places[i].alt}">
    <p class="address"><strong>Address: </strong>${places[i].address}</p>
    <p><strong>Description: </strong>${places[i].description}</p>
    </div>`;

    container.appendChild(card);
}