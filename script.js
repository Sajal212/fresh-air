document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // HVAC ROI CALCULATOR
    // =========================

    const openBtn = document.getElementById('openCalc');
    const closeBtn = document.getElementById('closeCalc');
    const calcModal = document.getElementById('modalOverlay');
    const calcBtn = document.getElementById('calcBtn');

    if(openBtn && closeBtn && calcModal && calcBtn){

        // Open Calculator
        openBtn.onclick = () => {
            calcModal.style.display = 'flex';
        };

        // Close Calculator
        closeBtn.onclick = () => {
            calcModal.style.display = 'none';
        };

        // Close Outside Click
        window.onclick = (event) => {
            if(event.target === calcModal){
                calcModal.style.display = 'none';
            }
        };

        // Calculation Logic
        calcBtn.onclick = () => {

            const bill = parseFloat(document.getElementById('monthlyBill').value);

            const age = parseFloat(document.getElementById('unitAge').value);

            const years = parseInt(document.getElementById('years').value);

            const resultArea = document.getElementById('resultArea');

            const display = document.getElementById('savingsDisplay');

            if(bill > 0 && age > 0){

                let efficiencyImprovement = (age * 0.025);

                if(efficiencyImprovement > 0.45){
                    efficiencyImprovement = 0.45;
                }

                const totalSavings =
                    (bill * 12 * years) * efficiencyImprovement;

                display.innerHTML = `
                    <p style="margin:0;color:#666;">
                        Total Potential Savings:
                    </p>

                    <h3 style="color:#28a745;font-size:24px;margin:10px 0;">
                        Rs. ${totalSavings.toLocaleString('en-IN', {
                            minimumFractionDigits: 2
                        })}
                    </h3>

                    <p style="font-size:13px;color:#444;">
                        Based on a
                        <strong>
                            ${(efficiencyImprovement * 100).toFixed(0)}%
                        </strong>
                        efficiency boost.
                    </p>
                `;

                resultArea.style.display = 'block';

            } else {

                alert("Please enter valid numbers.");

            }

        };

    }

    // =========================
    // QUOTE / SUPPORT MODAL
    // =========================

    const quoteModal = document.getElementById('quoteModal');

    const overlay = document.getElementById('overlay');

    const form = document.getElementById('quoteForm');

    const quoteBtn = document.getElementById('quoteBtn');

    const quoteCloseBtn = document.getElementById('closeBtn');

    if(quoteModal && overlay && form && quoteBtn && quoteCloseBtn){

        // Open Modal
        quoteBtn.addEventListener('click', () => {

            quoteModal.classList.remove('hidden');

            overlay.classList.remove('hidden');

        });

        // Close Modal
        quoteCloseBtn.addEventListener('click', () => {

            quoteModal.classList.add('hidden');

            overlay.classList.add('hidden');

        });

        // Form Submit
        form.addEventListener('submit', (event) => {

            event.preventDefault();

            const customerData = {

                name: document.getElementById('nameInput').value,

                phone: document.getElementById('phoneInput').value,

                service: document.getElementById('serviceInput').value,

                timestamp: new Date().toISOString()

            };

            let existingLeads =
                JSON.parse(localStorage.getItem('freshAirLeads')) || [];

            existingLeads.push(customerData);

            localStorage.setItem(
                'freshAirLeads',
                JSON.stringify(existingLeads)
            );

            alert("Our team will connect within 24 hours");

            quoteModal.classList.add('hidden');

            overlay.classList.add('hidden');

            form.reset();

        });

    }

    // =========================
    // CHAT SYSTEM
    // =========================

    const chatToggle = document.getElementById("chatToggle");

    const chatPanel = document.getElementById("chatPanel");

    const closeChat = document.getElementById("closeChat");

    const chatBody = document.getElementById("chatBody");

    const chatInput = document.getElementById("chatInput");

    const sendMessage = document.getElementById("sendMessage");

    // Chat Open
    if(chatToggle && chatPanel){

        chatToggle.addEventListener("click", () => {

            chatPanel.classList.add("active");

        });

    }

    // Chat Close
    if(closeChat && chatPanel){

        closeChat.addEventListener("click", () => {

            chatPanel.classList.remove("active");

        });

    }

    // Auto Open Chat
    setTimeout(() => {

        if(chatPanel){
            chatPanel.classList.add("active");
        }

    }, 3000);

    // CHATBOT FUNCTIONS

    function getTime(){

        const now = new Date();

        return now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

    }

    function saveMessages(){

        if(chatBody){
            localStorage.setItem("chatData", chatBody.innerHTML);
        }

    }

    function loadMessages(){

        const saved = localStorage.getItem("chatData");

        if(saved && chatBody){
            chatBody.innerHTML = saved;
        }

    }

    loadMessages();

    function addMessage(message, sender){

        if(!chatBody) return;

        const wrapper = document.createElement("div");

        wrapper.classList.add("message-wrapper");

        if(sender === "user"){
            wrapper.classList.add("user-wrapper");
        }

        else{
            wrapper.classList.add("bot-wrapper");
        }

        const messageDiv = document.createElement("div");

        if(sender === "user"){

            messageDiv.classList.add("user-message");

        }

        else{

            messageDiv.classList.add("bot-message");

        }

        messageDiv.innerHTML = message;

        const time = document.createElement("span");

        time.classList.add("message-time");

        time.innerText = getTime();

        wrapper.appendChild(messageDiv);

        wrapper.appendChild(time);

        chatBody.appendChild(wrapper);

        chatBody.scrollTop = chatBody.scrollHeight;

        saveMessages();

    }

    function showTyping(){

        if(!chatBody) return;

        const typing = document.createElement("div");

        typing.classList.add("typing");

        typing.id = "typing";

        typing.innerHTML = `<span>•••</span>`;

        chatBody.appendChild(typing);

        chatBody.scrollTop = chatBody.scrollHeight;

    }

    function removeTyping(){

        const typing = document.getElementById("typing");

        if(typing){
            typing.remove();
        }

    }

    // CHATBOT DATA 

    const chatbotData = [

        {
            keywords: ["hello", "hi", "hey", "good morning", "good evening"],
            response: "Hello 👋 How can I help you today?"
        },

        {
            keywords: ["repair", "fix", "broken", "damage", "not working"],
            response: "We provide complete AC repair services."
        },

        {
            keywords: ["install", "installation", "setup", "new ac"],
            response: "We offer AC installation for homes and offices."
        },

        {
            keywords: ["price", "cost", "charges", "fees", "budget"],
            response: "Pricing depends on the service type."
        },

        {
            keywords: ["maintenance", "service", "cleaning", "gas refill"],
            response: "We provide regular AC maintenance and cleaning."
        },

        {
            keywords: ["cooling", "not cooling", "hot air", "low cooling"],
            response: "Your AC may require gas refill or filter cleaning."
        },

        {
            keywords: ["contact", "phone", "email", "call", "support"],
            response: "You can contact us at support@freshair.com"
        },

        {
            keywords: ["office", "address", "location"],
            response: "Our office serves customers across your city."
        },

        {
            keywords: ["time", "timing", "hours", "open"],
            response: "Our support team is available from 9 AM to 8 PM."
        },

        {
            keywords: ["amc", "contract", "annual maintenance"],
            response: "We offer affordable AMC maintenance plans."
        },

        {
            keywords: ["thanks", "thank you", "thx"],
            response: "You're welcome 😊"
        },

        {
            keywords: ["bye", "goodbye", "see you"],
            response: "Thank you for visiting Fresh Air HVAC 👋"
        }

    ];

    // =========================
    // BOT REPLY
    // =========================

    function botReply(userText){

        const text = userText.toLowerCase();

        let response = "Please contact our support team.";

        for(let item of chatbotData){

            const matched = item.keywords.some(keyword =>
                text.includes(keyword)
            );

            if(matched){

                response = item.response;

                break;

            }

        }

        showTyping();

        setTimeout(() => {

            removeTyping();

            addMessage(response, "bot");

        }, 1000);

    }

    // =========================
    // HANDLE MESSAGE
    // =========================

    function handleMessage(customText = null){

        const text = customText || chatInput.value.trim();

        if(text === "") return;

        addMessage(text, "user");

        botReply(text);

        chatInput.value = "";

    }

    // Send Button
    if(sendMessage){

        sendMessage.addEventListener("click", () => {

            handleMessage();

        });

    }

    // Enter Key
    if(chatInput){

        chatInput.addEventListener("keypress", (e) => {

            if(e.key === "Enter"){

                handleMessage();

            }

        });

    }

    // Quick Buttons
    const quickButtons =
        document.querySelectorAll(".quick-options button");

    quickButtons.forEach((button) => {

        button.addEventListener("click", () => {

            handleMessage(button.innerText);

        });

    });

});