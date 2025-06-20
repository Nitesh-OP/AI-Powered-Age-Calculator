function calculateAge() { 
    const today = new Date();
    const birthDateInput = document.getElementById("birthdate").value;
    const emailInput = document.getElementById("email").value;
    const birthDateParts = birthDateInput.split("-");
    const birthYear = parseInt(birthDateParts[0], 10);
    const birthMonth = parseInt(birthDateParts[1], 10) - 1;
    const birthDay = parseInt(birthDateParts[2], 10);
    const birthDate = new Date(birthYear, birthMonth, birthDay);

    const ageInMilliSeconds = today - birthDate;
    const ageInSeconds = Math.floor(ageInMilliSeconds / 1000);
    const ageInMinutes = Math.floor(ageInSeconds / 60);
    const ageInHours = Math.floor(ageInMinutes / 60);
    const ageInDays = Math.floor(ageInHours / 24);
    const ageInWeeks = Math.floor(ageInDays / 7);
    const ageInMonths = Math.floor(ageInDays / 30.436875);
    const ageInYears = Math.floor(ageInDays / 365.25);

    const resultcontainer = document.getElementById("resultcontainer");
    const result = document.getElementById("result");
    result.innerHTML = `
        <div class="result-items">
            <h3>Age:</h3>
            <p>${ageInYears} Years ${ageInMonths % 12} Months ${ageInDays % 30} Days</p>
        </div>
        <div class="result-items">
            <h3>Months Passed:</h3>
            <p>${ageInMonths}</p>
        </div>
        <div class="result-items">
            <h3>Weeks Passed:</h3>
            <p>${ageInWeeks}</p>
        </div>
        <div class="result-items">
            <h3>Days Passed:</h3>
            <p>${ageInDays}</p>
        </div>
        <div class="result-items">
            <h3>Hours Passed:</h3>
            <p>${ageInHours}</p>
        </div>
        <div class="result-items">
            <h3>Minutes Passed:</h3>
            <p>${ageInMinutes}</p>
        </div>
        <div class="result-items">
            <h3>Seconds Passed:</h3>
            <p>${ageInSeconds}</p>
        </div>
    `;

    // Add personalized recommendation based on age
    const recommendationContainer = document.getElementById("recommendation-container");
    const livingThing = document.getElementById("living-thing");
    const nonLivingThing = document.getElementById("non-living-thing");
    const recommendationHeading = document.getElementById("recommendation-heading");

    // Clear previous recommendations
    livingThing.innerHTML = "";
    nonLivingThing.innerHTML = "";

    // Show recommendation container
    recommendationContainer.style.display = "block";

    if (ageInYears < 22) {
        recommendationHeading.innerText = "AI for Growth and Optimization";
        livingThing.innerHTML = `
            <h3>AI-driven Tools:</h3>
            <a href="https://replika.ai/" target="_blank">Replika AI Chatbot</a>
            <img src="images/replika.png" alt="Replika AI">
        `;
        nonLivingThing.innerHTML = `
            <h3>AI-driven Products:</h3>
            <a href="https://www.amazon.com/echo" target="_blank">Amazon Echo</a>
            <img src="images/Amazonecho.png" alt="Amazon Echo">
        `;
    } else if (ageInYears >= 22 && ageInYears <= 50) {
        recommendationHeading.innerText = "Maintain for Longevity and Performance";
        livingThing.innerHTML = `
            <h3>Living Thing:</h3>
            <a href="https://www.myfitnesspal.com/" target="_blank">MyFitnessPal</a>
            <img src="images/myfitnesspal.png" alt="MyFitnessPal">
        `;
        nonLivingThing.innerHTML = `
            <h3>Non-living Thing:</h3>
            <a href="https://www.angi.com/" target="_blank">Angi - Home Maintenance</a>
            <img src="images/angi.png" alt="Angi">
        `;
    } else {
        recommendationHeading.innerText = "Prioritize Comfort and Ease of Use";
        livingThing.innerHTML = `
            <h3>Living Thing:</h3>
            <a href="https://www.silversneakers.com/" target="_blank">SilverSneakers</a>
            <img src="images/silversneakers.png" alt="SilverSneakers">
        `;
        nonLivingThing.innerHTML = `
            <h3>Non-living Thing:</h3>
            <a href="https://www.humanscale.com/" target="_blank">Humanscale Ergonomics</a>
            <img src="images/human.png" alt="Humanscale">
        `;
    }

    // Send data to server for storage in MySQL database
    const formData = new FormData();
    formData.append('birthdate', birthDateInput);
    formData.append('email', emailInput);
    formData.append('age', ageInYears);
    formData.append('months', ageInMonths);
    formData.append('weeks', ageInWeeks);
    formData.append('days', ageInDays);
    formData.append('hours', ageInHours);
    formData.append('minutes', ageInMinutes);
    formData.append('seconds', ageInSeconds);

    fetch('submit.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// Add event listener without declaring ageCalculatorForm globally
document.getElementById("ageCalculator").addEventListener("submit", (event) => {
    event.preventDefault();
    calculateAge();
});
