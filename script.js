/* =========================================================
   SAFEROUTE
   Smart Safety Journey Planner
========================================================= */


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let selectedTransport = "Walking";
let selectedRoute = 0;


/* =========================================================
   ROUTE DATA
========================================================= */

const routes = [

    {
        name: "Balanced Route",
        shortName: "Route A",
        time: "19 min",
        distance: "6.2 km",
        score: 72,
        sections: 4,
        attentionPoints: 2,

        recommendation:
            "Balanced route selected",

        recommendationText:
            "This route provides a balance between journey time, distance and route conditions.",

        riskName:
            "Market Junction",

        riskText:
            "Low lighting has been identified along this section of the route.",

        alternative:
            "Safety Priority",

        alternativeText:
            "A longer route may provide different journey conditions.",

        support: {
            hospital: "0.8 km from route",
            police: "1.2 km from route",
            transit: "0.5 km from route"
        },

        segments: [

            {
                name: "Campus Road",
                status: "Good",
                statusClass: "safe",
                distance: "1.5 km",
                time: "5 min",
                description:
                    "Well-connected section with regular activity.",
                icon: "✓"
            },

            {
                name: "Market Junction",
                status: "Moderate",
                statusClass: "moderate",
                distance: "1.4 km",
                time: "4 min",
                description:
                    "Some sections have lower lighting.",
                icon: "!",
                clickable: true
            },

            {
                name: "Lake Road",
                status: "Attention",
                statusClass: "attention",
                distance: "1.8 km",
                time: "6 min",
                description:
                    "A reported concern is present along this section.",
                icon: "!",
                clickable: true
            },

            {
                name: "Main Street",
                status: "Good",
                statusClass: "safe",
                distance: "1.5 km",
                time: "4 min",
                description:
                    "Active road section leading towards the destination.",
                icon: "✓"
            }

        ]
    },


    {
        name: "Safety Priority",
        shortName: "Route B",
        time: "23 min",
        distance: "7.1 km",
        score: 86,
        sections: 5,
        attentionPoints: 1,

        recommendation:
            "Safety-focused route selected",

        recommendationText:
            "This route adds some travel time while passing through sections with fewer attention points.",

        riskName:
            "North Junction",

        riskText:
            "One moderate concern is present near the junction.",

        alternative:
            "Balanced Route",

        alternativeText:
            "A shorter route is available if journey time is more important.",

        support: {
            hospital: "0.6 km from route",
            police: "0.9 km from route",
            transit: "0.4 km from route"
        },

        segments: [

            {
                name: "Campus Road",
                status: "Good",
                statusClass: "safe",
                distance: "1.2 km",
                time: "4 min",
                description:
                    "Active road with good route connectivity.",
                icon: "✓"
            },

            {
                name: "Residential Avenue",
                status: "Good",
                statusClass: "safe",
                distance: "1.5 km",
                time: "5 min",
                description:
                    "Residential section with regular movement.",
                icon: "✓"
            },

            {
                name: "North Junction",
                status: "Moderate",
                statusClass: "moderate",
                distance: "1.1 km",
                time: "4 min",
                description:
                    "Moderate activity around the junction.",
                icon: "!",
                clickable: true
            },

            {
                name: "Central Avenue",
                status: "Good",
                statusClass: "safe",
                distance: "1.7 km",
                time: "6 min",
                description:
                    "Well-connected main road.",
                icon: "✓"
            },

            {
                name: "Main Street",
                status: "Good",
                statusClass: "safe",
                distance: "1.6 km",
                time: "4 min",
                description:
                    "Final section towards the destination.",
                icon: "✓"
            }

        ]
    },


    {
        name: "Alternative Route",
        shortName: "Route C",
        time: "21 min",
        distance: "6.8 km",
        score: 79,
        sections: 4,
        attentionPoints: 1,

        recommendation:
            "Alternative route selected",

        recommendationText:
            "This route offers a middle ground between the shorter route and the safety-focused route.",

        riskName:
            "Old Bridge Road",

        riskText:
            "One section requires additional attention due to lower activity.",

        alternative:
            "Safety Priority",

        alternativeText:
            "A longer route is available with a higher route score.",

        support: {
            hospital: "0.9 km from route",
            police: "1.0 km from route",
            transit: "0.6 km from route"
        },

        segments: [

            {
                name: "Campus Road",
                status: "Good",
                statusClass: "safe",
                distance: "1.4 km",
                time: "5 min",
                description:
                    "Well-connected starting section.",
                icon: "✓"
            },

            {
                name: "Old Bridge Road",
                status: "Attention",
                statusClass: "attention",
                distance: "1.6 km",
                time: "5 min",
                description:
                    "Lower activity is observed along this section.",
                icon: "!",
                clickable: true
            },

            {
                name: "Central Avenue",
                status: "Good",
                statusClass: "safe",
                distance: "1.9 km",
                time: "6 min",
                description:
                    "Active central road section.",
                icon: "✓"
            },

            {
                name: "Main Street",
                status: "Good",
                statusClass: "safe",
                distance: "1.9 km",
                time: "5 min",
                description:
                    "Final road section towards the destination.",
                icon: "✓"
            }

        ]
    }

];


