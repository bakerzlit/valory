const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.getElementById("noBtn");
    const yesButton = document.getElementById("yesBtn");

    // Change the text of the No button
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    // Make the Yes button grow larger
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    const currentPadding = parseFloat(window.getComputedStyle(yesButton).paddingTop);

    // Increase size by multiplying
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
    yesButton.style.padding = `${currentPadding * 1.2}px`;

    playMusic();
}

function handleYesClick() {
    // Hide the question container
    document.getElementById("question-container").classList.add("hidden");
    // Show the success container
    document.getElementById("success-container").classList.remove("hidden");

    playMusic();
}

const song = document.getElementById("bgMusic");
const albumDisk = document.getElementById("albumDisk");
const screen = document.getElementById("lyricDisplay");

// Sync the spinning effect with the music playing
song.onplay = () => albumDisk.classList.add('spinning');
song.onpause = () => albumDisk.classList.remove('spinning');

function playMusic() {
    if (song.paused) {
        song.play().catch(error => console.log("User interaction needed"));
        syncLyrics();
    }
}

// 2. This is the timeline. The "time" is the second the singer starts the line.
const timeline = [
    { time: 16.00, text: "See, right now, I need you, I'll meet you somewhere now" },
    { time: 20.50, text: "You up now, I see you, I get you, take care now" },
    { time: 24.25, text: "Slow down, be cool, I miss you, come here now" },
    { time: 28.00, text: "It's yours now, keep it, I'll hold out until now" },
    { time: 32.50, text: "I need you right now, once I leave you I'm strung out" },
    { time: 36.75, text: "If I get you, I'm slowly breaking down" },
    { time: 40.50, text: "And, oh, it's hard to see you, but I wish you were right here" },
    { time: 45.00, text: "Oh, it's hard to leave you when I get you everywhere" },
    { time: 49.50, text: "All this time I'm thinking we could never be a pair" },
    { time: 54.25, text: "Oh, no, I don't need you, but I miss you, come here" },
    { time: 59.00, text: "And, oh, it's hard to see you, but I wish you were right here" },
    { time: 64.00, text: "Oh, it's hard to leave you when I get you everywhere" },
    { time: 68.50, text: "All this time I'm thinking, I'm strong enough to sink it" },
    { time: 73.50, text: "Oh, no, I don't need you, but I miss you, come here" },
    { time: 78.00, text: "He love me not, he loves me" },
    { time: 82.50, text: "He holds me tight, then lets me go" },
    { time: 87.00, text: "He love me not, he loves me" },
    { time: 91.50, text: "He holds me tight, then lets me go" },
    { time: 96.00, text: "Soon as you leave me, we always lose connection" },
    { time: 100.75, text: "It's gettin' messy, I fiend for your affection" },
    { time: 105.50, text: "Don't loosen your grip, got a hold on me" },
    { time: 110.00, text: "Now, forever, let's get back together" },
    { time: 115.50, text: "Lord, take it so far away" },
    { time: 119.50, text: "I pray that, God, we don't break" },
    { time: 124.75, text: "I want you to take me up and down" },
    { time: 129.50, text: "And round and round again" },
    { time: 134.50, text: "And, oh, it's hard to see you, but I wish you were right here" },
    { time: 139.00, text: "Oh, it's hard to leave you when I get you everywhere" },
    { time: 143.50, text: "All this time I'm thinking we could never be a pair" },
    { time: 148.50, text: "Oh, no, I don't need you, but I miss you, come here" },
    { time: 153.00, text: "And, oh, it's hard to see you, but I wish you were right here" },
    { time: 157.50, text: "Oh, it's hard to leave you when I get you everywhere" },
    { time: 162.25, text: "All this time I'm thinking, I'm strong enough to sink it" },
    { time: 166.75, text: "Oh, no, I don't need you, but I miss you, come here" },
    { time: 171.50, text: "He love me not, he loves me" },
    { time: 175.50, text: "He holds me tight, then lets me go" },
    { time: 180.00, text: "He love me not, he loves me" },
    { time: 184.50, text: "He holds me tight, then lets me go" }
];

// 3. This is the "Brain." It checks the clock of the song constantly.
function syncLyrics() {
    if (!song) return;

    function update() {
        if (song.paused) return;

        const now = song.currentTime;

        // Find the right line for the current second
        let currentLine = null;
        for (let i = 0; i < timeline.length; i++) {
            if (now >= timeline[i].time) {
                currentLine = timeline[i];
            } else {
                break;
            }
        }

        // Update the screen only if the words are different
        if (currentLine) {
            if (screen.innerText !== currentLine.text) {
                screen.innerText = currentLine.text;
                screen.style.opacity = 1;
            }
        } else {
            // Before the first lyric
            if (screen.innerText !== "Tap anywhere to start the song..." && screen.innerText !== "🎶") {
                screen.innerText = "🎶";
                screen.style.opacity = 1;
            }
        }

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

// Browsers need interaction
document.addEventListener('click', () => {
    if (song.paused) {
        // Only wake up if not already playing via button click
        // wakeUp logic integrated into playMusic and handle clicks
    }
}, { once: true });