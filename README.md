# Portfolio Website

Web portfolio modern dan profesional dengan desain minimalis dan warna netral.

## Fitur

- **Home**: Hero section dengan animasi typing effect dan animasi masuk
- **About**: Halaman tentang dengan skill tags dan layout profesional
- **Projects**: Grid layout untuk menampilkan project dengan hover effects
- **Contact**: Form kontak elegan dengan validasi dan notifikasi
- **Responsive Design**: Optimal untuk desktop, tablet, dan mobile
- **Smooth Animations**: Scroll animations dan transisi halus
- **Modern UI**: Desain minimalis dengan warna netral

## Teknologi

- HTML5
- CSS3 dengan CSS Grid dan Flexbox
- Vanilla JavaScript (ES6+)
- Font Awesome untuk icons
- Google Fonts (Inter)

## Struktur File

```
Porto_Pkl/
|-- index.html          # Halaman utama
|-- styles.css          # Stylesheet utama
|-- script.js           # JavaScript untuk interaktivitas
|-- README.md           # Dokumentasi
```

## Cara Menggunakan

1. Buka file `index.html` di browser
2. Atau jalankan dengan live server untuk pengalaman terbaik

## Kustomisasi

### Mengubah Informasi Personal

Edit file `index.html`:

- **Nama**: Ubah teks di dalam `<span class="name typing-text"></span>` di script.js
- **Kontak**: Update email, phone, dan social links di section Contact
- **Project**: Ganti informasi project di section Projects
- **Skills**: Update skill tags di section About

### Mengubah Warna

Edit file `styles.css` di bagian `:root`:

```css
:root {
    --primary-color: #2c3e50;      /* Warna utama */
    --secondary-color: #34495e;    /* Warna sekunder */
    --accent-color: #3498db;       /* Warna aksen */
    --text-primary: #2c3e50;       /* Warna teks utama */
    --text-secondary: #7f8c8d;     /* Warna teks sekunder */
    --background: #ffffff;         /* Warna background */
    --background-alt: #f8f9fa;     /* Warna background alternatif */
}
```

### Menambahkan Project Baru

Tambahkan HTML berikut di dalam `.projects-grid`:

```html
<div class="project-card animate-on-scroll">
    <div class="project-image">
        <div class="placeholder-project">
            <i class="fas fa-[icon]"></i>
        </div>
    </div>
    <div class="project-content">
        <h3>Nama Project</h3>
        <p>Deskripsi project Anda</p>
        <div class="project-tech">
            <span>Tech 1</span>
            <span>Tech 2</span>
            <span>Tech 3</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a href="#" class="project-link">
                <i class="fab fa-github"></i> GitHub
            </a>
        </div>
    </div>
</div>
```

## Animasi

### Typing Effect

Efek mengetik otomatis di home section dapat dikustomisasi di `script.js`:

```javascript
const textArray = ['John Doe', 'Full Stack Developer', 'UI/UX Designer'];
```

### Scroll Animations

Animasi muncul saat scroll menggunakan Intersection Observer. Elemen dengan class `animate-on-scroll` akan otomatis mendapatkan animasi.

## Responsive Breakpoints

- Desktop: > 768px
- Tablet: 768px - 480px
- Mobile: < 480px

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Catatan

- Web portfolio ini menggunakan warna netral dan desain minimalis sesuai permintaan
- Semua animasi smooth dan tidak berlebihan
- Form kontak memiliki validasi basic dan notifikasi user-friendly
- Images menggunakan placeholder dengan Font Awesome icons
- Fully responsive dan optimal di semua device

## Future Improvements

- Integration dengan backend untuk form submission
- Dark mode toggle
- Loading states yang lebih baik
- SEO optimization
- Performance optimization dengan lazy loading
