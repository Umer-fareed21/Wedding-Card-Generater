// --- Special Characters Handling ---
function clean(text) {
    if (!text) return "";
    return text.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

window.onload = function () {
    const btn = document.getElementById('submit');
    if (btn) btn.value = "Generate";
};

// --- Font Combos Definition ---
const fontCombos = {
    combo1: { main: "Great Vibes", detail: "serif" },
    combo2: { main: "Playfair Display", detail: "Montserrat" },
    combo3: { main: "Cinzel", detail: "Trajan Pro" },
    combo4: { main: "Alex Brush", detail: "Monotype Corsiva" },
    combo5: { main: "Candlescript Demo Version", detail: "Monotype Corsiva" }
};

// --- Main Function to Draw Card ---
async function drawCard() {
    const canvas = document.getElementById('weddingCardCanvas');
    const ctx = canvas.getContext('2d');

    const selectedComboKey = document.getElementById('font-combo-style').value;
    const fonts = fontCombos[selectedComboKey];
    
    // --- FIX: Wait for fonts to load before drawing ---
    try {
        await document.fonts.load(`12px "${fonts.main}"`);
        await document.fonts.load(`12px "${fonts.detail}"`);
    } catch (e) {
        console.log("Font loading failed, using fallback.");
    }

    const mainFont = fonts.main;
    const detailFont = fonts.detail;

    canvas.width = 468;
    canvas.height = 612;
    const centerX = canvas.width / 2;

    // Data Extraction
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
    const rukh = document.getElementById('Rukhsati').value;

    let pronoun = (inviterPrefix === "Mr.") ? "his" : (inviterPrefix === "Mrs.") ? "her" : "their";

    // Clear and Draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    ctx.font = `12px ${detailFont}`;
    ctx.fillText(startingLine, centerX, 35);
    
    ctx.font = `bold 20px ${mainFont}`;
    ctx.fillText(`${inviterPrefix} ${inviterName}`, centerX, 65);
    
    ctx.font = `16px ${detailFont}`;
    ctx.fillText(runningSentence, centerX, 90);
    
    ctx.font = `bold 22px ${mainFont}`;
    ctx.fillText(eventTypeRaw, centerX, 115);
    
    ctx.font = `italic 16px ${detailFont}`;
    ctx.fillText(`of ${pronoun} beloved daughter`, centerX, 138);

    ctx.font = `bold 38px ${mainFont}`;
    ctx.fillText(brideName, centerX, 185);
    ctx.font = `15px ${detailFont}`;
    ctx.fillText(`D/o. ${brideFather}`, centerX, 208);
    
    ctx.font = `italic 22px ${mainFont}`;
    ctx.fillText("With", centerX, 240);
    
    ctx.font = `bold 38px ${mainFont}`;
    ctx.fillText(groomName, centerX, 285);
    ctx.font = `15px ${detailFont}`;
    ctx.fillText(`S/o. ${groomFather}`, centerX, 308);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ccc";
    ctx.beginPath(); ctx.moveTo(60, 330); ctx.lineTo(408, 330); ctx.stroke();
    
    ctx.font = `bold 18px ${detailFont}`;
    ctx.fillText(`${datePrefix} ${dateValue}`, centerX, 355);
    
    ctx.beginPath(); ctx.moveTo(60, 375); ctx.lineTo(408, 375); ctx.stroke();

    ctx.font = `bold 22px ${mainFont}`;
    ctx.fillText(`at ${venueName}`, centerX, 410);
    ctx.font = `13px ${detailFont}`;
    ctx.fillText(address, centerX, 430);

    const footerY = 475;
    ctx.textAlign = "left";
    ctx.font = `bold 16px ${detailFont}`;
    ctx.fillText(rsvpHeading + ":", 35, footerY);
    ctx.font = `14px ${detailFont}`;
    const rsvpLines = rsvpNames.split('\n');
    rsvpLines.forEach((line, index) => {
        ctx.fillText(line, 35, (footerY + 25) + (index * 20));
    });

    ctx.textAlign = "center";
    ctx.font = `bold 16px ${detailFont}`;
    ctx.fillText("Programme", 355, footerY);

    ctx.textAlign = "left";
    ctx.font = `14px ${detailFont}`;
    let progY = footerY + 25;
    if (arrival) { ctx.fillText(`Arrival: ${arrival}`, 300, progY); progY += 20; }
    if (nikkah) { ctx.fillText(`Nikkah: ${nikkah}`, 300, progY); progY += 20; }
    if (dinner) { ctx.fillText(`Dinner: ${dinner}`, 300, progY); progY += 20; }
    if (rukh) { ctx.fillText(`Rukhsati: ${rukh}`, 300, progY); progY += 20; }

    canvas.style.display = "block";
    document.getElementById('download-btns').style.display = "flex";
}

// Submit listener
document.querySelector('.field-group').addEventListener('submit', function (e) {
    e.preventDefault();
    drawCard();
});

// Download JPG
document.getElementById('downloadJPG').addEventListener('click', function () {
    const canvas = document.getElementById('weddingCardCanvas');
    const link = document.createElement('a');
    link.download = 'Wedding-Card.jpg';
    link.href = canvas.toDataURL('image/jpeg', 1.0);
    link.click();
});

// Download SVG
document.getElementById('downloadPDF').addEventListener('click', function () {
    const selectedComboKey = document.getElementById('font-combo-style').value;
    const fonts = fontCombos[selectedComboKey];
    
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

    const rsvpLines = document.getElementById('Name').value.split('\n');
    let rsvpSvgText = "";
    rsvpLines.forEach((line, i) => {
        rsvpSvgText += `<text x="35" y="${500 + (i * 20)}" font-family="${fonts.detail}" font-size="14" fill="black">${clean(line)}</text>\n`;
    });

    let progSvgText = "";
    let pY = 500;
    if (arrival) { progSvgText += `<text x="300" y="${pY}" font-family="${fonts.detail}" font-size="14" fill="black">Arrival: ${arrival}</text>\n`; pY += 20; }
    if (nikkah) { progSvgText += `<text x="300" y="${pY}" font-family="${fonts.detail}" font-size="14" fill="black">Nikkah: ${nikkah}</text>\n`; pY += 20; }
    if (dinner) { progSvgText += `<text x="300" y="${pY}" font-family="${fonts.detail}" font-size="14" fill="black">Dinner: ${dinner}</text>\n`; pY += 20; }
    if (rukh) { progSvgText += `<text x="300" y="${pY}" font-family="${fonts.detail}" font-size="14" fill="black">Rukhsati: ${rukh}</text>\n`; pY += 20; }

    const svg = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="468" height="612" viewBox="0 0 468 612">
    <rect width="468" height="612" fill="#FFFFFF"/>
    <text x="234" y="35" font-family="${fonts.detail}" font-size="14" text-anchor="middle" fill="black">${sLine}</text>
    <text x="234" y="65" font-family="${fonts.main}" font-size="24" font-weight="bold" text-anchor="middle" fill="black">${iPre} ${iName}</text>
    <text x="234" y="90" font-family="${fonts.detail}" font-size="16" text-anchor="middle" fill="black">${rSent}</text>
    <text x="234" y="115" font-family="${fonts.main}" font-size="22" font-weight="bold" text-anchor="middle" fill="black">${eType}</text>
    <text x="234" y="138" font-family="${fonts.detail}" font-size="16" text-anchor="middle" fill="black">of ${pronoun} beloved daughter</text>
    <text x="234" y="185" font-family="${fonts.main}" font-size="38" font-weight="bold" text-anchor="middle" fill="black">${bName}</text>
    <text x="234" y="208" font-family="${fonts.detail}" font-size="15" text-anchor="middle" fill="black">D/o. ${bFather}</text>
    <text x="234" y="240" font-family="${fonts.main}" font-size="22" font-style="italic" text-anchor="middle" fill="black">With</text>
    <text x="234" y="285" font-family="${fonts.main}" font-size="38" font-weight="bold" text-anchor="middle" fill="black">${gName}</text>
    <text x="234" y="308" font-family="${fonts.detail}" font-size="15" text-anchor="middle" fill="black">S/o. ${gFather}</text>
    <line x1="60" y1="330" x2="408" y2="330" stroke="#ccc" stroke-width="1"/>
    <text x="234" y="355" font-family="${fonts.detail}" font-size="18" font-weight="bold" text-anchor="middle" fill="black">${dPre} ${dVal}</text>
    <line x1="60" y1="375" x2="408" y2="375" stroke="#ccc" stroke-width="1"/>
    <text x="234" y="410" font-family="${fonts.main}" font-size="22" font-weight="bold" text-anchor="middle" fill="black">at ${venue}</text>
    <text x="234" y="430" font-family="${fonts.detail}" font-size="13" text-anchor="middle" fill="black">${addr}</text>
    <text x="35" y="475" font-family="${fonts.detail}" font-size="16" font-weight="bold" fill="black">${rsvpHead}:</text>
    ${rsvpSvgText}
    <text x="355" y="475" font-family="${fonts.detail}" font-size="16" font-weight="bold" text-anchor="middle" fill="black">Programme</text>
    ${progSvgText}
</svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding-card-styled.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});