/* =========================================================
   TRANSPORT ICONS
========================================================= */

const transportIcons = {

    "Walking": "🚶",

    "Car": "🚗",

    "Bus": "🚌",

    "Cab / Auto": "🚕",

    "Two-wheeler": "🏍️"

};


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeNavigation();

    initializeDate();

    updateJourneyFromRoute();

    updateInsightsFromRoute();

});


/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {

    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.addEventListener("click", function () {

            navItems.forEach(nav =>
                nav.classList.remove("active")
            );

            this.classList.add("active");

        });

    });

}


function goTo(screenName) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(screen => {

        screen.classList.remove("active");

    });


    const selectedScreen =
        document.getElementById(screenName);

    if (selectedScreen) {

        selectedScreen.classList.add("active");

    }


    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.classList.remove("active");

        if (
            item.getAttribute("data-screen") === screenName
        ) {

            item.classList.add("active");

        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (screenName === "journey") {

        updateJourneyFromRoute();

    }


    if (screenName === "insights") {

        updateInsightsFromRoute();

    }

}


/* =========================================================
   TRANSPORT SELECTION
========================================================= */

function selectTransport(button, transport) {

    const options =
        document.querySelectorAll(".transport-option");

    options.forEach(option =>
        option.classList.remove("active")
    );

    button.classList.add("active");

    selectedTransport = transport;

    showToast(
        transport + " selected"
    );

}


/* =========================================================
   PLAN JOURNEY
========================================================= */

function planJourney() {

    const from =
        document.getElementById("fromInput").value.trim();

    const to =
        document.getElementById("toInput").value.trim();

    const time =
        document.getElementById("timeInput").value;


    if (!from || !to) {

        showToast(
            "Please enter both locations"
        );

        return;
    }


    const formattedTime =
        formatTime(time);


    document.getElementById("routeJourneyName").textContent =
        from + " → " + to;


    document.getElementById("journeySubtitle").textContent =
        from + " → " + to;


    showToast(
        "Routes prepared for " + formattedTime
    );


    setTimeout(function () {

        goTo("routes");

    }, 650);

}


/* =========================================================
   TIME FORMAT
========================================================= */

function formatTime(time) {

    if (!time) return "";

    const parts = time.split(":");

    let hours = parseInt(parts[0]);

    const minutes = parts[1];

    const period =
        hours >= 12 ? "PM" : "AM";

    hours =
        hours % 12 || 12;

    return hours + ":" + minutes + " " + period;

}


/* =========================================================
   ROUTE SELECTION
========================================================= */

function selectRoute(number) {

    selectedRoute = number;


    const routeCards =
        document.querySelectorAll(".route-card");

    routeCards.forEach(card =>
        card.classList.remove("selected")
    );


    const selectedCard =
        document.getElementById(
            "routeCard" + number
        );


    if (selectedCard) {

        selectedCard.classList.add("selected");

    }


    const route =
        routes[selectedRoute];


    showToast(
        route.name + " selected"
    );


    updateJourneyFromRoute();

    updateInsightsFromRoute();

}


/* =========================================================
   CONTINUE WITH ROUTE
========================================================= */

function continueToJourney() {

    const route =
        routes[selectedRoute];


    showToast(
        route.name + " loaded"
    );


    setTimeout(function () {

        goTo("journey");

    }, 450);

}


/* =========================================================
   UPDATE JOURNEY
========================================================= */

