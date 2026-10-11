// ═══════════════════════════════
//  EUNA RENTAL — APP LOGIC
// ═══════════════════════════════

let currentUser    = null;
let currentCat     = 'semua';
let selectedPayMethod = null;
let bookingItems   = [];
let riwFilter      = 'semua';

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  const saved = localStorage.getItem('euna_user');
  if (saved) {
    currentUser = JSON.parse(saved);
    enterApp();
  }
  setMinDate();
});

function setMinDate() {
  const today = new Date().toISOString().split('T')[0];
  const si = document.getElementById('b-start');
  const ei = document.getElementById('b-end');
  if (si) si.min = today;
  if (ei) ei.min = today;
}

// ════════════════════════════════
//  PAGE NAVIGATION
// ════════════════════════════════
function showPage(p) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  const t = document.getElementById('page-' + p);
  if (t) { t.classList.add('active'); window.scrollTo(0, 0); }
}

function showApp(p) {
  document.querySelectorAll('.ap').forEach(el => el.classList.remove('active'));
  const t = document.getElementById('ap-' + p);
  if (t) t.classList.add('active');

  document.querySelectorAll('.nav-a').forEach(a => {
    a.classList.toggle('active', a.dataset.p === p);
  });

  window.scrollTo(0, 0);
  closeUserDrop();
  closeMobileNav();

  if (p === 'beranda')  { syncStockFromBookings(); renderProducts(); }
  if (p === 'pricelist') renderPricelist();
  if (p === 'booking')  { initBooking(); fillBookingUser(); }
  if (p === 'profil')   renderProfile();
  if (p === 'riwayat')  renderRiwayat();
}

function enterApp() {
  showPage('app');
  showApp('beranda');
  updateNavUser();
}

// ════════════════════════════════
//  THEME
// ════════════════════════════════
function applyTheme() {
  const t = localStorage.getItem('euna_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
  document.querySelectorAll('#theme-icon, #theme-icon-2').forEach(i => {
    i.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  });
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  localStorage.setItem('euna_theme', cur === 'dark' ? 'light' : 'dark');
  applyTheme();
}

// ════════════════════════════════
//  STOCK SYNC — dari data booking localStorage
// ════════════════════════════════
function syncStockFromBookings() {
  // Reset semua stok ke default data dulu
  PRODUCTS.forEach(p => p.stock.forEach(s => {
    // Hanya reset stok yang statusnya 'rented' karena booking expired
    if (s.status === 'rented' && s.returnDate) {
      const today = new Date().toISOString().split('T')[0];
      if (s.returnDate < today) {
        s.status = 'available';
        s.returnDate = null;
      }
    }
  }));

  // Terapkan status dari booking aktif di localStorage
  const today = new Date().toISOString().split('T')[0];
  const bookings = JSON.parse(localStorage.getItem('euna_bookings') || '[]');

  bookings.forEach(b => {
    // Hanya proses booking yang masih aktif dan belum expired
    if (b.endDate < today) return;
    b.items.forEach(item => {
      const prod = getProduct(item.productId);
      if (!prod) return;
      const st = prod.stock.find(s => s.id === item.stockId);
      if (st) {
        st.status = 'rented';
        st.returnDate = b.endDate;
      }
    });
  });
}

// ════════════════════════════════
//  AUTH
// ════════════════════════════════
function getUsers()     { return JSON.parse(localStorage.getItem('euna_users') || '[]'); }
function saveUsers(u)   { localStorage.setItem('euna_users', JSON.stringify(u)); }

function handleRegister(e) {
  e.preventDefault();
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const phone = document.getElementById('reg-phone').value.trim();
  const pass  = document.getElementById('reg-password').value;
  const errEl = document.getElementById('register-error');
  const sucEl = document.getElementById('register-success');

  errEl.style.display = 'none';
  sucEl.style.display = 'none';

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    errEl.textContent = 'Email sudah terdaftar. Gunakan email lain.';
    errEl.style.display = 'block'; return;
  }
  users.push({ id: Date.now(), name, email, phone, password: pass });
  saveUsers(users);
  sucEl.textContent = 'Akun berhasil dibuat! Mengalihkan ke halaman login...';
  sucEl.style.display = 'block';
  document.getElementById('register-form').reset();
  setTimeout(() => showPage('login'), 1800);
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass  = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  errEl.style.display = 'none';

  const user = getUsers().find(u => u.email === email && u.password === pass);
  if (!user) {
    errEl.textContent = 'Email atau password salah. Silakan coba lagi.';
    errEl.style.display = 'block'; return;
  }
  currentUser = user;
  localStorage.setItem('euna_user', JSON.stringify(user));
  enterApp();
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('euna_user');
  showPage('landing');
  closeUserDrop();
}

