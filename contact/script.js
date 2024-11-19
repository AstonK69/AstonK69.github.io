require('@dotenvx/dotenvx').config();
var postmark = require("postmark");
var client = new postmark.ServerClient(process.env.API_KEY);

const contact_element = document.getElementById("contact");
contact_element.addEventListener("click", function(event) {
    event.preventDefault();
    sendContactMail();
});

function sendContactMail() { 

    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(i => i.style.display = 'none');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    let errorThrown = false;

    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        document.getElementById('nameError').style.display = 'block';
        errorThrown = true;
    }

    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === '' || !emailRegEx.test(email)) {
        document.getElementById('emailError').textContent = 'Valid email is required';
        document.getElementById('emailError').style.display = 'block';
        errorThrown = true;
    }

    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    if (phone === '' || !phoneRegex.test(phone)) {
        document.getElementById('phoneError').textContent = 'Valid phone number is required';
        document.getElementById('phoneError').style.display = 'block';
        errorThrown = true;
    }

    if (message === '') {
        document.getElementById('phoneError').textContent = 'Message is required';
        document.getElementById('phoneError').style.display = 'block';
        errorThrown = true;
    }

    if (!errorThrown) {

        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        h1 {
            color: #333;
        }
        p {
            margin: 10px 0;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        .value {
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Contact Form Submission</h1>
        <p><span class="label">Name:</span> <span class="value">${name}</span></p>
        <p><span class="label">Email:</span> <span class="value">${email}</span></p>
        <p><span class="label">Phone:</span> <span class="value">${phone}</span></p>
        <p><span class="label">Message:</span></p>
        <p class="value">${message}</p>
    </div>
</body>
</html>
`;

const textBody = `
Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Message:
${message}
`;

        // client.sendEmail({
        //     "From": "a.killett2@newcastle.ac.uk",
        //     "To": "a.killett2@newcastle.ac.uk",
        //     "Subject": `Contact form submitted by ${name}`,
        //     "HtmlBody": htmlBody,
        //     "TextBody": textBody,
        //     "MessageStream": "broadcast"
        //     });

            alert("Contact form submitted!");
    }
};