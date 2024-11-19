document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contact").addEventListener("click", async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, message }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
            } else {
                alert(`Failed: ${JSON.stringify(data.errors || data.error)}`);
            }
        } catch (error) {
            alert(`An error occurred while submitting the form. ${error}`);
        }
    });
});