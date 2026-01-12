document.querySelector('.field-group').addEventListener('submit', function (e) {
    e.preventDefault();

    const canvas = document.getElementById('weddingCardCanvas');
    const ctx = canvas.getContext('2d');

    // --- Data Extraction ---
    const startingLine = document.getElementById('Starting-Line').value;
    const inviter = `${document.getElementById('inviter-name').value} ${document.getElementsByName('inviter-name')[1].value}`;
    const runningSentence = document.getElementById('Running-Sentence').value;

    // Check if it's Valima or Wedding
    const eventTypeRaw = document.querySelector('input[name="first-radio-1"]:checked').nextElementSibling.innerText;

    const groomName = document.getElementById('Groom-Name').value;
    const groomFather = document.getElementById('Groom-Father-Name').value;
    const brideName = document.getElementById('Bride-Name').value;
    const brideFather = document.getElementById('Bride-Father-Name').value;

    const datePrefix = document.querySelector('input[name="InshaAllahon"]:checked').nextElementSibling.innerText;
    const dateValue = document.getElementById('dates').value;

    const venueName = document.getElementById('LawnBanquetHotel').value;
    const address = document.getElementById('adress').value;

    const rsvpHeading = document.querySelector('input[name="R.S.V.P"]:checked').nextElementSibling.innerText;
    const rsvpNames = document.getElementById('Name').value;

    // All 4 Programme Fields
    const arrival = document.getElementById('ArrivalofBarat').value;
    const nikkah = document.getElementById('Nikkah').value;
    const dinner = document.getElementById('Dinner').value;
    const rukhsati = document.getElementById('Rukhsati').value;

    // --- Canvas Setup ---
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    // 1. Header
    ctx.font = "18px Tinos";
    ctx.fillText(startingLine, 400, 60);
    ctx.font = "bold italic 28px Tinos";
    ctx.fillText(inviter, 400, 110);
    ctx.font = "italic 18px Tinos";
    ctx.fillText(runningSentence, 400, 150);
    ctx.fillText(`${eventTypeRaw} of their beloved son`, 400, 180);

    // 2. Names Order Logic (Bride First for Wedding/Rukhsati)
    // First Name
    ctx.font = "bold 35px Tinos";
    ctx.fillText(brideName, 400, 240);
    ctx.font = "italic 18px Tinos";
    ctx.fillText(`d/o. ${brideFather}`, 400, 270);

    ctx.font = "italic 22px Tinos";
    ctx.fillText("With", 400, 310);

    // Second Name
    ctx.font = "bold 35px Tinos";
    ctx.fillText(groomName, 400, 360);
    ctx.font = "italic 18px Tinos";
    ctx.fillText(`s/o. ${groomFather}`, 400, 390);

    // 3. Date & Venue
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(150, 420); ctx.lineTo(650, 420); ctx.stroke();
    ctx.font = "bold 24px Tinos";
    ctx.fillText(`${datePrefix} ${dateValue}`, 400, 455);
    ctx.beginPath(); ctx.moveTo(150, 475); ctx.lineTo(650, 475); ctx.stroke();

    ctx.font = "italic 26px Tinos";
    ctx.fillText(`at ${venueName}`, 400, 530);
    ctx.font = "16px Tinos";
    ctx.fillText(address, 400, 560);

    // 4. Footer Section
    // RSVP (Left)
    ctx.textAlign = "left";
    ctx.font = "bold 18px Tinos";
    ctx.fillText(rsvpHeading + ":", 60, 640);
    ctx.font = "14px Tinos";
    const rsvpLines = rsvpNames.split('\n');
    rsvpLines.forEach((line, index) => {
        ctx.fillText(line, 60, 665 + (index * 22));
    });

    // Programme (Right) - All 4 Items
    ctx.textAlign = "right";
    ctx.font = "bold 18px Tinos";
    ctx.fillText("Programme", 740, 640);
    ctx.font = "14px Tinos";

    let yPos = 665;
    if (arrival) { ctx.fillText(`Arrival: ${arrival}`, 740, yPos); yPos += 25; }
    if (nikkah) { ctx.fillText(`Nikkah: ${nikkah}`, 740, yPos); yPos += 25; }
    if (dinner) { ctx.fillText(`Dinner: ${dinner}`, 740, yPos); yPos += 25; }
    if (rukhsati) { ctx.fillText(`Rukhsati: ${rukhsati}`, 740, yPos); yPos += 25; }

    // Show Output
    canvas.style.display = "block";
    document.getElementById('download-btns').style.display = "flex";
});

// --- Download JPG Logic ---
document.getElementById('downloadJPG').addEventListener('click', function () {
    const canvas = document.getElementById('weddingCardCanvas');

    // Check karein ke canvas par kuch draw hua bhi hai ya nahi
    if (canvas.style.display === "none") {
        alert("Pehly card generate karein!");
        return;
    }

    const link = document.createElement('a');
    link.download = 'Wedding-Card.jpg';
    // Image ki quality 1.0 (max) rakhi hai
    link.href = canvas.toDataURL('image/jpeg', 1.0);
    link.click();
});

// // --- Download PDF Logic ---
// document.getElementById('downloadPDF').addEventListener('click', function () {
//     const canvas = document.getElementById('weddingCardCanvas');

//     if (canvas.style.display === "none") {
//         alert("Pehly card generate karein!");
//         return;
//     }

