// ==============================
// NAVBAR SCROLL EFFECT
// ==============================
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.style.background = window.scrollY > 50
    ? 'rgba(255,255,255,0.98)'
    : 'rgba(255,255,255,0.95)';
});


// ==============================
// FETCH & LOAD DATA DARI CSV
// ==============================
fetch('databaru.csv')
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split('\n').slice(1).filter(r => r.trim() !== '');
    const kecamatanCount = {};

    rows.forEach(row => {
      const parts = row.split(';');
      const lokasi = parts[2] || ''; // pastikan kolom ke-3 ada
      const match = lokasi.match(/Kec\. ([^,]+)/);
      const namaKec = match ? match[1].trim() : 'Unknown';
      kecamatanCount[namaKec] = (kecamatanCount[namaKec] || 0) + 1;
    });

    // Konversi hasil jadi array Chart.js
    const labels = Object.keys(kecamatanCount);
    const data = Object.values(kecamatanCount);

    // Update chart jika sudah terinisialisasi
    if (typeof bar !== 'undefined') {
      bar.data.labels = labels;
      bar.data.datasets[0].data = data;
      bar.update();
    } else {
      console.warn("Chart 'bar' belum terdefinisi. Pastikan chart dibuat sebelum fetch CSV.");
    }
  })
  .catch(err => console.error('Gagal memuat CSV:', err));


// ==============================
// ACTIVE NAV LINK
// ==============================
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

Chart.defaults.devicePixelRatio = window.devicePixelRatio;

const bar = new Chart(document.getElementById('barChart'), {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Jumlah Fasilitas',
      data: [],
      backgroundColor: '#27ae60',
      borderRadius: 8
    }]
  },
  options: {
    indexAxis: 'y',
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        ticks: {
          color: '#333',
          font: { family: 'Poppins', size: 13 },
          padding: 10,
          mirror: false,
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0
        }
      },
      x: {
        ticks: {
          color: '#444',
          font: { family: 'Poppins', size: 12 },
          stepSize: 1
        },
        grid: { color: 'rgba(0,0,0,0.1)' }
      }
    }
  }
});