function togglePass(id, btn) {
  const inp = document.getElementById(id);
  if (!inp) return;
  const isPass = inp.type === 'password';
  inp.type = isPass ? 'text' : 'password';
  btn.querySelector('i').className = isPass ? 'fas fa-eye-slash' : 'fas fa-eye';
}

// ════════════════════════════════
//  NAV UI
// ════════════════════════════════
function updateNavUser() {
  if (!currentUser) return;
  const ini = currentUser.name.charAt(0).toUpperCase();
  ['u-avatar','u-drop-avatar'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = ini;
  });
  const un = document.getElementById('u-name');
  if (un) un.textContent = currentUser.name.split(' ')[0];
  const dn = document.getElementById('u-drop-name');
  if (dn) dn.textContent = currentUser.name;
  const de = document.getElementById('u-drop-email');
  if (de) de.textContent = currentUser.email;
  const bn = document.getElementById('banner-name');
  if (bn) bn.textContent = currentUser.name.split(' ')[0];
}

function toggleUserDrop() {
  document.getElementById('u-dropdown')?.classList.toggle('open');
}
function closeUserDrop() {
  document.getElementById('u-dropdown')?.classList.remove('open');
}
document.addEventListener('click', e => {
  const pill = document.getElementById('user-pill');
  const dd   = document.getElementById('u-dropdown');
  if (dd && pill && !pill.contains(e.target) && !dd.contains(e.target)) dd.classList.remove('open');
});

function toggleMobileNav() {
  document.getElementById('nav-menu')?.classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('nav-menu')?.classList.remove('open');
}