//     // jsPDF library use karte hue
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF('p', 'mm', 'a4'); // A4 size page

//     const imgData = canvas.toDataURL('image/jpeg', 1.0);

//     // Image ko PDF mein center aur sahi size mein fit karna
//     // A4 width 210mm hoti hai, humne 190mm use kiya hai
//     doc.addImage(imgData, 'JPEG', 10, 10, 190, 190);
//     doc.save("Wedding-Card.pdf");
// });

// --- Editable SVG Download Logic ---
document.getElementById('downloadPDF').addEventListener('click', function () {
    // 1. Data Fetching aur "Special Characters" handle karna
    function clean(text) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    const startingLine = clean(document.getElementById('Starting-Line').value);
    const inviterPrefix = clean(document.getElementById('inviter-name').value);
    const inviterName = clean(document.getElementsByName('inviter-name')[1].value);
    const runningSentence = clean(document.getElementById('Running-Sentence').value);
    const eventType = clean(document.querySelector('input[name="first-radio-1"]:checked').nextElementSibling.innerText);

    const brideName = clean(document.getElementById('Bride-Name').value);
    const brideFather = clean(document.getElementById('Bride-Father-Name').value);
    const groomName = clean(document.getElementById('Groom-Name').value);
    const groomFather = clean(document.getElementById('Groom-Father-Name').value);

    const datePrefix = clean(document.querySelector('input[name="InshaAllahon"]:checked').nextElementSibling.innerText);
    const dateValue = clean(document.getElementById('dates').value);

    const venueName = clean(document.getElementById('LawnBanquetHotel').value);
    const address = clean(document.getElementById('adress').value);

    const rsvpHeading = clean(document.querySelector('input[name="R.S.V.P"]:checked').nextElementSibling.innerText);
    const rsvpContent = document.getElementById('Name').value.split('\n');

    const arrival = clean(document.getElementById('ArrivalofBarat').value);
    const nikkah = clean(document.getElementById('Nikkah').value);
    const dinner = clean(document.getElementById('Dinner').value);
    const rukh = clean(document.getElementById('Rukhsati').value);

    // 2. Dynamic Text Sections
    let rsvpSvgLines = "";
    rsvpContent.forEach((line, i) => {
        rsvpSvgLines += `<text x="60" y="${665 + (i * 22)}" font-family="Arial" font-size="14" fill="black">${clean(line)}</text>\n`;
    });

    let progY = 665;
    let progLines = "";
    if (arrival) { progLines += `<text x="740" y="${progY}" font-family="Arial" font-size="14" text-anchor="end">Arrival: ${arrival}</text>\n`; progY += 25; }
    if (nikkah) { progLines += `<text x="740" y="${progY}" font-family="Arial" font-size="14" text-anchor="end">Nikkah: ${nikkah}</text>\n`; progY += 25; }
    if (dinner) { progLines += `<text x="740" y="${progY}" font-family="Arial" font-size="14" text-anchor="end">Dinner: ${dinner}</text>\n`; progY += 25; }
    if (rukh) { progLines += `<text x="740" y="${progY}" font-family="Arial" font-size="14" text-anchor="end">Rukhsati: ${rukh}</text>\n`; progY += 25; }

    // 3. Complete Valid SVG String
    const svgData = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="800" fill="white" />
    <rect x="20" y="20" width="760" height="760" fill="none" stroke="black" stroke-width="1" />
    
    <text x="400" y="60" font-family="Arial" font-size="18" text-anchor="middle">${startingLine}</text>
    <text x="400" y="110" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">${inviterPrefix} ${inviterName}</text>
    <text x="400" y="150" font-family="Arial" font-size="18" text-anchor="middle">${runningSentence}</text>
    <text x="400" y="180" font-family="Arial" font-size="18" text-anchor="middle">${eventType} of their beloved son</text>

    <text x="400" y="240" font-family="Arial" font-size="35" font-weight="bold" text-anchor="middle">${brideName}</text>
    <text x="400" y="270" font-family="Arial" font-size="18" text-anchor="middle">d/o. ${brideFather}</text>
    
    <text x="400" y="310" font-family="Arial" font-size="22" text-anchor="middle">With</text>
    
    <text x="400" y="360" font-family="Arial" font-size="35" font-weight="bold" text-anchor="middle">${groomName}</text>
    <text x="400" y="390" font-family="Arial" font-size="18" text-anchor="middle">s/o. ${groomFather}</text>

    <line x1="150" y1="420" x2="650" y2="420" stroke="black" stroke-width="1" />
    <text x="400" y="455" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">${datePrefix} ${dateValue}</text>
    <line x1="150" y1="475" x2="650" y2="475" stroke="black" stroke-width="1" />

    <text x="400" y="530" font-family="Arial" font-size="26" text-anchor="middle">at ${venueName}</text>
    <text x="400" y="560" font-family="Arial" font-size="16" text-anchor="middle">${address}</text>

    <text x="60" y="640" font-family="Arial" font-size="18" font-weight="bold">${rsvpHeading}:</text>
    ${rsvpSvgLines}

    <text x="740" y="640" font-family="Arial" font-size="18" font-weight="bold" text-anchor="end">Programme</text>
    ${progLines}
</svg>`;

    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Wedding-Card-Editable.svg';
    link.click();
});