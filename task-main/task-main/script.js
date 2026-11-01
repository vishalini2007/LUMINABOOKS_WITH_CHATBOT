
// ==========================================
// HAMBURGER MENU
// ==========================================

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}


// ==========================================
// CONTACT FORM USING AXIOS
// ==========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const contactData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        const submitBtn = document.getElementById("submitBtn");

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        try {

            const response = await axios.post(
                "http://localhost:3000/post/contact",
                contactData
            );

            alert(response.data);
            contactForm.reset();

        }
        catch (error) {

            console.log("Error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to send message. Please try again."
            );

        }
        finally {

            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";

        }

    });

}


// ==========================================
// LUMINA BOOKS CHATBOT
// ==========================================

const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotBox = document.getElementById("chatbotBox");
const closeChat = document.getElementById("closeChat");
const sendMessage = document.getElementById("sendMessage");
const userMessage = document.getElementById("userMessage");
const chatMessages = document.getElementById("chatMessages");


// OPEN CHAT

if (chatbotToggle && chatbotBox) {

    chatbotToggle.addEventListener("click", function () {
        chatbotBox.classList.toggle("active");
    });

}


// CLOSE CHAT

if (closeChat && chatbotBox) {

    closeChat.addEventListener("click", function () {
        chatbotBox.classList.remove("active");
    });

}


// DISPLAY MESSAGE FUNCTION

function displayMessage(message, className) {

    const messageDiv = document.createElement("div");

    messageDiv.className = className;
    messageDiv.textContent = message;

    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}


// SEND MESSAGE TO BACKEND USING AXIOS

async function sendChat() {

    if (!userMessage || !chatMessages) return;

    const message = userMessage.value.trim();

    if (message === "") return;

    // DISPLAY USER MESSAGE

    displayMessage(message, "user-message");

    userMessage.value = "";

    sendMessage.disabled = true;

    try {

        // SEND MESSAGE TO BACKEND

        const response = await axios.post(
            "http://localhost:3000/chatbot/llm",
            {
                message: message
            }
        );

        // GET BACKEND RESPONSE

        const botReply = response.data.answer;

        // DISPLAY BACKEND RESPONSE

        displayMessage(botReply, "bot-message");

    }

    catch (error) {

        console.log("Chatbot Error:", error);

        displayMessage(
            "Sorry! Something went wrong. Please try again.",
            "bot-message"
        );

    }

    finally {

        sendMessage.disabled = false;

        userMessage.focus();

    }

}


// SEND BUTTON

if (sendMessage) {

    sendMessage.addEventListener("click", sendChat);

}


// ENTER KEY

if (userMessage) {

    userMessage.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            sendChat();
        }

    });

}
