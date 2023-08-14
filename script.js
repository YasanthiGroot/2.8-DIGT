// script.js (Page B)

// Get references to the elements
const pageLinks = document.getElementById("pageLinks");

// Get referring pages from localStorage and add their links to the list on Page B
function loadReferringPageLinks() {
    const referringPages = JSON.parse(localStorage.getItem("referringPages")) || [];

    referringPages.forEach((referringPage, index) => {
        const referringPageItem = document.createElement("li");
        referringPageItem.innerHTML = `
            <label class="checkbox-container">
                <input type="checkbox" class="done-checkbox" data-index="${index}">
                <a href="${referringPage.url}">${referringPage.title}</a>
                <span class="delete-link" data-index="${index}">&times;</span>
            </label>
        `;
        pageLinks.appendChild(referringPageItem);
    });

    // Add click event listeners to delete links
    const deleteLinks = document.querySelectorAll(".delete-link");
    deleteLinks.forEach(deleteLink => {
        deleteLink.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            referringPages.splice(index, 1);
            localStorage.setItem("referringPages", JSON.stringify(referringPages));
            pageLinks.innerHTML = "";
            loadReferringPageLinks(); // Reload the links after deletion
        });
    });

    // Add change event listeners to done checkboxes
    const doneCheckboxes = document.querySelectorAll(".done-checkbox");
    doneCheckboxes.forEach(doneCheckbox => {
        doneCheckbox.addEventListener("change", function() {
            const index = this.getAttribute("data-index");
            referringPages[index].done = this.checked;
            localStorage.setItem("referringPages", JSON.stringify(referringPages));
        });
    });
}

// Add the current referring page to the list and update localStorage
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const referringPageTitle = urlParams.get("ref");

if (referringPageTitle) {
    const referringPages = JSON.parse(localStorage.getItem("referringPages")) || [];
    const referringPage = {
        title: referringPageTitle,
        url: `${referringPageTitle.replace(/\s+/g, '').toLowerCase()}.html`,
        done: false
    };

    referringPages.push(referringPage);
    localStorage.setItem("referringPages", JSON.stringify(referringPages));
}

// Load the referring page links
loadReferringPageLinks();
