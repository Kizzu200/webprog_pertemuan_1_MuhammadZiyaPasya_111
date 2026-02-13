// ========================================
// Dark Mode Toggle Implementation
// ========================================

// Fungsi untuk menginisialisasi tema
function initializeTheme() {
    // Cek apakah ada preferensi tema yang tersimpan di localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Jika ada tema yang tersimpan, gunakan tema tersebut
    // Jika tidak, gunakan tema light sebagai default
    const theme = savedTheme || 'light';
    
    // Set tema ke document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Log untuk debugging (optional)
    console.log('Tema aktif:', theme);
}

// Fungsi untuk toggle (mengganti) tema
function toggleTheme() {
    // Ambil tema yang sedang aktif
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Tentukan tema baru (jika light maka dark, jika dark maka light)
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Set tema baru ke document
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Simpan preferensi tema ke localStorage
    // Sehingga tema akan tetap sama saat user refresh halaman
    localStorage.setItem('theme', newTheme);
    
    // Log untuk debugging (optional)
    console.log('Tema diganti ke:', newTheme);
}

// Event listener untuk tombol toggle theme
const themeToggleButton = document.getElementById('themeToggle');

if (themeToggleButton) {
    // Tambahkan event listener untuk click event
    themeToggleButton.addEventListener('click', toggleTheme);
}

// Inisialisasi tema saat halaman dimuat
initializeTheme();

// ========================================
// Smooth Scroll Enhancement (Optional)
// ========================================

// Menambahkan smooth scroll behavior untuk semua link anchor
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Ambil target ID dari href
        const targetId = this.getAttribute('href');
        
        // Jika target adalah '#' saja, skip
        if (targetId === '#') return;
        
        // Cari elemen target
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Prevent default behavior
            e.preventDefault();
            
            // Scroll ke target dengan smooth animation
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Active Navigation Link Highlight
// ========================================

// Fungsi untuk highlight link navigasi yang sedang aktif
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Get current scroll position
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Cek apakah posisi scroll berada di dalam section ini
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Hapus class active dari semua nav links
            navLinks.forEach(link => {
                link.style.color = '';
            });
            
            // Tambahkan highlight ke nav link yang sesuai
            const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.style.color = 'var(--accent)';
            }
        }
    });
}

// Jalankan fungsi saat scroll
window.addEventListener('scroll', highlightActiveNavLink);

// Jalankan sekali saat halaman dimuat
highlightActiveNavLink();

// ========================================
// Optional: Add scroll reveal animation
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards dan skill categories
const animateElements = document.querySelectorAll('.project-card, .skill-category, .contact-item');

animateElements.forEach(element => {
    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Start observing
    observer.observe(element);
});