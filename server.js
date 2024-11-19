require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const postmark = require('postmark');

const app = express();
const client = new postmark.ServerClient(process.env.API_KEY);

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Serve static files (optional if using a separate server for static content)
app.use(express.static(__dirname));

// Contact form submission endpoint
app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validation
    let errors = {};

    if (!name || name.trim() === '') {
        errors.name = 'Name is required';
    }

    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegEx.test(email.trim())) {
        errors.email = 'Valid email is required';
    }

    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    if (!phone || !phoneRegex.test(phone.trim())) {
        errors.phone = 'Valid phone number is required';
    }

    if (!message || message.trim() === '') {
        errors.message = 'Message is required';
    }

    // If there are validation errors, respond with 400 and the errors
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    // Email content
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

    // Send email using Postmark
    client.sendEmail({
        From: 'a.killett2@newcastle.ac.uk',
        To: 'a.killett2@newcastle.ac.uk',
        Subject: `Contact form submitted by ${name}`,
        HtmlBody: htmlBody,
        TextBody: textBody,
        MessageStream: 'broadcast',
    })
    .then(() => {
        res.json({ success: true, message: 'Contact form submitted successfully!' });
    })
    .catch((err) => {
        res.status(500).json({ error: 'Failed to send email', details: err.message });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});