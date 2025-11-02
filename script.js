// --- 1. Ambil Nama Tamu dari URL ---
// Contoh URL: index.html?to=Bapak+Budi
function getGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    let name = urlParams.get('to');
    
    // Ganti '+' dengan spasi jika ada di URL
    if (name) {
        name = name.replace(/\+/g, ' ');
    } else {
        name = 'Keluarga & Kerabat'; // Default jika tidak ada nama di URL
    }
    
    const guestNameElement = document.getElementById('guest-name');
    if (guestNameElement) {
        guestNameElement.textContent = name;
    }
}
getGuestName();


// --- 2. Buka Undangan & Putar Musik ---
const coverPage = document.getElementById('cover-page');
const mainContent = document.getElementById('main-content');
const openInvitationBtn = document.getElementById('open-invitation-btn');
const backgroundMusic = document.getElementById('background-music');

openInvitationBtn.addEventListener('click', function() {
    coverPage.classList.add('hidden');
    mainContent.classList.remove('hidden');
    document.body.style.overflowY = 'scroll'; // Aktifkan scroll
    
    // Putar musik (Autoplay mungkin diblokir, jadi putar di sini)
    backgroundMusic.play().catch(e => {
        console.log("Musik gagal diputar: ", e);
    });
});


// --- 3. Countdown Timer ---
// GANTI TANGGAL DI BAWAH INI DENGAN FORMAT YYYY-MM-DDTHH:MM:SS
const eventDate = new Date('2030-05-10T11:00:00').getTime(); 
const countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Perhitungan waktu
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Tampilkan hasil di HTML
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Jika hitungan mundur selesai
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}
updateCountdown();


// --- 4. Observer untuk Animasi Scroll ---
const sections = document.querySelectorAll('.fade-in-scroll');

const observerOptions = {
    root: null, // viewport
    threshold: 0.1 // 10% dari section terlihat
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // observer.unobserve(entry.target); // Hapus jika hanya ingin animasi sekali
        } else {
             entry.target.classList.remove('visible'); // Tambahkan jika ingin animasi berulang
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// --- 5. Logika Navbar Active State ---
const navLinks = document.querySelectorAll('.navbar a');

const navObserverOptions = {
    root: null, 
    threshold: 0.5 // 50% dari section terlihat
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Hapus kelas 'active' dari semua link
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Tambahkan kelas 'active' ke link yang sesuai
            const targetId = entry.target.id;
            const activeLink = document.querySelector(`.navbar a[href="#${targetId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, navObserverOptions);

sections.forEach(section => {
    navObserver.observe(section);
});

// --- 6. Logika Tombol Salin (Copy) ---
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-clipboard-text');
        
        // Gunakan API Clipboard modern
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = this.textContent;
            this.textContent = 'Tersalin!';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 1500);
        }).catch(err => {
            console.error('Gagal menyalin: ', err);
            alert('Gagal menyalin, silakan salin manual: ' + textToCopy);
        });
    });
});