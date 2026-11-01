// 1. Get the current year using the Date object for the copyright
const today = new Date();
const currentYear = today.getFullYear();

// 2. Select the year element and set its text content
const yearElement = document.querySelector("#year");
if (yearElement) {
    yearElement.textContent = currentYear;
}

// 3. Get the document's last modified date and assign it to the lastModified paragraph
const lastModifiedElement = document.querySelector("#lastModified");
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}