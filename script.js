// --- Tab functionality ---
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        // Add active
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// --- WebP to JPG converter ---
function convertWebP() {
    const input = document.getElementById('webpInput').files[0];
    if (!input) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const link = document.getElementById('downloadLink');
                link.href = url;
                link.download = input.name.replace('.webp','.jpg');
                link.style.display = 'inline';
            }, 'image/jpeg');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(input);
}

// --- Secret ASTOP in About Us ---
let keysPressed = new Set();
document.addEventListener('keydown', (e) => {
    keysPressed.add(e.key.toUpperCase());
    const secretCombo = ['A','S','T','O','P'];

    // Only trigger if About tab is active
    const aboutTab = document.getElementById('about');
    if (!aboutTab.classList.contains('active')) return;

    if (secretCombo.every(k => keysPressed.has(k))) {
        // Check code: day + hour + month
        const now = new Date();
        const dd = String(now.getDate()).padStart(2,'0');
        const mm = String(now.getMonth()+1).padStart(2,'0');
        const hh = String(now.getHours()).padStart(2,'0');
        const code = dd + hh + mm;

        // Prompt for code (or input hidden)
        const userCode = prompt("Enter code:");
        if(userCode === code){
            // Hide entire portal
            document.getElementById('portal').style.display = 'none';
        }
        keysPressed.clear();
    }
});

document.addEventListener('keyup', (e) => {
    keysPressed.delete(e.key.toUpperCase());
});