function updateJourneyFromRoute() {

    const route =
        routes[selectedRoute];


    if (!route) return;


    document.getElementById("journeyTitle").textContent =
        route.name;


    document.getElementById("journeyTime").textContent =
        route.time;


    document.getElementById("journeyDistance").textContent =
        route.distance;


    document.getElementById("journeyScore").textContent =
        route.score + " / 100";


    document.getElementById("journeyTransport").textContent =
        selectedTransport;


    document.getElementById("journeyTransportIcon").textContent =
        transportIcons[selectedTransport];


    document.getElementById("sectionCount").textContent =
        route.sections + " sections";


    document.getElementById("journeyRecommendation").textContent =
        route.recommendation;


    document.getElementById("journeyRecommendationText").textContent =
        route.recommendationText;


    renderSegments(route);

}


/* =========================================================
   RENDER JOURNEY SEGMENTS
========================================================= */

function renderSegments(route) {

    const container =
        document.getElementById("segmentList");


    if (!container) return;


    container.innerHTML = "";


    route.segments.forEach(function (segment, index) {

        const card =
            document.createElement("div");


        card.className =
            "segment-card " +
            segment.statusClass;


        card.style.animationDelay =
            (index * 0.12) + "s";


        let clickAction = "";


        if (segment.clickable) {

            clickAction =
                `onclick="showRisk('${segment.name}', 3, 'Recent route information')"`;

            card.classList.add("clickable-segment");

        }


        card.innerHTML = `

            <div class="segment-number">
                ${index + 1}
            </div>

            <div class="segment-main">

                <div class="segment-title">

                    <div>

                        <h3>${segment.name}</h3>

                        <p>
                            ${segment.description}
                        </p>

                    </div>

                    <span class="segment-status">
                        ${segment.status}
                    </span>

                </div>

                <div class="segment-meta">

                    <span>
                        ↝ ${segment.distance}
                    </span>

                    <span>
                        ◷ ${segment.time}
                    </span>

                    ${
                        segment.clickable
                        ?
                        `<button
                            class="segment-action"
                            onclick="event.stopPropagation(); ${clickAction.replace("onclick=\"", "").replace("\"", "")}"
                        >
                            View concern
                        </button>`
                        :
                        ""
                    }

                </div>

            </div>

            <div class="segment-icon">
                ${segment.icon}
            </div>

        `;


        if (segment.clickable) {

            card.setAttribute(
                "onclick",
                `showRisk('${segment.name}', 3, 'Recent route information')`
            );

        }


        container.appendChild(card);

    });

}


/* =========================================================
   PRIORITY SLIDER
========================================================= */

function changePriority() {

    const slider =
        document.getElementById("prioritySlider");

    const value =
        parseInt(slider.value);


    const priorityText =
        document.getElementById("priorityText");


    if (value < 30) {

        priorityText.textContent =
            "Faster journey";

    }

    else if (value < 70) {

        priorityText.textContent =
            "Balanced journey";

    }

    else {

        priorityText.textContent =
            "Safety-focused journey";

    }

}


/* =========================================================
   INSIGHTS
========================================================= */

function updateInsightsFromRoute() {

    const route =
        routes[selectedRoute];


    if (!route) return;


    document.getElementById("insightRouteName").textContent =
        route.name;


    document.getElementById("insightRouteText").textContent =
        route.recommendationText;


    document.getElementById("insightRiskName").textContent =
        route.riskName;


    document.getElementById("insightRiskText").textContent =
        route.riskText;


    document.getElementById("insightAlternative").textContent =
        route.alternative;


    document.getElementById("insightAlternativeText").textContent =
        route.alternativeText;


    document.getElementById("hospitalDistance").textContent =
        route.support.hospital;


    document.getElementById("policeDistance").textContent =
        route.support.police;


    document.getElementById("transitDistance").textContent =
        route.support.transit;

}


/* =========================================================
   RISK INFORMATION
========================================================= */

function showRisk(category, reports, recent) {

    showModal(

        category,

        `

        <div class="modal-info">

            <div class="modal-large-icon">
                !
            </div>

            <h3>${category}</h3>

            <p>
                This section has been identified as an
                area requiring additional attention.
            </p>

            <div class="modal-stats">

                <div>
                    <strong>${reports}</strong>
                    <span>reported observations</span>
                </div>

                <div>
                    <strong>${recent}</strong>
                    <span>recent information</span>
                </div>

            </div>

            <div class="modal-note">
                Consider the surrounding route conditions
                when travelling through this section.
            </div>

        </div>

        `

    );

}


