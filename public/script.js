// This script handles the form submission and checks the user's answers against the correct answers from the server.
let userAnswers= {
    name: "",
    quest: "",
    color: "",
}

const form = document.getElementById("json-Form");// Get the form element by its ID
const resultDiv = document.getElementById("result");// Get the result div element by its ID
// Add event listeners to the form fields to capture user input
form.name.addEventListener("change", (event) => userAnswers.name = event.target.value.toLowerCase().trim());
form.quest.addEventListener("change", (event) => userAnswers.quest = event.target.value.toLowerCase().trim());
form.color.addEventListener("change", (event) => userAnswers.color = event.target.value.toLowerCase().trim());

form.addEventListener("submit", async (event) => {
    event.preventDefault(); //Prevent default form submission

    try {
        const response = await fetch('http://localhost:3000/answers');// Fetch the correct answers from the server
        const data = await response.json();// Parse the JSON response
        console.log("Fetched answers:", data); // Log the fetched answers for debugging
        const correctAnswers = data; // Assuming the JSON structure is flat and contains the answers directly
        const match =
            userAnswers.name === correctAnswers.name.toLowerCase() &&// Compare user answers with correct answers
            userAnswers.quest === correctAnswers.quest.toLowerCase() &&
            userAnswers.color === correctAnswers["favorite color"].toLowerCase();
// Display the result based on the comparison
        if (match) {
            resultDiv.textContent = "Congratulations! You got it right!";
            resultDiv.style.color = "green";
        } else {
            resultDiv.textContent = "Sorry, that's not correct. Please try again.";
            resultDiv.style.color = "red";
        }
    } catch (error) {// Handle any errors that occur during the fetch operation
        console.error("Error fetching answers:", error);
        resultDiv.textContent = "An error occurred while checking your answers. Please try again later.";
        resultDiv.style.color = "red";
    }
});
