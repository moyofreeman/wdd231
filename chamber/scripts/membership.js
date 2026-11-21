
const membershipLinks = document.querySelectorAll("[data-modal]");

// Select all membership dialogs
const membershipDialogs = document.querySelectorAll(".dialogMembershipInfo");

// Open the appropriate modal
membershipLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const modalId = link.dataset.modal;
        const modal = document.getElementById(modalId);

        if (modal && !modal.open) {
            modal.showModal();
        }

    });

});


// Close buttons, outside clicks and Escape key
membershipDialogs.forEach((dialog) => {

    // Find the close button inside each dialog
    const closeButton = dialog.querySelector(".closeModal");

    // Close modal when button is clicked
    if (closeButton) {

        closeButton.addEventListener("click", () => {
            dialog.close();
        });

    }

    
    dialog.addEventListener("click", (event) => {

        if (event.target === dialog) {
            dialog.close();
        }

    });


});




// Get the hidden timestamp field
const timestampField = document.querySelector("#timestamp");

// Set current date and time when the form loads
if (timestampField) {

    timestampField.value = new Date().toISOString();

}




const membershipCards = document.querySelectorAll(".membership-card");

membershipCards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.animation = `membershipEntrance 0.8s ease forwards`;

    card.style.animationDelay = `${index * 0.2}s`;

});


const params = new URLSearchParams(window.location.search);
const first = params.get('first');
const last = params.get('last');
const email = params.get('email');
const tel = params.get('tel');
const membership = params.get('membership');

document.getElementById('results').innerHTML = `
<p>Thank you very much ${first} ${last} for buying the ${membership} package</p>
<p>Kindly confirm if your email address is ${email} and contact number is ${tel} </p>
`