/* =========================================================
   SUPPORT
========================================================= */

function showSupport() {

    const route =
        routes[selectedRoute];


    showModal(

        "Nearby support",

        `

        <div class="support-modal">

            <div class="modal-support-item">

                <span>✚</span>

                <div>
                    <strong>Hospital</strong>
                    <p>${route.support.hospital}</p>
                </div>

            </div>


            <div class="modal-support-item">

                <span>★</span>

                <div>
                    <strong>Police Station</strong>
                    <p>${route.support.police}</p>
                </div>

            </div>


            <div class="modal-support-item">

                <span>●</span>

                <div>
                    <strong>Public Transit</strong>
                    <p>${route.support.transit}</p>
                </div>

            </div>

        </div>

        `

    );

}


/* =========================================================
   ROUTE COMPARISON
========================================================= */

function showDetour() {

    const current =
        routes[selectedRoute];


    const alternativeIndex =
        selectedRoute === 1 ? 0 : 1;


    const alternative =
        routes[alternativeIndex];


    showModal(

        "Route comparison",

        `

        <div class="comparison-modal">

            <div class="comparison-item selected-comparison">

                <span>SELECTED ROUTE</span>

                <h3>
                    ${current.name}
                </h3>

                <div class="comparison-values">

                    <strong>
                        ${current.time}
                    </strong>

                    <strong>
                        ${current.distance}
                    </strong>

                    <strong>
                        ${current.score}/100
                    </strong>

                </div>

            </div>


            <div class="comparison-divider">
                VS
            </div>


            <div class="comparison-item">

                <span>ALTERNATIVE</span>

                <h3>
                    ${alternative.name}
                </h3>

                <div class="comparison-values">

                    <strong>
                        ${alternative.time}
                    </strong>

                    <strong>
                        ${alternative.distance}
                    </strong>

                    <strong>
                        ${alternative.score}/100
                    </strong>

                </div>

            </div>

        </div>

        `

    );

}


/* =========================================================
   REPORT
========================================================= */

function submitReport() {

    const location =
        document
            .getElementById("reportLocation")
            .value
            .trim();


    const category =
        document.getElementById(
            "reportCategory"
        ).value;


    const description =
        document
            .getElementById("reportDescription")
            .value
            .trim();


    if (!location) {

        showToast(
            "Please enter a location"
        );

        return;

    }


    showModal(

        "Report submitted",

        `

        <div class="report-success">

            <div class="success-icon">
                ✓
            </div>

            <h3>Thank you for sharing</h3>

            <p>
                Your route concern has been recorded.
            </p>

            <div class="submitted-details">

                <strong>Location</strong>
                <span>${location}</span>

                <strong>Category</strong>
                <span>${category}</span>

                ${
                    description
                    ?
                    `
                    <strong>Description</strong>
                    <span>${description}</span>
                    `
                    :
                    ""
                }

            </div>

        </div>

        `

    );


    document.getElementById(
        "reportLocation"
    ).value = "";


    document.getElementById(
        "reportDescription"
    ).value = "";

}


/* =========================================================
   SAVED JOURNEY
========================================================= */

function loadSavedJourney() {

    document.getElementById(
        "fromInput"
    ).value = "SVECW Campus";


    document.getElementById(
        "toInput"
    ).value = "Home";


    goTo("home");


    showToast(
        "Saved journey loaded"
    );

}


/* =========================================================
   MODAL
========================================================= */

function showModal(title, content) {

    const modal =
        document.getElementById("modal");


    const modalContent =
        document.getElementById("modalContent");


    modalContent.innerHTML = `

        <span class="modal-eyebrow">
            SAFEROUTE
        </span>

        <h2>${title}</h2>

        ${content}

    `;


    modal.classList.add("show");

}


function closeModal() {

    document
        .getElementById("modal")
        .classList.remove("show");

}


window.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("modal");

        if (event.target === modal) {

            closeModal();

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    toastMessage.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(function () {

            toast.classList.remove("show");

        }, 2500);

}


/* =========================================================
   DATE
========================================================= */

function initializeDate() {

    const dateInput =
        document.getElementById("dateInput");


    if (!dateInput) return;


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    dateInput.value =
        `${year}-${month}-${day}`;

}