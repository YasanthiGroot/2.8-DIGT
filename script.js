// script.js (Page B)

// Get references to the elements
const pageLinks = document.getElementById("pageLinks");

// Get referring pages from localStorage and add their links to the list on Page B
function loadReferringPageLinks() {
    const referringPages = JSON.parse(localStorage.getItem("referringPages")) || [];

    referringPages.forEach(referringPage => {
        const referringPageLink = document.createElement("li");
        referringPageLink.innerHTML = `<a href="${referringPage.url}">${referringPage.title}</a>`;
        pageLinks.appendChild(referringPageLink);
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
        url: `${referringPageTitle.replace(/\s+/g, '').toLowerCase()}.html`
    };

    referringPages.push(referringPage);
    localStorage.setItem("referringPages", JSON.stringify(referringPages));
}

// Load the referring page links
loadReferringPageLinks();
