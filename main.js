(() => {
  const TOTAL_FRAMES = 234;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderText = document.getElementById('loaderText');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  // Video Vault DOM elements
  const videoVaultGrid = document.getElementById('videoVaultGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const localVideoUpload = document.getElementById('localVideoUpload');

  // Cinema Modal DOM elements
  const cinemaModal = document.getElementById('cinemaModal');
  const cinemaBackdrop = document.getElementById('cinemaBackdrop');
  const cinemaCloseBtn = document.getElementById('cinemaCloseBtn');
  const cinemaVideo = document.getElementById('cinemaVideo');
  const cinemaGalleryBox = document.getElementById('cinemaGalleryBox');
  const cinemaGalleryImg = document.getElementById('cinemaGalleryImg');
  const galleryPrevBtn = document.getElementById('galleryPrevBtn');
  const galleryNextBtn = document.getElementById('galleryNextBtn');
  const galleryCounter = document.getElementById('galleryCounter');
  const galleryThumbStrip = document.getElementById('galleryThumbStrip');
  const cinemaTitle = document.getElementById('cinemaTitle');
  const cinemaDesc = document.getElementById('cinemaDesc');
  const cinemaCategory = document.getElementById('cinemaCategory');
  const cinemaYear = document.getElementById('cinemaYear');
  const cinemaClient = document.getElementById('cinemaClient');
  const cinemaTags = document.getElementById('cinemaTags');

  let currentModalProject = null;
  let currentGalleryIndex = 0;

  // Background Display Mode elements
  const toggleBgModeBtn = document.getElementById('toggleBgModeBtn');
  const bgModeText = document.getElementById('bgModeText');
  let bgMode = localStorage.getItem('porto_bg_mode') || 'seamless'; // 'seamless' or 'cover'

  // -------------------------------------------------------------
  // PROJECT VAULT DATA REPOSITORY
  // Menampilkan arsip foto berurutan & video cuplikan projek nyata
  // -------------------------------------------------------------
  const PROJECT_VAULT = [
    {
      id: 'proj-travelos',
      title: 'TravelOS — Smart Journey 3D Platform',
      category: 'fullstack',
      categoryLabel: 'DESKTOP & FULLSTACK',
      mediaType: 'gallery',
      images: [
        'assets/videos/TravelOS/1.jpeg',
        'assets/videos/TravelOS/2.jpeg',
        'assets/videos/TravelOS/3.jpeg',
        'assets/videos/TravelOS/4.jpeg',
        'assets/videos/TravelOS/5.jpeg'
      ],
      imageLabels: [
        '1. Beranda — Komparasi Tiket & Perencanaan Liburan 3D',
        '2. Hasil Pencarian Rute & Banding Harga Tiket (KAI, Tiket.com, Traveloka)',
        '3. Form Rencana Liburan, Tanggal & Kalkulasi Budget Harian',
        '4. Visual Itinerary Hari Ke-1 (Akomodasi & Kuliner Otentik)',
        '5. Detail Destinasi Lanjutan (Wisata Budaya & Spot Estetika)'
      ],
      quality: 'HD / 5 FOTO',
      client: 'Self-Hosted Privacy-First Ecosystem',
      year: '2026',
      role: 'Fullstack Engineer & UI/UX Designer',
      desc: 'Aplikasi pembanding harga tiket perjalanan all-in-one yang melacak berbagai platform untuk menyajikan penawaran transportasi (pesawat & kereta api) termurah secara real-time. Selain agregasi harga tiket, platform ini dilengkapi fitur rekomendasi pintar untuk destinasi wisata, wisata kuliner, hingga akomodasi penginapan terkurasi dalam satu antarmuka visual yang interaktif.',
      tags: ['Next.js', 'React', 'Python Scraper', 'Playwright', 'SQLite', 'Ollama Local AI', 'TailwindCSS']
    },
    {
      id: 'proj-btn-infra',
      title: 'IT Support & Network Infrastructure — PT. Bank Tabungan Negara',
      category: 'infra',
      categoryLabel: 'IT SUPPORT & INFRA',
      mediaType: 'gallery',
      images: [
        'assets/videos/IT Support PT. Bank Tabungan Negara/1.png',
        'assets/videos/IT Support PT. Bank Tabungan Negara/2.jpeg',
        'assets/videos/IT Support PT. Bank Tabungan Negara/3.jpeg',
        'assets/videos/IT Support PT. Bank Tabungan Negara/4.jpeg',
        'assets/videos/IT Support PT. Bank Tabungan Negara/5.jpeg',
        'assets/videos/IT Support PT. Bank Tabungan Negara/6.jpeg'
      ],
      imageLabels: [
        '1. Foto Dokumentasi Kerja IT Support di PT. Bank Tabungan Negara',
        '2. Manajemen Rak Server, Switch Jaringan & Penataan Kabel LAN',
        '3. Deployment Workstation & Penataan Perangkat PC Kantor Cabang',
        '4. Troubleshooting Jaringan & Diagnosa Sistem via Windows CMD',
        '5. Verifikasi IP Jaringan & Konfigurasi Adapter Wi-Fi/LAN',
        '6. Monitoring Operasional Sistem & Kebijakan Internal Perbankan'
      ],
      quality: 'REAL WORK / 6 FOTO',
      client: 'PT. Bank Tabungan Negara (Persero) Tbk',
      year: '2026',
      role: 'IT Support Specialist',
      desc: 'Pemeliharaan dan dukungan infrastruktur teknologi perbankan: penataan rak server dan switch LAN, troubleshooting hardware & network, deployment workstation karyawan, serta monitoring keamanan sistem operasional harian.',
      tags: ['Network Troubleshooting', 'LAN / Switch Routing', 'Server Rack Cabling', 'Windows CMD', 'System Security', 'Hardware Diagnostics']
    },
    {
      id: 'proj-web-toko-bunga',
      title: 'Amora Craft House — Web Toko Bunga, Admin & Owner Dashboard',
      category: 'fullstack',
      categoryLabel: 'FULLSTACK & E-COMMERCE',
      mediaType: 'gallery',
      images: [
        'assets/videos/vendor/1.jpeg',
        'assets/videos/vendor/2.jpeg',
        'assets/videos/vendor/3.jpeg',
        'assets/videos/vendor/4.jpeg',
        'assets/videos/vendor/5.jpeg',
        'assets/videos/vendor/6.jpeg'
      ],
      imageLabels: [
        '1. Portal Login Admin & Owner — Akses Autentikasi Terenkripsi & RLS',
        '2. Menu Utama Admin — Dashboard, Pesanan, Produk, Absensi & Analitik',
        '3. Panel Owner Monitoring — Ringkasan Realtime, Audit Trail Live & Deteksi Fraud',
        '4. Website Toko Bunga — Halaman Utama E-Commerce Florist Amora ("Where Beauty Blooms Eternal")',
        '5. Our Heritage — Storytelling & Filosofi Perjalanan Florist Romantis',
        '6. Form Checkout Pemesanan — Multi-Metode Pembayaran (BCA, Mandiri, E-Wallet, COD)'
      ],
      quality: 'FULLSTACK / 6 FOTO',
      client: 'Amora Craft House (Florist)',
      year: '2026',
      role: 'Fullstack Web Developer & Vendor',
      desc: 'Platform digital e-commerce dan sistem operasional bisnis terintegrasi untuk Amora Craft House. Terdiri dari 3 jenis program utama: (1) Website Toko Bunga & E-Commerce Pelanggan (katalog produk interaktif, keranjang belanja, & form checkout multi-metode pembayaran), (2) Dashboard Operasional Admin (manajemen inventaris bunga, katalog produk, status pesanan, & analitik), serta (3) Panel Monitoring Owner (pengawasan omzet real-time, audit trail keamanan anti-fraud, dan verifikasi absensi kamera karyawan berbasis Supabase BaaS & PostgreSQL).',
      tags: ['Website E-Commerce', 'Dashboard Admin', 'Owner Monitoring Panel', 'Sistem Absensi Kamera', 'React 18', 'TypeScript', 'TailwindCSS', 'Vite', 'Supabase BaaS', 'PostgreSQL 15', 'Vanilla JS', 'MediaDevices API']
    },
    {
      id: 'proj-maps-roblox',
      title: 'MAPS Roblox — 3D Obby & Custom Lua Architecture',
      category: 'game',
      categoryLabel: 'GAME DEV & ROBLOX',
      mediaType: 'video',
      videoSrc: 'assets/videos/MAPS Roblox/1.mp4',
      images: [
        'assets/videos/MAPS Roblox/2.jpg',
        'assets/videos/MAPS Roblox/3.jpg',
        'assets/videos/MAPS Roblox/4.jpg'
      ],
      imageLabels: [
        '2. Level Design Beginner Summit & Overhead Title System',
        '3. Platform Melayang Luar Angkasa & Client Scripts (AntiTP, Checkpoint)',
        '4. ServerScriptService (CheckpointService, CommandServer, SmiteScript, TitleManager)'
      ],
      quality: 'ROBLOX / VIDEO & 3 FOTO',
      duration: '00:05',
      client: 'Roblox Community / Platform',
      year: '2026',
      role: 'Roblox Developer & Level Designer',
      desc: 'Pembuatan map di Roblox Studio menggunakan bahasa program Lua dan plugin Roblox Studio. Projek mencakup video walkthrough gameplay 3D, obby level design, game mechanics & services, admin tools & infrastructure, serta implementasi FilteringEnabled client-server yang aman.',
      tags: ['Roblox Studio', 'Lua Scripting', '3D Level Design', 'ServerScriptService', 'Game Mechanics', 'Client-Server Architecture', 'FilteringEnabled']
    },
    {
      id: 'proj-game-fps',
      title: 'CyberVanguard FPS — Tactical Shooter in Unity Engine',
      category: 'game',
      categoryLabel: 'GAME DEV & UNITY 3D',
      mediaType: 'video',
      videoSrc: 'assets/videos/game fps/unity_fps_dev_showcase.mp4',
      images: [
        'assets/videos/game fps/1.jpg',
        'assets/videos/game fps/2.jpg',
        'assets/videos/game fps/3.jpg',
        'assets/videos/game fps/4.jpg'
      ],
      imageLabels: [
        '1. Level Design & Greyboxing Arena di Unity 3D Scene View',
        '2. Weapon Rigging, Muzzle Flash Particle & Animator Controller',
        '3. C# Scripting (RaycastGun, RecoilSystem) & Inspector Setup',
        '4. Live Gameplay Playtest Action & Tactical HUD System'
      ],
      quality: '4K / UNITY 6',
      duration: '00:14',
      client: 'Independent Game Project',
      year: '2026',
      role: 'Lead Gameplay Programmer & Technical Artist',
      desc: 'Pengembangan game First-Person Shooter (FPS) taktis 3D interaktif menggunakan Unity Engine dan bahasa C#: mencakup modular level greyboxing, sistem penembakan raycast & recoil terkalibrasi, partikel visual muzzle flash, dan arsitektur kontroler FPS responsif.',
      tags: ['Unity Engine', 'C# Scripting', 'Universal Render Pipeline (URP)', '3D FPS Controller', 'Weapon Mechanics', 'Shader Graph', 'Cinemachine']
    },
    {
      id: 'proj-fango-bot',
      title: 'FanGo AI — Autonomous Personal Telegram Bot',
      category: 'bot-ai',
      categoryLabel: 'AI & TELEGRAM BOT',
      mediaType: 'image',
      images: [
        'assets/videos/BOTai/WhatsApp Image 2026-09-15 at 09.29.51.jpeg'
      ],
      imageLabels: [
        'FanGo Bot — Asisten AI Telegram dengan Hak Akses Otomasi Laptop'
      ],
      quality: 'AI BOT / AUTOMATION',
      client: 'Personal Autonomous Assistant',
      year: '2026',
      role: 'AI & Backend Developer',
      desc: 'Asisten AI personal berbasis Telegram yang dirancang untuk mengeksekusi pencarian web real-time, analisis dokumen, serta kontrol penuh terhadap perangkat laptop secara jarak jauh. Bot ini memungkinkan pengguna untuk mengoperasikan sistem operasi, menjalankan aplikasi, dan melakukan otomatisasi tugas di laptop hanya melalui instruksi atau perintah teks via Telegram.',
      tags: ['Python', 'pyTelegramBotAPI', 'Groq LLM API', 'DuckDuckGo Search', 'Flask Web Server', 'PyPDF2', 'Docker Container']
    },
    {
      id: 'proj-theultimate',
      title: 'TheUltimate — Social Hub Telegram Bot',
      category: 'bot-ai',
      categoryLabel: 'AI & TELEGRAM BOT',
      mediaType: 'image',
      images: [
        'assets/videos/TheUltimate/WhatsApp Image 2026-09-21 at 08.35.10.jpeg'
      ],
      imageLabels: [
        'TheUltimate Bot — Social Hub Matchmaking & Registration Interface'
      ],
      quality: 'TELEGRAM BOT',
      client: 'Social Hub Community',
      year: '2026',
      role: 'Full-Cycle Bot Developer',
      desc: 'Platform bot interaksi sosial di Telegram dengan tiga modul inti: Blind Date (chat anonim 1-on-1 dengan profiling AI), Voice Roulette (voice note matchmaking), dan Squad Anon untuk group chat anonim berbasis minat.',
      tags: ['Python', 'pyTelegramBotAPI', 'Google Gemini AI', 'SQLite', 'Threading & Async', 'Matchmaking Engine']
    },
    {
      id: 'proj-undangan-3d',
      title: 'Undangan Digital 3D',
      category: 'web3d',
      categoryLabel: '3D & WEBGL',
      mediaType: 'video',
      videoSrc: 'assets/videos/Undangan 3D web/WhatsApp Video 2026-09-16 at 12.57.55.mp4',
      quality: '60FPS / CINEMATIC',
      duration: '00:26',
      client: 'Exclusive Wedding Client',
      year: '2026',
      role: 'Creative Developer & 3D Specialist',
      desc: 'Undangan Digital berbasis web yang memiliki efek transisi dan animasi 3D',
      tags: ['Three.js', 'WebGL', 'GSAP Animation', 'HTML5 Canvas', 'CSS3 3D', 'Audio API', 'Vanilla JS']
    },
    {
      id: 'proj-virtex',
      title: 'Virtex — WhatsApp Auto-Sender & Automation Engine',
      category: 'bot-ai',
      categoryLabel: 'TOOLS & OTOMASI',
      mediaType: 'image',
      images: [
        'assets/videos/Virtex/WhatsApp Image 2026-09-16 at 12.42.09.jpeg'
      ],
      imageLabels: [
        'Virtex WA — Pengiriman Pesan WhatsApp Terjadwal Berurutan'
      ],
      quality: 'NODE.JS / ENGINE',
      client: 'Automation Utility',
      year: '2026',
      role: 'Node.js Developer',
      desc: 'Program yang dirancang untuk melakukan pengiriman pesan secara otomatis hingga 1jt pesan secara bersamaan. Program ini digunakan untuk melakukan Crash atau aplikasi Freeze kepada tujuan',
      tags: ['Node.js', 'JavaScript', 'whatsapp-web.js', 'QR Auth', 'Queue Delay', 'Task Automation']
    },
    {
      id: 'proj-album-flipbook',
      title: 'Interactive Birthday & Memory Web Album',
      category: 'web3d',
      categoryLabel: 'WEB & MULTIMEDIA',
      mediaType: 'video',
      videoSrc: 'assets/videos/album/WhatsApp Video 2026-09-15 at 09.08.03.mp4',
      quality: 'VIDEO / 30FPS',
      duration: '00:21',
      client: 'Digital Memory Celebration',
      year: '2026',
      role: 'Creative Web Developer',
      desc: 'Website perayaan dan album kenangan interaktif dengan efek partikel 3D',
      tags: ['HTML5 Canvas', 'TailwindCSS', 'LightGallery', 'AOS Animations', 'Interactive Video', 'JavaScript']
    }
  ];

  const images = new Array(TOTAL_FRAMES);
  let loadedCount = 0;
  let isReady = false;

  // Scroll interpolation state for silky smooth animation
  let currentProgress = 0;
  let targetProgress = 0;
  let lastRenderedIndex = -1;
  const LERP_SPEED = 0.085;

  // Mouse coordinates for 3D parallax
  let mouseX = 0;
  let mouseY = 0;
  let currentParallaxX = 0;
  let currentParallaxY = 0;

  // Frame URL generator (with version stamp to bust browser cache for updated frames)
  const getFrameUrl = index => {
    const padIndex = String(index + 1).padStart(3, '0');
    return `assets/frames/ezgif-frame-${padIndex}.jpg?v=new-frames`;
  };

  // High-DPI canvas configuration
  let dpr = 1;
  let viewWidth = 0;
  let viewHeight = 0;

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;

    canvas.width = Math.round(viewWidth * dpr);
    canvas.height = Math.round(viewHeight * dpr);

    canvas.style.width = `${viewWidth}px`;
    canvas.style.height = `${viewHeight}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    if (lastRenderedIndex >= 0 && images[lastRenderedIndex]) {
      drawFrame(images[lastRenderedIndex]);
    }
  }

  // Offscreen canvas for fast, high-performance edge feathering
  let featherCanvas = null;
  let featherCtx = null;

  function getFeatheredImage(img, w, h) {
    if (!featherCanvas) {
      featherCanvas = document.createElement('canvas');
      featherCtx = featherCanvas.getContext('2d');
    }
    if (featherCanvas.width !== w || featherCanvas.height !== h) {
      featherCanvas.width = w;
      featherCanvas.height = h;
    }

    featherCtx.clearRect(0, 0, w, h);
    featherCtx.drawImage(img, 0, 0, w, h);

    // Feather the left and right borders smoothly so there are zero hard box lines
    featherCtx.globalCompositeOperation = 'destination-in';
    const featherWidth = Math.min(100, Math.round(w * 0.16));
    const grad = featherCtx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(featherWidth / w, 'rgba(0,0,0,1)');
    grad.addColorStop(1 - (featherWidth / w), 'rgba(0,0,0,1)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    featherCtx.fillStyle = grad;
    featherCtx.fillRect(0, 0, w, h);

    featherCtx.globalCompositeOperation = 'source-over';
    return featherCanvas;
  }

  // Draw frame with full-bleed background and seamless blending
  function drawFrame(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const offsetX = currentParallaxX * 18;
    const offsetY = currentParallaxY * 12;

    // Dark base matching the image shadow tones
    ctx.fillStyle = '#0a0404';
    ctx.fillRect(0, 0, viewWidth, viewHeight);

    if (bgMode === 'cover') {
      // MODE: TRUE FULL COVER (Stretches edge-to-edge across 100% of viewport)
      const scale = Math.max(viewWidth / imgW, viewHeight / imgH);
      const w = imgW * scale;
      const h = imgH * scale;
      const x = (viewWidth - w) / 2 + offsetX;
      // Smart vertical alignment: focuses on hair, eyes, and sunglasses
      const y = (viewHeight - h) * 0.15 + offsetY;

      ctx.drawImage(img, x, y, w, h);

      // Subtle shadow on left side so hero text is always easily readable
      const leftShadow = ctx.createLinearGradient(0, 0, viewWidth * 0.55, 0);
      leftShadow.addColorStop(0, 'rgba(7, 3, 3, 0.7)');
      leftShadow.addColorStop(1, 'rgba(7, 3, 3, 0)');
      ctx.fillStyle = leftShadow;
      ctx.fillRect(0, 0, viewWidth, viewHeight);
    } else {
      // MODE: FULL SEAMLESS (Default - Full-bleed ambient glow background + complete sharp portrait)
      // 1. Pass 1: Full-bleed background filling 100% of the screen with the video's live colors
      ctx.save();
      const bgScale = Math.max(viewWidth / imgW, viewHeight / imgH);
      const bgW = imgW * bgScale;
      const bgH = imgH * bgScale;
      const bgX = (viewWidth - bgW) / 2;
      const bgY = (viewHeight - bgH) * 0.2;

      ctx.filter = 'blur(45px) brightness(0.65) saturate(140%)';
      ctx.drawImage(img, bgX, bgY, bgW, bgH);
      ctx.restore();

      // 2. Pass 2: Atmospheric ruby/crimson light spread expanding to the right edge
      const ambientGlow = ctx.createRadialGradient(
        viewWidth * 0.7, viewHeight * 0.45, 40,
        viewWidth * 0.7, viewHeight * 0.45, viewWidth * 0.65
      );
      ambientGlow.addColorStop(0, 'rgba(255, 51, 102, 0.22)');
      ambientGlow.addColorStop(0.5, 'rgba(180, 25, 55, 0.1)');
      ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, viewWidth, viewHeight);

      // 3. Pass 3: Sharp foreground subject with feathered edges (zero box cutoff!)
      let fgScale;
      if (viewWidth < viewHeight) {
        fgScale = Math.max(viewWidth / imgW, viewHeight / imgH);
      } else {
        // Desktop: 105% viewport height, positioned cleanly in center/right
        fgScale = (viewHeight / imgH) * 1.05;
      }
      const fgW = Math.round(imgW * fgScale);
      const fgH = Math.round(imgH * fgScale);

      // Shift slightly right on desktop to balance with left hero typography
      const centerShift = viewWidth > 960 ? viewWidth * 0.08 : 0;
      const fgX = Math.round((viewWidth - fgW) / 2 + centerShift + offsetX);
      const fgY = Math.round((viewHeight - fgH) / 2 + offsetY);

      const featheredImg = getFeatheredImage(img, fgW, fgH);
      ctx.drawImage(featheredImg, fgX, fgY);
    }
  }

  // Main render loop
  function renderLoop() {
    const diff = targetProgress - currentProgress;
    if (Math.abs(diff) > 0.0001) {
      currentProgress += diff * LERP_SPEED;
    } else {
      currentProgress = targetProgress;
    }

    currentParallaxX += (mouseX - currentParallaxX) * 0.05;
    currentParallaxY += (mouseY - currentParallaxY) * 0.05;

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
    );

    const isParallaxMoving = Math.abs(mouseX - currentParallaxX) > 0.002 || Math.abs(mouseY - currentParallaxY) > 0.002;
    if ((frameIndex !== lastRenderedIndex || isParallaxMoving) && images[frameIndex]) {
      drawFrame(images[frameIndex]);
      lastRenderedIndex = frameIndex;
    }

    requestAnimationFrame(renderLoop);
  }

  // Scroll listener
  function onScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      targetProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    } else {
      targetProgress = 0;
    }
  }

  // Mouse move handler for 3D parallax
  function onMouseMove(e) {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translate3d(${mouseX * -14}px, ${mouseY * -10}px, 0)`;
    }
  }

  // Setup 3D interactive tilt on cards
  function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
      const maxTilt = parseFloat(card.dataset.depth) || 20;

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((cardY - centerY) / centerY) * -1 * (maxTilt * 0.35);
        const rotateY = ((cardX - centerX) / centerX) * (maxTilt * 0.35);

        const glareX = (cardX / rect.width) * 100;
        const glareY = (cardY / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${glareX}%`);
        card.style.setProperty('--mouse-y', `${glareY}%`);

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
      });
    });
  }

  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // PROJECT VAULT RENDERING & VIDEO/IMAGE INTERACTIONS
  // -------------------------------------------------------------
  let activeFilter = 'all';

  function renderProjectVault() {
    if (!videoVaultGrid) return;
    videoVaultGrid.innerHTML = '';

    const filtered = activeFilter === 'all'
      ? PROJECT_VAULT
      : PROJECT_VAULT.filter(p => p.category === activeFilter);

    const countAllEl = document.getElementById('countAll');
    if (countAllEl) countAllEl.textContent = PROJECT_VAULT.length;

    filtered.forEach(project => {
      const card = document.createElement('div');
      card.className = 'video-card tilt-card';
      card.dataset.depth = '28';
      card.dataset.id = project.id;

      const isVideo = project.mediaType === 'video';
      const firstImage = (project.images && project.images.length > 0) ? project.images[0] : '';
      const photoCount = project.images ? project.images.length : 0;

      const hasBothMedia = isVideo && project.images && project.images.length > 0;
      const actionText = hasBothMedia
        ? 'Buka Video & Galeri Dev ↗'
        : (isVideo
          ? 'Buka Cinema 3D ↗'
          : (photoCount > 1 ? 'Lihat Galeri Foto ↗' : 'Buka Detail Projek ↗'));

      let mediaHtml = '';
      if (isVideo) {
        mediaHtml = `
          <video src="${project.videoSrc}" autoplay muted loop playsinline preload="auto"></video>
          <div class="video-progress-bar">
            <div class="video-progress-fill"></div>
          </div>
        `;
      } else if (photoCount > 1) {
        mediaHtml = `
          <div class="card-slider-wrap">
            <img class="card-slide-img" src="${firstImage}" alt="${project.title}" loading="lazy" />
            <button class="card-slide-btn card-slide-prev" title="Foto Sebelumnya" aria-label="Foto Sebelumnya">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button class="card-slide-btn card-slide-next" title="Foto Selanjutnya" aria-label="Foto Selanjutnya">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div class="card-slider-dots">
              ${project.images.map((_, i) => `<span class="card-slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}" title="Foto ${i + 1}"></span>`).join('')}
            </div>
          </div>
        `;
      } else {
        mediaHtml = `<img src="${firstImage}" alt="${project.title}" loading="lazy" />`;
      }

      card.innerHTML = `
        <div class="card-glare"></div>
        <div class="video-thumb-box">
          ${mediaHtml}
        </div>

        <div class="video-card-body">
          <div class="video-card-meta">
            <span class="client">${project.client}</span>
            <span>•</span>
            <span>${project.year}</span>
          </div>
          <h3 class="video-card-title">${project.title}</h3>
          <p class="video-card-desc">${project.desc}</p>
          
          <div class="video-tags">
            ${project.tags.map(t => `<span>${t}</span>`).join('')}
          </div>

          <div class="video-card-action">
            <span>${actionText}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      `;

      // Video autoplay & progress (only for video projects)
      if (isVideo) {
        const videoEl = card.querySelector('video');
        const progressFill = card.querySelector('.video-progress-fill');

        if (videoEl) {
          // Otomatis berputar
          videoEl.play().catch(() => {});
          
          // Pastikan tetap berputar saat di-hover atau scroll
          card.addEventListener('mouseenter', () => {
            if (videoEl.paused) videoEl.play().catch(() => {});
          });
        }

        if (videoEl && progressFill) {
          videoEl.addEventListener('timeupdate', () => {
            if (videoEl.duration) {
              const pct = (videoEl.currentTime / videoEl.duration) * 100;
              progressFill.style.width = `${pct}%`;
            }
          });
        }
      }

      // In-Card Slider Navigation (Foto dapat di-slide tanpa harus mengklik / membuka sub modal)
      if (!isVideo && photoCount > 1) {
        let cardSlideIndex = 0;
        const slideImg = card.querySelector('.card-slide-img');
        const slideDots = card.querySelectorAll('.card-slider-dot');
        const durationBadge = card.querySelector('.video-duration');
        const prevBtn = card.querySelector('.card-slide-prev');
        const nextBtn = card.querySelector('.card-slide-next');
        const sliderWrap = card.querySelector('.card-slider-wrap');

        function goToCardSlide(idx) {
          cardSlideIndex = (idx + project.images.length) % project.images.length;
          if (slideImg) {
            slideImg.style.opacity = '0.35';
            slideImg.src = project.images[cardSlideIndex];
            setTimeout(() => { slideImg.style.opacity = '1'; }, 90);
          }
          slideDots.forEach((d, dIdx) => {
            d.classList.toggle('active', dIdx === cardSlideIndex);
          });
          if (durationBadge) {
            durationBadge.textContent = `📸 ${cardSlideIndex + 1} / ${project.images.length}`;
          }
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', e => {
            e.stopPropagation(); // Mencegah membuka modal
            goToCardSlide(cardSlideIndex - 1);
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', e => {
            e.stopPropagation(); // Mencegah membuka modal
            goToCardSlide(cardSlideIndex + 1);
          });
        }

        slideDots.forEach((dot, dotIdx) => {
          dot.addEventListener('click', e => {
            e.stopPropagation(); // Mencegah membuka modal
            goToCardSlide(dotIdx);
          });
        });

        // Touch swipe support di kartu
        if (sliderWrap) {
          let touchStartX = 0;
          sliderWrap.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
          }, { passive: true });

          sliderWrap.addEventListener('touchend', e => {
            const diffX = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(diffX) > 35) {
              if (diffX > 0) {
                goToCardSlide(cardSlideIndex - 1);
              } else {
                goToCardSlide(cardSlideIndex + 1);
              }
            }
          }, { passive: true });
        }
      }

      // Click card to open in full 3D Cinema / Gallery Modal
      card.addEventListener('click', () => {
        openCinemaModal(project);
      });

      videoVaultGrid.appendChild(card);
    });

    // Re-initialize tilt effect on newly created cards
    initTiltCards();
  }

  // Filter tabs handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter || 'all';
      renderProjectVault();
    });
  });

  // Local Media Upload & Preview Handler (Supports Video & Photo)
  if (localVideoUpload) {
    localVideoUpload.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        const fileName = file.name.replace(/\.[^/.]+$/, '');
        const isVid = file.type.startsWith('video');

        const newProject = {
          id: 'user-' + Date.now(),
          title: fileName.charAt(0).toUpperCase() + fileName.slice(1),
          category: 'bot-ai',
          categoryLabel: isVid ? 'USER VIDEO' : 'USER MEDIA',
          mediaType: isVid ? 'video' : 'image',
          videoSrc: isVid ? objectUrl : '',
          images: isVid ? [] : [objectUrl],
          imageLabels: [file.name],
          quality: 'LOCAL FILE',
          duration: isVid ? 'PREVIEW' : 'FOTO',
          client: 'File Lokal Komputer',
          year: '2026',
          role: 'Personal Showcase',
          desc: `Media projek "${file.name}" yang dipilih langsung dari penyimpanan komputermu.`,
          tags: ['Local Storage', file.type || 'Media', 'Showcase']
        };

        PROJECT_VAULT.unshift(newProject);
        renderProjectVault();
        openCinemaModal(newProject);
      }
    });
  }

  // -------------------------------------------------------------
  // 3D CINEMA & PHOTO GALLERY MODAL CONTROLS
  // -------------------------------------------------------------
  function updateGalleryView(index) {
    if (!currentModalProject || !currentModalProject.images || !currentModalProject.images.length) return;
    
    currentGalleryIndex = index;
    const total = currentModalProject.images.length;
    const currentSrc = currentModalProject.images[index];
    const currentLabel = currentModalProject.imageLabels && currentModalProject.imageLabels[index] 
      ? currentModalProject.imageLabels[index] 
      : `Foto dokumentasi ${index + 1} dari ${total}`;

    if (cinemaGalleryImg) {
      cinemaGalleryImg.style.opacity = '0';
      cinemaGalleryImg.style.transform = 'scale(0.97)';
      setTimeout(() => {
        cinemaGalleryImg.src = currentSrc;
        cinemaGalleryImg.alt = currentLabel;
        cinemaGalleryImg.style.opacity = '1';
        cinemaGalleryImg.style.transform = 'scale(1)';
      }, 100);
    }

    if (galleryCounter) {
      if (currentModalProject.id === 'proj-maps-roblox') {
        galleryCounter.textContent = `Foto ${index + 2} / ${total + 1}`;
      } else {
        galleryCounter.textContent = total > 1 ? `Foto ${index + 1} / ${total}` : 'Foto 1 / 1';
      }
    }

    if (cinemaClient && currentLabel) {
      cinemaClient.textContent = `File: ${currentLabel} • Client: ${currentModalProject.client}`;
    }

    // Update active state in thumbnail strip
    if (galleryThumbStrip) {
      const btns = galleryThumbStrip.querySelectorAll('.gallery-num-btn');
      btns.forEach(btn => {
        if (btn.dataset.imgIdx !== undefined) {
          btn.classList.toggle('active', parseInt(btn.dataset.imgIdx, 10) === index);
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  function showHybridVideo() {
    if (!currentModalProject || !currentModalProject.videoSrc) return;
    currentGalleryIndex = -1;
    if (cinemaGalleryBox) cinemaGalleryBox.style.display = 'none';
    if (galleryPrevBtn) galleryPrevBtn.style.display = 'flex';
    if (galleryNextBtn) galleryNextBtn.style.display = 'flex';
    if (cinemaVideo) {
      cinemaVideo.style.display = 'block';
      cinemaVideo.play().catch(() => {});
    }
    if (galleryCounter) {
      if (currentModalProject.id === 'proj-maps-roblox') {
        galleryCounter.textContent = `🎥 1 / ${currentModalProject.images.length + 1} • Video Showcase MAPS Roblox`;
      } else {
        const projectShortName = currentModalProject.title.split('—')[0].trim();
        galleryCounter.textContent = `🎥 Video Showcase • ${projectShortName}`;
      }
    }
    if (cinemaClient) cinemaClient.textContent = `File: Video Showcase • Client: ${currentModalProject.client}`;
    if (galleryThumbStrip) {
      galleryThumbStrip.querySelectorAll('.gallery-num-btn').forEach((b, idx) => {
        b.classList.toggle('active', idx === 0);
      });
    }
  }

  function switchToHybridPhoto(idx) {
    if (!currentModalProject || !currentModalProject.images) return;
    if (cinemaVideo) {
      cinemaVideo.pause();
      cinemaVideo.style.display = 'none';
    }
    if (cinemaGalleryBox) cinemaGalleryBox.style.display = 'flex';
    if (galleryPrevBtn) galleryPrevBtn.style.display = 'flex';
    if (galleryNextBtn) galleryNextBtn.style.display = 'flex';
    updateGalleryView(idx);
  }

  function nextGalleryImage() {
    if (!currentModalProject) return;
    const hasBothMedia = !!currentModalProject.videoSrc && currentModalProject.images && currentModalProject.images.length > 0;
    if (hasBothMedia) {
      if (currentGalleryIndex === -1) {
        switchToHybridPhoto(0);
      } else if (currentGalleryIndex >= currentModalProject.images.length - 1) {
        showHybridVideo();
      } else {
        switchToHybridPhoto(currentGalleryIndex + 1);
      }
      return;
    }
    if (currentModalProject.images && currentModalProject.images.length > 1) {
      if (cinemaVideo && cinemaVideo.style.display !== 'none') {
        cinemaVideo.pause();
        cinemaVideo.style.display = 'none';
        if (cinemaGalleryBox) cinemaGalleryBox.style.display = 'flex';
        if (galleryPrevBtn) galleryPrevBtn.style.display = 'flex';
        if (galleryNextBtn) galleryNextBtn.style.display = 'flex';
      }
      const nextIdx = (currentGalleryIndex + 1) % currentModalProject.images.length;
      updateGalleryView(nextIdx);
    }
  }

  function prevGalleryImage() {
    if (!currentModalProject) return;
    const hasBothMedia = !!currentModalProject.videoSrc && currentModalProject.images && currentModalProject.images.length > 0;
    if (hasBothMedia) {
      if (currentGalleryIndex === -1) {
        switchToHybridPhoto(currentModalProject.images.length - 1);
      } else if (currentGalleryIndex <= 0) {
        showHybridVideo();
      } else {
        switchToHybridPhoto(currentGalleryIndex - 1);
      }
      return;
    }
    if (currentModalProject.images && currentModalProject.images.length > 1) {
      if (cinemaVideo && cinemaVideo.style.display !== 'none') {
        cinemaVideo.pause();
        cinemaVideo.style.display = 'none';
        if (cinemaGalleryBox) cinemaGalleryBox.style.display = 'flex';
        if (galleryPrevBtn) galleryPrevBtn.style.display = 'flex';
        if (galleryNextBtn) galleryNextBtn.style.display = 'flex';
      }
      const prevIdx = (currentGalleryIndex - 1 + currentModalProject.images.length) % currentModalProject.images.length;
      updateGalleryView(prevIdx);
    }
  }

  if (galleryNextBtn) {
    galleryNextBtn.addEventListener('click', e => {
      e.stopPropagation();
      nextGalleryImage();
    });
  }

  if (galleryPrevBtn) {
    galleryPrevBtn.addEventListener('click', e => {
      e.stopPropagation();
      prevGalleryImage();
    });
  }

  function openCinemaModal(project) {
    if (!cinemaModal) return;

    currentModalProject = project;
    cinemaTitle.textContent = project.title;
    cinemaDesc.textContent = project.desc;
    cinemaCategory.textContent = project.categoryLabel;
    cinemaYear.textContent = project.year;
    cinemaClient.textContent = `Client: ${project.client} • Role: ${project.role}`;
    cinemaTags.innerHTML = project.tags.map(t => `<span>${t}</span>`).join('');

    const hasBothMedia = !!project.videoSrc && project.images && project.images.length > 0;

    if (hasBothMedia) {
      // PROJEK HYBRID: VIDEO & FOTO (Unity FPS, Roblox, dll.)
      showHybridVideo();

      if (galleryThumbStrip) {
        galleryThumbStrip.style.display = 'flex';
        galleryThumbStrip.innerHTML = '';

        // Tombol Video Dev/Gameplay Showcase
        const vidBtn = document.createElement('button');
        vidBtn.className = 'gallery-num-btn active';
        vidBtn.innerHTML = '<span>🎥 1. Video</span>';
        vidBtn.title = `Putar Video Showcase ${project.title}`;
        vidBtn.addEventListener('click', e => {
          e.stopPropagation();
          showHybridVideo();
        });
        galleryThumbStrip.appendChild(vidBtn);

        // Tombol Foto Berurutan
        project.images.forEach((imgSrc, idx) => {
          const btn = document.createElement('button');
          btn.className = 'gallery-num-btn';
          btn.dataset.imgIdx = idx;
          const labelNum = project.id === 'proj-maps-roblox' ? (idx + 2) : (idx + 1);
          btn.innerHTML = `<span>Foto ${labelNum}</span>`;
          btn.title = project.imageLabels && project.imageLabels[idx] ? project.imageLabels[idx] : `Buka Foto ${labelNum}`;
          btn.addEventListener('click', e => {
            e.stopPropagation();
            if (cinemaVideo) {
              cinemaVideo.pause();
              cinemaVideo.style.display = 'none';
            }
            if (cinemaGalleryBox) cinemaGalleryBox.style.display = 'flex';
            if (galleryPrevBtn) galleryPrevBtn.style.display = 'flex';
            if (galleryNextBtn) galleryNextBtn.style.display = 'flex';
            updateGalleryView(idx);
          });
          galleryThumbStrip.appendChild(btn);
        });
      }

      cinemaModal.classList.add('active');
      cinemaModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else if (project.mediaType === 'video') {
      // MODE VIDEO
      if (cinemaVideo) {
        cinemaVideo.style.display = 'block';
        cinemaVideo.src = project.videoSrc;
      }
      if (cinemaGalleryBox) cinemaGalleryBox.style.display = 'none';
      if (galleryThumbStrip) galleryThumbStrip.style.display = 'none';

      cinemaModal.classList.add('active');
      cinemaModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (cinemaVideo) cinemaVideo.play().catch(() => {});
    } else {
      // MODE GALERI FOTO (BERURUTAN NOMER 1, 2, 3...)
      if (cinemaVideo) {
        cinemaVideo.pause();
        cinemaVideo.src = '';
        cinemaVideo.style.display = 'none';
      }
      if (cinemaGalleryBox) cinemaGalleryBox.style.display = 'flex';

      const images = project.images || [];
      const total = images.length;

      if (total > 1) {
        if (galleryPrevBtn) galleryPrevBtn.style.display = 'flex';
        if (galleryNextBtn) galleryNextBtn.style.display = 'flex';
        if (galleryCounter) galleryCounter.style.display = 'block';

        if (galleryThumbStrip) {
          galleryThumbStrip.style.display = 'flex';
          galleryThumbStrip.innerHTML = '';
          images.forEach((imgSrc, idx) => {
            const btn = document.createElement('button');
            btn.className = `gallery-num-btn ${idx === 0 ? 'active' : ''}`;
            btn.dataset.imgIdx = idx;
            const labelNum = idx + 1;
            btn.innerHTML = `<span>Foto ${labelNum}</span>`;
            btn.title = project.imageLabels && project.imageLabels[idx] ? project.imageLabels[idx] : `Buka Foto ${labelNum}`;
            btn.addEventListener('click', e => {
              e.stopPropagation();
              updateGalleryView(idx);
            });
            galleryThumbStrip.appendChild(btn);
          });
        }
      } else {
        if (galleryPrevBtn) galleryPrevBtn.style.display = 'none';
        if (galleryNextBtn) galleryNextBtn.style.display = 'none';
        if (galleryThumbStrip) galleryThumbStrip.style.display = 'none';
        if (galleryCounter) galleryCounter.style.display = 'block';
      }

      updateGalleryView(0);

      cinemaModal.classList.add('active');
      cinemaModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCinemaModal() {
    if (!cinemaModal) return;

    if (cinemaVideo) {
      cinemaVideo.pause();
      cinemaVideo.currentTime = 0;
      cinemaVideo.src = '';
    }
    if (cinemaGalleryImg) {
      cinemaGalleryImg.src = '';
    }
    currentModalProject = null;

    cinemaModal.classList.remove('active');
    cinemaModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore background scroll
  }

  if (cinemaCloseBtn) cinemaCloseBtn.addEventListener('click', closeCinemaModal);
  if (cinemaBackdrop) cinemaBackdrop.addEventListener('click', closeCinemaModal);

  window.addEventListener('keydown', e => {
    if (cinemaModal && cinemaModal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeCinemaModal();
      } else if (e.key === 'ArrowRight') {
        nextGalleryImage();
      } else if (e.key === 'ArrowLeft') {
        prevGalleryImage();
      }
    }
  });

  // Copy email button interaction
  function initCopyEmail() {
    if (!copyEmailBtn) return;

    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.dataset.email || 'rifan.dev@example.com';
      const badge = copyEmailBtn.querySelector('.btn-badge');

      try {
        await navigator.clipboard.writeText(email);
        if (badge) badge.textContent = 'COPIED!';
        if (badge) badge.style.background = '#00ff88';
        if (badge) badge.style.color = '#000';

        setTimeout(() => {
          if (badge) badge.textContent = 'COPY';
          if (badge) badge.style.background = 'rgba(0, 0, 0, 0.3)';
          if (badge) badge.style.color = '#fff';
        }, 2500);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // Preload all 240 frames
  function preloadFrames() {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      img.onload = () => {
        loadedCount++;
        images[i] = img;

        const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        if (loaderBar) loaderBar.style.width = `${percent}%`;
        if (loaderText) loaderText.textContent = `INITIALIZING 3D ENGINE ${percent}%`;

        if (i === 0 && lastRenderedIndex === -1) {
          drawFrame(img);
          lastRenderedIndex = 0;
        }

        if (loadedCount === TOTAL_FRAMES) {
          isReady = true;
          if (loader) {
            loader.classList.add('loaded');
            setTimeout(() => loader.remove(), 800);
          }
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          isReady = true;
          if (loader) {
            loader.classList.add('loaded');
            setTimeout(() => loader.remove(), 800);
          }
        }
      };
    }
  }

  // Background Mode Toggle (Full Seamless vs Full Cover)
  function initBgModeToggle() {
    function updateBtnLabel() {
      if (bgModeText) {
        bgModeText.textContent = bgMode === 'cover' ? 'BG: Full Cover' : 'BG: Full Seamless';
      }
    }

    updateBtnLabel();

    if (toggleBgModeBtn) {
      toggleBgModeBtn.addEventListener('click', () => {
        bgMode = bgMode === 'seamless' ? 'cover' : 'seamless';
        localStorage.setItem('porto_bg_mode', bgMode);
        updateBtnLabel();

        if (lastRenderedIndex >= 0 && images[lastRenderedIndex]) {
          drawFrame(images[lastRenderedIndex]);
        }
      });
    }
  }

  // Initialize
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  resizeCanvas();
  preloadFrames();
  renderProjectVault();
  initTiltCards();
  initCopyEmail();
  initBgModeToggle();
  requestAnimationFrame(renderLoop);
})();
