// --- Special Characters Handling for Illustrator ---
function clean(text) {
    if (!text) return "";
    return text.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

const mainFont = "Monotype Corsiva";

document.querySelector('.field-group').addEventListener('submit', function (e) {
    e.preventDefault();

    const canvas = document.getElementById('weddingCardCanvas');
    const ctx = canvas.getContext('2d');

    // Size: 468x612
    canvas.width = 468;
    canvas.height = 612;
    const centerX = canvas.width / 2;

    // --- Data Extraction ---
    const startingLine = document.getElementById('Starting-Line').value;
    const inviterPrefix = document.getElementById('inviter-name').value;
    const inviterName = document.getElementsByName('inviter-name')[1].value;
    const runningSentence = document.getElementById('Running-Sentence').value;
    const eventTypeRaw = document.querySelector('input[name="first-radio-1"]:checked').nextElementSibling.innerText;

    const brideName = document.getElementById('Bride-Name').value;
    const brideFather = document.getElementById('Bride-Father-Name').value;
    const groomName = document.getElementById('Groom-Name').value;
    const groomFather = document.getElementById('Groom-Father-Name').value;

    const datePrefix = document.querySelector('input[name="InshaAllahon"]:checked').nextElementSibling.innerText;
    const dateValue = document.getElementById('dates').value;

    const venueName = document.getElementById('LawnBanquetHotel').value;
    const address = document.getElementById('adress').value;

    const rsvpHeading = document.querySelector('input[name="R.S.V.P"]:checked').nextElementSibling.innerText;
    const rsvpNames = document.getElementById('Name').value;

    const arrival = document.getElementById('ArrivalofBarat').value;
    const nikkah = document.getElementById('Nikkah').value;
    const dinner = document.getElementById('Dinner').value;
    const rukhsati = document.getElementById('Rukhsati').value;

    // --- Pronoun Logic ---
    let pronoun = (inviterPrefix === "Mr.") ? "his" : (inviterPrefix === "Mrs.") ? "her" : "their";

    // --- Drawing ---
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    // 1. Header (Tightened spacing)
    ctx.font = `16px ${mainFont}`;
    ctx.fillText(startingLine, centerX, 35);
    ctx.font = `bold 22px ${mainFont}`;
    ctx.fillText(`${inviterPrefix} ${inviterName}`, centerX, 65);
    ctx.font = `18px ${mainFont}`;
    ctx.fillText(runningSentence, centerX, 90);
    ctx.font = `bold 20px ${mainFont}`;
    ctx.fillText(eventTypeRaw, centerX, 115);
    ctx.font = `18px ${mainFont}`;
    ctx.fillText(`of ${pronoun} beloved daughter`, centerX, 138);

    // 2. Names Section
    ctx.font = `bold 30px ${mainFont}`;
    ctx.fillText(brideName, centerX, 185);
    ctx.font = `18px ${mainFont}`;
    ctx.fillText(`D/o. ${brideFather}`, centerX, 208);
    ctx.font = `italic 20px ${mainFont}`;
    ctx.fillText("With", centerX, 240);
    ctx.font = `bold 30px ${mainFont}`;
    ctx.fillText(groomName, centerX, 285);
    ctx.font = `18px ${mainFont}`;
    ctx.fillText(`S/o. ${groomFather}`, centerX, 308);

    // 3. Date & Venue (Moved up to save space)
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(60, 330); ctx.lineTo(408, 330); ctx.stroke();
    ctx.font = `bold 20px ${mainFont}`;
    ctx.fillText(`${datePrefix} ${dateValue}`, centerX, 355);
    ctx.beginPath(); ctx.moveTo(60, 375); ctx.lineTo(408, 375); ctx.stroke();

    ctx.font = `bold 22px ${mainFont}`;
    ctx.fillText(`at ${venueName}`, centerX, 410);
    ctx.font = `14px ${mainFont}`;
    ctx.fillText(address, centerX, 430);

    // --- 4. Footer (RSVP & Programme) Adjusted for fitting ---
    const footerY = 475; // Shuruat upar se

    // RSVP
    ctx.textAlign = "left";
    ctx.font = `bold 18px ${mainFont}`;
    ctx.fillText(rsvpHeading + ":", 35, footerY);
    ctx.font = `15px ${mainFont}`;
    const rsvpLines = rsvpNames.split('\n');
    rsvpLines.forEach((line, index) => {
        ctx.fillText(line, 35, (footerY + 25) + (index * 20));
    });

    // Programme (Heading Center, List Left)
    ctx.textAlign = "center";
    ctx.font = `bold 18px ${mainFont}`;
    ctx.fillText("Programme", 355, footerY);

    ctx.textAlign = "left";
    ctx.font = `15px ${mainFont}`;
    let progY = footerY + 25;
    const progLeftMargin = 300;
    const gap = 20; // Chota gap taake fit aa jaye

    if (arrival) { ctx.fillText(`Arrival: ${arrival}`, progLeftMargin, progY); progY += gap; }
    if (nikkah) { ctx.fillText(`Nikkah: ${nikkah}`, progLeftMargin, progY); progY += gap; }
    if (dinner) { ctx.fillText(`Dinner: ${dinner}`, progLeftMargin, progY); progY += gap; }
    if (rukhsati) { ctx.fillText(`Rukhsati: ${rukhsati}`, progLeftMargin, progY); progY += gap; }

    // Final Reset
    ctx.textAlign = "center";
    canvas.style.display = "block";
    document.getElementById('download-btns').style.display = "flex";
});

// --- Download JPG ---
document.getElementById('downloadJPG').addEventListener('click', function () {
    const canvas = document.getElementById('weddingCardCanvas');
    const link = document.createElement('a');
    link.download = 'Wedding-Card.jpg';
    link.href = canvas.toDataURL('image/jpeg', 1.0);
    link.click();
});

// --- Complete SVG Download (Illustrator Fix) ---
document.getElementById('downloadPDF').addEventListener('click', function () {
    // 1. All Data Extraction for SVG
    const sLine = clean(document.getElementById('Starting-Line').value);
    const iPre = clean(document.getElementById('inviter-name').value);
    const iName = clean(document.getElementsByName('inviter-name')[1].value);
    const rSent = clean(document.getElementById('Running-Sentence').value);
    const eType = clean(document.querySelector('input[name="first-radio-1"]:checked').nextElementSibling.innerText);
    const bName = clean(document.getElementById('Bride-Name').value);
    const bFather = clean(document.getElementById('Bride-Father-Name').value);
    const gName = clean(document.getElementById('Groom-Name').value);
    const gFather = clean(document.getElementById('Groom-Father-Name').value);
    const dPre = clean(document.querySelector('input[name="InshaAllahon"]:checked').nextElementSibling.innerText);
    const dVal = clean(document.getElementById('dates').value);
    const venue = clean(document.getElementById('LawnBanquetHotel').value);
    const addr = clean(document.getElementById('adress').value);
    const rsvpHead = clean(document.querySelector('input[name="R.S.V.P"]:checked').nextElementSibling.innerText);

    const arrival = clean(document.getElementById('ArrivalofBarat').value);
    const nikkah = clean(document.getElementById('Nikkah').value);
    const dinner = clean(document.getElementById('Dinner').value);
    const rukh = clean(document.getElementById('Rukhsati').value);

    let pronoun = (iPre === "Mr.") ? "his" : (iPre === "Mrs.") ? "her" : "their";

    // 2. RSVP Loop for SVG
    const rsvpLines = document.getElementById('Name').value.split('\n');
    let rsvpSvgText = "";
    rsvpLines.forEach((line, i) => {
        rsvpSvgText += `<text x="35" y="${500 + (i * 20)}" font-family="Monotype Corsiva" font-size="15" fill="black">${clean(line)}</text>\n`;
    });

    // 3. Programme Loop for SVG
    let progSvgText = "";
    let pY = 500;
    if (arrival) { progSvgText += `<text x="300" y="${pY}" font-family="Monotype Corsiva" font-size="15" fill="black">Arrival: ${arrival}</text>\n`; pY += 20; }
    if (nikkah) { progSvgText += `<text x="300" y="${pY}" font-family="Monotype Corsiva" font-size="15" fill="black">Nikkah: ${nikkah}</text>\n`; pY += 20; }
    if (dinner) { progSvgText += `<text x="300" y="${pY}" font-family="Monotype Corsiva" font-size="15" fill="black">Dinner: ${dinner}</text>\n`; pY += 20; }
    if (rukh) { progSvgText += `<text x="300" y="${pY}" font-family="Monotype Corsiva" font-size="15" fill="black">Rukhsati: ${rukh}</text>\n`; pY += 20; }

    // 4. Final SVG Assembly
    const svg = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="468" height="612" viewBox="0 0 468 612">
    <rect width="468" height="612" fill="#FFFFFF"/>
    
    <text x="234" y="35" font-family="Monotype Corsiva" font-size="16" text-anchor="middle" fill="black">${sLine}</text>
    <text x="234" y="65" font-family="Monotype Corsiva" font-size="22" font-weight="bold" text-anchor="middle" fill="black">${iPre} ${iName}</text>
    <text x="234" y="90" font-family="Monotype Corsiva" font-size="18" text-anchor="middle" fill="black">${rSent}</text>
    <text x="234" y="115" font-family="Monotype Corsiva" font-size="20" font-weight="bold" text-anchor="middle" fill="black">${eType}</text>
    <text x="234" y="138" font-family="Monotype Corsiva" font-size="18" text-anchor="middle" fill="black">of ${pronoun} beloved daughter</text>
    
    <text x="234" y="185" font-family="Monotype Corsiva" font-size="30" font-weight="bold" text-anchor="middle" fill="black">${bName}</text>
    <text x="234" y="208" font-family="Monotype Corsiva" font-size="18" text-anchor="middle" fill="black">D/o. ${bFather}</text>
    <text x="234" y="240" font-family="Monotype Corsiva" font-size="20" font-style="italic" text-anchor="middle" fill="black">With</text>
    <text x="234" y="285" font-family="Monotype Corsiva" font-size="30" font-weight="bold" text-anchor="middle" fill="black">${gName}</text>
    <text x="234" y="308" font-family="Monotype Corsiva" font-size="18" text-anchor="middle" fill="black">S/o. ${gFather}</text>

    <line x1="60" y1="330" x2="408" y2="330" stroke="black" stroke-width="1"/>
    <text x="234" y="355" font-family="Monotype Corsiva" font-size="20" font-weight="bold" text-anchor="middle" fill="black">${dPre} ${dVal}</text>
    <line x1="60" y1="375" x2="408" y2="375" stroke="black" stroke-width="1"/>
    <text x="234" y="410" font-family="Monotype Corsiva" font-size="22" font-weight="bold" text-anchor="middle" fill="black">at ${venue}</text>
    <text x="234" y="430" font-family="Monotype Corsiva" font-size="14" text-anchor="middle" fill="black">${addr}</text>

    <text x="35" y="475" font-family="Monotype Corsiva" font-size="18" font-weight="bold" fill="black">${rsvpHead}:</text>
    ${rsvpSvgText}
    
    <text x="355" y="475" font-family="Monotype Corsiva" font-size="18" font-weight="bold" text-anchor="middle" fill="black">Programme</text>
    ${progSvgText}
</svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding-card-full.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});