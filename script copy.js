// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}


// contact
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

/* Step 1: Create a Telegram Bot
Open Telegram and search for @BotFather.
Send /start
Send /newbot
Give your bot a name and a username (must end in bot, e.g. mycontact_bot)
Copy the bot token it gives you (something like: 123456789:ABCdefGhIJKlmNoPQRstuVWXYZ)

Step 2: Add Bot to Your Telegram Channel
Go to your Telegram channel (must be public or accessible to the bot).
Open channel settings → Administrators → Add Admin
Add your bot using the username you just created
Give it at least "Post Messages" permission

Step 3: Get Your Channel ID
You have two options:
Option A: If public channelFormat: @yourchannelusername (use directly in the JS)
Option B: If private or you want raw ID:Visit: https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
Send a message in your channel
Reload the above URL
You'll see chat object with something like "id": -1001234567890 — use this as your channel ID

*/
    const botToken = 'botToken';
    const chatId = 'chatId'; // or use channel ID like '-1001234567890'

    const text = `📩 *New Contact Form Submission*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📌 *Subject:* ${subject}\n💬 *Message:* ${message}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload = {
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert("✅ Message sent to Telegram!");
            document.getElementById("contactForm").reset();
        } else {
            alert("⚠️ Failed to send message.");
            console.error(data);
        }
    })
    .catch(error => {
        alert("❌ Error sending message.");
        console.error(error);
    });
});