// ════════════════════════════════
//  BERANDA — PRODUCTS
// ════════════════════════════════
function setCat(cat, btn) {
  currentCat = cat;
  document.querySelectorAll('.cf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  const q = (document.getElementById('search-inp')?.value || '').toLowerCase();

  let list = currentCat === 'semua' ? PRODUCTS : PRODUCTS.filter(p => p.category === currentCat);
  if (q) list = list.filter(p =>
    p.name.toLowerCase().includes(q) ||
    CATEGORIES[p.category]?.name.toLowerCase().includes(q)
  );

  if (!list.length) {
    grid.innerHTML = `<div class="no-results"><i class="fas fa-search"></i><p>Tidak ada produk ditemukan</p></div>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const avail  = countAvail(p);
    const total  = p.stock.length;
    const rented = total - avail;
    const cat    = CATEGORIES[p.category];

    let badgeClass = 'ok';
    let badgeHtml  = `<i class="fas fa-check-circle"></i> ${avail} Unit Tersedia`;
    if (avail === 0) {
      badgeClass = 'out';
      badgeHtml  = `<i class="fas fa-times-circle"></i> Semua Dirental`;
    } else if (rented > 0) {
      badgeClass = 'low';
      badgeHtml  = `<i class="fas fa-exclamation-circle"></i> ${avail} Tersedia · ${rented} Dirental`;
    }

    return `
    <div class="prod-card" onclick="openProdModal('${p.id}')">
      <div class="prod-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        <div class="prod-cat-badge"><i class="${cat.icon}"></i> ${cat.name}</div>
        <div class="prod-stock-badge ${badgeClass}">${badgeHtml}</div>
      </div>
      <div class="prod-info">
        <h3 class="prod-name">${p.name}</h3>
        <p class="prod-desc">${p.desc.substring(0, 78)}...</p>
        <div class="prod-price-row">
          <div>
            <span class="price-label">Mulai dari</span>
            <span class="price-val">${rupiah(p.price[1])}<small>/hari</small></span>
          </div>
          <button class="btn-detail">Detail <i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ════════════════════════════════
//  PRODUCT MODAL — TANPA VARIAN SELECTOR
// ════════════════════════════════
function openProdModal(id) {
  syncStockFromBookings();
  const p = getProduct(id);
  if (!p) return;

  const modal = document.getElementById('prod-modal');
  const inner = document.getElementById('modal-inner');

  // Tabel harga
  const priceRows = Object.entries(p.price).map(([d, h]) =>
    `<tr>
      <td>${d} hari</td>
      <td class="td-gold">${rupiah(h)}</td>
      <td>${rupiah(Math.round(h / d))}/hari</td>
    </tr>`
  ).join('');

  // Stok dengan foto — pisahkan available dan rented
  const availStocks  = p.stock.filter(s => s.status === 'available');
  const rentedStocks = p.stock.filter(s => s.status === 'rented');

  const renderStockCard = (s, isRented) => {
    const avDate = isRented ? availableDate(s) : null;
    return `
    <div class="stock-card ${isRented ? 'rented' : 'available'}">
      <div class="stock-card-img">
        <img src="${s.img}" alt="${s.label}"
          onerror="this.onerror=null;this.src='${p.img}'" loading="lazy" />
      </div>
      <div class="stock-card-info">
        <span class="stock-card-label">${s.label}</span>
        ${isRented
          ? `<span class="scb rented"><i class="fas fa-clock"></i> Sedang Dirental</span>
             <span class="sc-avail-date"><i class="fas fa-calendar-check"></i> Tersedia ${avDate}</span>`
          : `<span class="scb available"><i class="fas fa-check-circle"></i> Tersedia</span>`
        }
      </div>
    </div>`;
  };

  const totalUnit  = p.stock.length;
  const availCount = availStocks.length;
  const rentedCount = rentedStocks.length;

  const stockSummaryHtml = rentedCount > 0
    ? `<div class="stock-summary">
         <span class="ss-avail"><i class="fas fa-check-circle"></i> ${availCount} tersedia</span>
         <span class="ss-dot">·</span>
         <span class="ss-rent"><i class="fas fa-clock"></i> ${rentedCount} dirental</span>
       </div>`
    : `<div class="stock-summary all-avail">
         <i class="fas fa-check-circle"></i> Semua ${totalUnit} unit tersedia
       </div>`;

  const allStockHtml = [
    ...availStocks.map(s  => renderStockCard(s, false)),
    ...rentedStocks.map(s => renderStockCard(s, true))
  ].join('');

  inner.innerHTML = `
    <div class="modal-prod-grid">
      <div class="modal-img-col">
        <img id="modal-main-img" src="${p.img}" alt="${p.name}" />
        <div class="modal-cat-tag">
          <i class="${CATEGORIES[p.category].icon}"></i> ${CATEGORIES[p.category].name}
        </div>
      </div>
      <div class="modal-info-col">
        <h2>${p.name}</h2>
        <p class="modal-desc">${p.desc}</p>

        <div class="modal-section">
          <div class="modal-sec-title">
            <i class="fas fa-warehouse"></i> Ketersediaan Stok
          </div>
          ${stockSummaryHtml}
          <div class="stock-cards-grid">${allStockHtml}</div>
        </div>

        <div class="modal-section">
          <div class="modal-sec-title">
            <i class="fas fa-tags"></i> Daftar Harga Sewa
          </div>
          <table class="price-table">
            <thead>
              <tr><th>Durasi</th><th>Total Harga</th><th>Per Hari</th></tr>
            </thead>
            <tbody>${priceRows}</tbody>
          </table>
        </div>

        <button class="btn-book-now" onclick="goBookFromModal('${id}')">
          <i class="fas fa-calendar-check"></i> Booking Sekarang
        </button>
      </div>
    </div>`;

  // Klik gambar stok → ganti foto utama
  inner.querySelectorAll('.stock-card-img img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const mainImg = document.getElementById('modal-main-img');
      if (!mainImg) return;
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = img.src;
        mainImg.style.opacity = '1';
      }, 180);
    });
  });

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProdModal(e) {
  if (e.target.id === 'prod-modal') closeProdModalBtn();
}
function closeProdModalBtn() {
  document.getElementById('prod-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function goBookFromModal(pid) {
  closeProdModalBtn();
  showApp('booking');
}

// ════════════════════════════════
//  PRICELIST
// ════════════════════════════════
function renderPricelist() {
  const wrap = document.getElementById('pricelist-wrap');
  if (!wrap) return;

  const byCat = {};
  [...PRODUCTS]
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(p => {
      if (!byCat[p.category]) byCat[p.category] = [];
      byCat[p.category].push(p);
    });

  wrap.innerHTML = Object.entries(byCat).map(([cat, items]) => {
    const c = CATEGORIES[cat];
    const rows = items.map(p => `
      <tr>
        <td class="pl-name">${p.name}</td>
        ${[1,2,3,4,5,6,7].map(d => `<td>${rupiah(p.price[d])}</td>`).join('')}
      </tr>`).join('');
    return `
      <div class="pl-category">
        <div class="pl-cat-header"><i class="${c.icon}"></i> ${c.name}</div>
        <div class="pl-table-wrap">
          <table class="pl-table">
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>1 Hari</th><th>2 Hari</th><th>3 Hari</th><th>4 Hari</th>
                <th>5 Hari</th><th>6 Hari</th><th>7 Hari</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`;
  }).join('');
}

// ════════════════════════════════
//  BOOKING
// ════════════════════════════════
function initBooking() {
  bookingItems   = [];
  selectedPayMethod = null;
  document.querySelectorAll('.pay-opt').forEach(o => o.classList.remove('selected'));
  const os = document.getElementById('order-summary');
  if (os) os.style.display = 'none';
  const di = document.getElementById('dur-info');
  if (di) di.style.display = 'none';
  renderBookItems();
  addBookItem();
}

function fillBookingUser() {
  if (!currentUser) return;
  const bn = document.getElementById('b-name');
  const bp = document.getElementById('b-phone');
  if (bn && !bn.value) bn.value = currentUser.name;
  if (bp && !bp.value) bp.value = currentUser.phone || '';
}

function addBookItem() {
  bookingItems.push({ id: Date.now(), productId: '', stockId: '' });
  renderBookItems();
}

function removeBookItem(id) {
  bookingItems = bookingItems.filter(i => i.id !== id);
  renderBookItems();
  calcBooking();
}

function renderBookItems() {
  const wrap = document.getElementById('book-items');
  if (!wrap) return;

  wrap.innerHTML = bookingItems.map((item, idx) => {
    const prodOpts = PRODUCTS.map(p =>
      `<option value="${p.id}" ${item.productId === p.id ? 'selected' : ''}>${p.name}</option>`
    ).join('');

    let stockOpts = '<option value="">— Pilih unit —</option>';
    if (item.productId) {
      const p = getProduct(item.productId);
      if (p) {
        stockOpts = p.stock.map(s => {
          const avDate = availableDate(s);
          const lbl = s.status === 'available'
            ? `✓ ${s.label}`
            : `✗ ${s.label} (tersedia ${avDate})`;
          return `<option value="${s.id}"
            ${item.stockId === s.id ? 'selected' : ''}
            ${s.status !== 'available' ? 'disabled' : ''}>${lbl}</option>`;
        }).join('');
      }
    }

    return `
    <div class="book-item-row" data-id="${item.id}">
      <div class="book-item-num">${idx + 1}</div>
      <div class="book-item-fields">
        <div class="fg">
          <label>Barang</label>
          <select onchange="onProductChange(${item.id}, this.value)">
            <option value="">— Pilih barang —</option>
            ${prodOpts}
          </select>
        </div>
        <div class="fg">
          <label>Unit / Varian</label>
          <select onchange="onStockChange(${item.id}, this.value)">
            ${stockOpts}
          </select>
        </div>
      </div>
      ${bookingItems.length > 1
        ? `<button type="button" class="btn-remove-item" onclick="removeBookItem(${item.id})">
             <i class="fas fa-trash"></i>
           </button>`
        : ''}
    </div>`;
  }).join('');
}

function onProductChange(id, productId) {
  const item = bookingItems.find(i => i.id === id);
  if (item) { item.productId = productId; item.stockId = ''; }
  renderBookItems();
  calcBooking();
}
function onStockChange(id, stockId) {
  const item = bookingItems.find(i => i.id === id);
  if (item) item.stockId = stockId;
  calcBooking();
}

function pickPay(method, el) {
  selectedPayMethod = method;
  document.querySelectorAll('.pay-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  calcBooking();
}

function calcBooking() {
  const startVal = document.getElementById('b-start')?.value;
  const endVal   = document.getElementById('b-end')?.value;
  const durInfo  = document.getElementById('dur-info');
  const durTxt   = document.getElementById('dur-txt');
  const osWrap   = document.getElementById('order-summary');
  const osItems  = document.getElementById('os-items');
  const osTotal  = document.getElementById('os-total-price');

  let days = 0;
  if (startVal && endVal) {
    const s = new Date(startVal);
    const e = new Date(endVal);
    days = Math.round((e - s) / (1000 * 60 * 60 * 24));
    if (days < 0) days = 0;
    if (durInfo) durInfo.style.display = days > 0 ? 'flex' : 'none';
    if (durTxt)  durTxt.textContent = `Durasi: ${days} hari  (${dateStr(startVal)} — ${dateStr(endVal)})`;
  }

  if (!osItems || !osTotal) return;

  const validItems = bookingItems.filter(i => i.productId && i.stockId);
  if (!days || !validItems.length) {
    if (osWrap) osWrap.style.display = 'none';
    return;
  }
  if (osWrap) osWrap.style.display = 'block';

  let total = 0;
  let html  = '';
  validItems.forEach(item => {
    const p     = getProduct(item.productId);
    if (!p) return;
    const stock = p.stock.find(s => s.id === item.stockId);
    if (!stock) return;
    const key   = Math.min(days, 7);
    const price = p.price[key] || p.price[7];
    total += price;
    html += `
    <div class="os-item">
      <div class="os-item-name">
        <i class="${CATEGORIES[p.category].icon}"></i>
        ${p.name}
        <small>${stock.label}</small>
      </div>
      <div class="os-item-price">${rupiah(price)}</div>
    </div>`;
  });

  osItems.innerHTML = html || '<p class="os-empty">Pilih barang terlebih dahulu</p>';
  osTotal.textContent = rupiah(total);
}

function submitBooking(e) {
  e.preventDefault();
  if (!selectedPayMethod) {
    showToast('Pilih metode pembayaran terlebih dahulu', 'error'); return;
  }
  const startVal = document.getElementById('b-start')?.value;
  const endVal   = document.getElementById('b-end')?.value;
  if (!startVal || !endVal) {
    showToast('Pilih tanggal sewa', 'error'); return;
  }
  const days = Math.round((new Date(endVal) - new Date(startVal)) / 86400000);
  if (days <= 0) {
    showToast('Tanggal selesai harus setelah tanggal mulai', 'error'); return;
  }

  const validItems = bookingItems.filter(i => i.productId && i.stockId);
  if (!validItems.length) {
    showToast('Pilih minimal 1 barang', 'error'); return;
  }

  const name  = document.getElementById('b-name').value.trim();
  const phone = document.getElementById('b-phone').value.trim();
  let total = 0;

  const itemsDetail = validItems.map(item => {
    const p     = getProduct(item.productId);
    const stock = p.stock.find(s => s.id === item.stockId);
    const key   = Math.min(days, 7);
    const price = p.price[key];
    total += price;
    return { productId:p.id, productName:p.name, stockId:stock.id, stockLabel:stock.label, price };
  });

  // Simpan booking
  const bookings = JSON.parse(localStorage.getItem('euna_bookings') || '[]');
  const newBooking = {
    id: 'BK' + Date.now(),
    userId: currentUser?.id,
    name, phone,
    startDate: startVal, endDate: endVal, days,
    items: itemsDetail,
    payMethod: selectedPayMethod,
    total,
    status: 'aktif',
    createdAt: new Date().toISOString()
  };
  bookings.push(newBooking);
  localStorage.setItem('euna_bookings', JSON.stringify(bookings));

  // Update status stok
  itemsDetail.forEach(item => {
    const p  = getProduct(item.productId);
    const st = p?.stock.find(s => s.id === item.stockId);
    if (st) { st.status = 'rented'; st.returnDate = endVal; }
  });

  showPaymentModal(newBooking);
}

// ════════════════════════════════
//  PAYMENT MODAL
// ════════════════════════════════
function showPaymentModal(booking) {
  const info  = PAYMENT_INFO[booking.payMethod];
  const modal = document.getElementById('pay-modal');
  const inner = document.getElementById('pay-modal-inner');
  const isBank = ['bca','bni','bri','mandiri'].includes(booking.payMethod);
  const qrUrl  = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=EUNA-${booking.id}-${booking.total}`;

  const itemRows = booking.items.map(it =>
    `<div class="pay-item-row">
       <span>${it.productName} <small>${it.stockLabel}</small></span>
       <span>${rupiah(it.price)}</span>
     </div>`
  ).join('');

  inner.innerHTML = `
    <div class="pay-success-header">
      <div class="pay-success-icon"><i class="fas fa-check-circle"></i></div>
      <h2>Booking Dikonfirmasi!</h2>
      <p>ID Booking: <strong>${booking.id}</strong></p>
    </div>
    <div class="pay-info-wrap">
      <div class="pay-method-header" style="background:${info.color}">
        <span class="pay-method-name">${info.name}</span>
        <span>${isBank ? 'Transfer Bank' : 'E-Wallet'}</span>
      </div>
      <div class="pay-qr-section">
        <img src="${qrUrl}" alt="QR Code" class="pay-qr-img" />
        <p class="pay-qr-hint">Scan QR Code untuk membayar</p>
      </div>
      <div class="pay-account">
        <div class="pay-acc-row">
          <span>${isBank ? 'No. Rekening' : 'No. Akun'}</span>
          <strong>${info.no}</strong>
        </div>
        <div class="pay-acc-row">
          <span>Atas Nama</span>
          <strong>${info.holder}</strong>
        </div>
      </div>
      <div class="pay-order-detail">
        <div class="pay-od-title">Detail Pesanan</div>
        <div class="pay-od-row"><span>Pemesan</span><span>${booking.name}</span></div>
        <div class="pay-od-row"><span>Durasi</span><span>${booking.days} hari</span></div>
        <div class="pay-od-row"><span>Tanggal</span>
          <span>${dateStr(booking.startDate)} – ${dateStr(booking.endDate)}</span>
        </div>
        ${itemRows}
        <div class="pay-od-total">
          <span>Total Pembayaran</span>
          <span class="pay-total-amt">${rupiah(booking.total)}</span>
        </div>
      </div>
      <p class="pay-note">
        <i class="fas fa-info-circle"></i>
        Kirimkan bukti transfer ke WhatsApp kami setelah pembayaran dilakukan
      </p>
      <button class="btn-done"
        onclick="closePayModalBtn(); showApp('riwayat'); showToast('Booking berhasil! Silakan lakukan pembayaran.')">
        <i class="fas fa-check"></i> Selesai
      </button>
    </div>`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePayModal(e) {
  if (e.target.id === 'pay-modal') closePayModalBtn();
}
function closePayModalBtn() {
  document.getElementById('pay-modal').classList.remove('open');
  document.body.style.overflow = '';
  initBooking();
  fillBookingUser();
}

// ════════════════════════════════
//  PROFILE
// ════════════════════════════════
function renderProfile() {
  if (!currentUser) return;
  const ini = currentUser.name.charAt(0).toUpperCase();
  document.getElementById('profil-av').textContent  = ini;
  document.getElementById('profil-dname').textContent  = currentUser.name;
  document.getElementById('profil-demail').textContent = currentUser.email;
  document.getElementById('p-name').value  = currentUser.name;
  document.getElementById('p-email').value = currentUser.email;
  document.getElementById('p-phone').value = currentUser.phone || '';
  document.getElementById('profil-ok').style.display = 'none';
}

function saveProfile() {
  const name  = document.getElementById('p-name').value.trim();
  const phone = document.getElementById('p-phone').value.trim();
  if (!name) { showToast('Nama tidak boleh kosong', 'error'); return; }

  const users = getUsers();
  const idx   = users.findIndex(u => u.id === currentUser.id);
  if (idx > -1) {
    users[idx].name = name; users[idx].phone = phone;
    saveUsers(users);
    currentUser = users[idx];
    localStorage.setItem('euna_user', JSON.stringify(currentUser));
    updateNavUser(); renderProfile();
    document.getElementById('profil-ok').style.display = 'block';
    showToast('Profil berhasil disimpan!');
  }
}

// ════════════════════════════════
//  RIWAYAT
// ════════════════════════════════
function setRiwFilter(f, btn) {
  riwFilter = f;
  document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRiwayat();
}

function renderRiwayat() {
  const wrap = document.getElementById('riwayat-list');
  if (!wrap || !currentUser) return;

  const today = new Date().toISOString().split('T')[0];
  const all   = JSON.parse(localStorage.getItem('euna_bookings') || '[]')
    .filter(b => b.userId === currentUser.id);

  // Auto-update status selesai
  all.forEach(b => { if (b.status === 'aktif' && b.endDate < today) b.status = 'selesai'; });
  const saved = JSON.parse(localStorage.getItem('euna_bookings') || '[]');
  saved.forEach(b => {
    const found = all.find(a => a.id === b.id);
    if (found) b.status = found.status;
  });
  localStorage.setItem('euna_bookings', JSON.stringify(saved));

  const filtered = riwFilter === 'semua'
    ? all
    : all.filter(b => b.status === riwFilter);

  if (!filtered.length) {
    wrap.innerHTML = `<div class="riwayat-empty">
      <i class="fas fa-box-open"></i>
      <p>${riwFilter === 'semua' ? 'Belum ada riwayat rental' : 'Tidak ada data'}</p>
    </div>`;
    return;
  }

  filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  wrap.innerHTML = filtered.map(b => {
    const info     = PAYMENT_INFO[b.payMethod];
    const itemList = b.items.map(it =>
      `<div class="rw-item"><i class="fas fa-check"></i> ${it.productName}
       <span>(${it.stockLabel})</span></div>`
    ).join('');
    return `
    <div class="riwayat-card ${b.status}">
      <div class="rw-head">
        <div>
          <div class="rw-id">${b.id}</div>
          <div class="rw-date">
            <i class="fas fa-calendar"></i>
            ${dateStr(b.startDate)} — ${dateStr(b.endDate)} (${b.days} hari)
          </div>
        </div>
        <div class="rw-status-badge ${b.status}">
          ${b.status === 'aktif'
            ? '<i class="fas fa-circle-dot"></i> Berlangsung'
            : '<i class="fas fa-check-double"></i> Selesai'}
        </div>
      </div>
      <div class="rw-items">${itemList}</div>
      <div class="rw-foot">
        <div class="rw-pay"><i class="fas fa-credit-card"></i> ${info?.name || b.payMethod}</div>
        <div class="rw-total">${rupiah(b.total)}</div>
      </div>
    </div>`;
  }).join('');
}

// ════════════════════════════════
//  TOAST
// ════════════════════════════════
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const tMsg  = document.getElementById('toast-msg');
  if (!toast || !tMsg) return;
  tMsg.textContent = msg;
  toast.className  = 'toast ' + type + ' show';
  setTimeout(() => toast.classList.remove('show'), 3200);
}
