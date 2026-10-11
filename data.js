// ═══════════════════════════════
//  EUNA RENTAL — DATA
// ═══════════════════════════════

const CATEGORIES = {
  tenda:    { name: 'Tenda',             icon: 'fas fa-campground' },
  carrier:  { name: 'Carrier & Tas',     icon: 'fas fa-backpack' },
  sleeping: { name: 'Sleeping Bag',      icon: 'fas fa-bed' },
  masak:    { name: 'Peralatan Masak',   icon: 'fas fa-fire' },
  navigasi: { name: 'Navigasi & Safety', icon: 'fas fa-compass' },
  pakaian:  { name: 'Pakaian Outdoor',   icon: 'fas fa-tshirt' }
};

const PRODUCTS = [

  // ══════════════════════════════
  //  TENDA
  // ══════════════════════════════
  {
    id: 'p01',
    name: 'Tenda Dome 2 Person',
    category: 'tenda',
    img: 'https://down-id.img.susercontent.com/file/sg-11134201-7rbl3-llsofy0a6ss98a',
    desc: 'Tenda dome 2 orang, waterproof 3000mm, mudah dipasang ±10 menit. Rangka fiberglass kuat, cocok untuk duo hiking & camping.',
    price: { 1:75000, 2:140000, 3:200000, 4:260000, 5:320000, 6:370000, 7:420000 },
    stock: [
      { id:'s001', label:'Consina — Hijau',     img:'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/89/MTA-3715433/consina_consina-magnum-4-tenda_full35.jpg', status:'available', returnDate:null },
      { id:'s002', label:'Eiger — Biru',        img:'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/96/MTA-159036043/br-m036969-04893_eiger-tenda-flash-2-orang-blue_full05-39a57398.jpg', status:'rented', returnDate:'2026-10-19' },
      { id:'s003', label:'Rei — Oranye',        img:'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/94/MTA-13639044/rei_tenda_rei_arjuno_a_kapasitas_2_orang_full03_o1mfql16.jpg', status:'available', returnDate:null },
      { id:'s004', label:'Naturehike — Abu-abu',img:'https://down-id.img.susercontent.com/file/id-11134207-7qul1-lgfwxy7wmikfd8', status:'rented', returnDate:'2026-10-20' }
    ]
  },

  {
    id: 'p02',
    name: 'Tenda Dome 4 Person',
    category: 'tenda',
    img: 'https://cf.shopee.co.id/file/f023a01e7e58d50e9b97bd4bd1d2ab3c',
    desc: 'Tenda besar 4 orang ideal untuk group camping. Flysheet double layer, tiang fiberglass kuat, ventilasi luas di kedua sisi.',
    price: { 1:120000, 2:230000, 3:330000, 4:420000, 5:510000, 6:590000, 7:680000 },
    stock: [
      { id:'s005', label:'Consina — Hijau Army', img:'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/89/MTA-3715433/consina_consina-magnum-4-tenda_full35.jpg', status:'available', returnDate:null },
      { id:'s006', label:'Eiger — Biru Navy',    img:'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/96/MTA-159036043/br-m036969-04893_eiger-tenda-flash-2-orang-blue_full05-39a57398.jpg', status:'available', returnDate:null },
      { id:'s007', label:'Coleman — Merah',      img:'https://tse3.mm.bing.net/th/id/OIP.Ym6IL3o-Ewi8jAhBakofVgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'rented', returnDate:'2026-10-21' }
    ]
  },

  // ══════════════════════════════
  //  CARRIER & TAS
  // ══════════════════════════════
  {
    id: 'p04',
    name: 'Carrier 60L',
    category: 'carrier',
    img: 'https://lzd-img-global.slatic.net/g/p/1ab9f4509f7e4740cb98aa9eaa682db3.jpg_720x720q80.jpg',
    desc: 'Carrier hiking 60L dengan sistem back ventilation dan hip belt nyaman. Cocok untuk pendakian 3–5 hari.',
    price: { 1:60000, 2:115000, 3:165000, 4:210000, 5:255000, 6:295000, 7:335000 },
    stock: [
      { id:'s011', label:'Consina — Hitam', img:'https://down-id.img.susercontent.com/file/sg-11134201-23010-9k555rb8p7lvec', status:'available', returnDate:null },
      { id:'s012', label:'Eiger — Hijau',   img:'https://sg-test-11.slatic.net/p/d62fe92961fe5275535cc84686f21fee.jpg', status:'rented', returnDate:'2026-10-21' },
      { id:'s013', label:'Deuter — Merah',  img:'https://down-id.img.susercontent.com/file/id-11134201-23020-uk5lpbyuoonv0e', status:'available', returnDate:null },
      { id:'s014', label:'Osprey — Navy',   img:'https://down-id.img.susercontent.com/file/75c54b8b86b997161773903d125ee5c7', status:'available', returnDate:null }
    ]
  },

  {
    id: 'p05',
    name: 'Carrier 80L',
    category: 'carrier',
    img: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/93/MTA-23840282/oem_oem_full01.jpg',
    desc: 'Carrier ekspedisi 80L, frame internal kuat, distribusi beban optimal hingga 20kg. Cocok untuk ekspedisi panjang.',
    price: { 1:80000, 2:155000, 3:225000, 4:290000, 5:350000, 6:405000, 7:455000 },
    stock: [
      { id:'s015', label:'Consina — Hitam', img:'https://down-id.img.susercontent.com/file/sg-11134201-23010-9k555rb8p7lvec', status:'available', returnDate:null },
      { id:'s016', label:'Eiger — Hijau',   img:'https://sg-test-11.slatic.net/p/d62fe92961fe5275535cc84686f21fee.jpg', status:'available', returnDate:null },
      { id:'s017', label:'Deuter — Merah',  img:'https://down-id.img.susercontent.com/file/id-11134201-23020-uk5lpbyuoonv0e', status:'rented', returnDate:'2026-10-23' },
      { id:'s017b',label:'Osprey — Navy',   img:'https://down-id.img.susercontent.com/file/75c54b8b86b997161773903d125ee5c7', status:'available', returnDate:null }
    ]
  },

  {
    id: 'p06',
    name: 'Day Pack 30L',
    category: 'carrier',
    img: 'https://tse3.mm.bing.net/th/id/OIP.jEGqtCQ4Mh8ZEHmKJsg1HAHaE9?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    desc: 'Ransel ringan 30L untuk hiking sehari. Ventilasi punggung baik, kompartemen terorganisir, nyaman dipakai seharian.',
    price: { 1:35000, 2:65000, 3:90000, 4:115000, 5:140000, 6:160000, 7:180000 },
    stock: [
      { id:'s018', label:'Eiger — Hitam',    img:'https://down-id.img.susercontent.com/file/b5505a9c6284f009066be7f229166698', status:'available', returnDate:null },
      { id:'s019', label:'Consina — Abu-abu',img:'https://tse3.mm.bing.net/th/id/OIP.aSUovcH0y38634j0u4IBawHaHa?r=0&w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3', status:'available', returnDate:null },
      { id:'s020', label:'Quechua — Biru',   img:'https://tse3.mm.bing.net/th/id/OIP.qhyMfZAPlQGZRmu0cMl21gAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'available', returnDate:null }
    ]
  },

  // ══════════════════════════════
  //  SLEEPING BAG
  // ══════════════════════════════
  {
    id: 'p07',
    name: 'Sleeping Bag Mummy -5°C',
    category: 'sleeping',
    img: 'https://contents.mediadecathlon.com/m16914092/k$af402bd7bec7c8a17249905b9f57080f/enjoy-short-2024-mummy-sleeping-bag-25c-200-cm-blue-with-orange-adults.jpg',
    desc: 'Sleeping bag mummy suhu hingga -5°C. Material inner fleece lembut, sangat hangat untuk pendakian gunung tinggi.',
    price: { 1:50000, 2:95000, 3:135000, 4:170000, 5:205000, 6:235000, 7:265000 },
    stock: [
      { id:'s021', label:'Consina — Merah',      img:'https://contents.mediadecathlon.com/m16914092/k$af402bd7bec7c8a17249905b9f57080f/enjoy-short-2024-mummy-sleeping-bag-25c-200-cm-blue-with-orange-adults.jpg', status:'available', returnDate:null },
      { id:'s022', label:'Eiger — Abu-abu',       img:'https://contents.mediadecathlon.com/m16914092/k$af402bd7bec7c8a17249905b9f57080f/enjoy-short-2024-mummy-sleeping-bag-25c-200-cm-blue-with-orange-adults.jpg', status:'rented',    returnDate:'2026-10-19' },
      { id:'s023', label:'Naturehike — Biru',     img:'https://contents.mediadecathlon.com/m16914092/k$af402bd7bec7c8a17249905b9f57080f/enjoy-short-2024-mummy-sleeping-bag-25c-200-cm-blue-with-orange-adults.jpg', status:'available', returnDate:null },
      { id:'s024', label:'Sea to Summit — Hijau', img:'https://contents.mediadecathlon.com/m16914092/k$af402bd7bec7c8a17249905b9f57080f/enjoy-short-2024-mummy-sleeping-bag-25c-200-cm-blue-with-orange-adults.jpg', status:'available', returnDate:null }
    ]
  },

  {
    id: 'p08',
    name: 'Sleeping Bag Envelope 10°C',
    category: 'sleeping',
    img: 'https://luvlyhouseholdcollections.co.ke/wp-content/uploads/2025/08/3-29.png',
    desc: 'Sleeping bag envelope ringan untuk camping dataran rendah, cocok suhu 5–15°C, mudah dilipat dan dibawa.',
    price: { 1:35000, 2:65000, 3:90000, 4:115000, 5:140000, 6:160000, 7:180000 },
    stock: [
      { id:'s025', label:'Consina — Hijau', img:'https://luvlyhouseholdcollections.co.ke/wp-content/uploads/2025/08/3-29.png', status:'available', returnDate:null },
      { id:'s026', label:'Quickcamp — Biru',img:'https://luvlyhouseholdcollections.co.ke/wp-content/uploads/2025/08/3-29.png', status:'available', returnDate:null },
      { id:'s027', label:'Kalibre — Merah', img:'https://luvlyhouseholdcollections.co.ke/wp-content/uploads/2025/08/3-29.png', status:'rented',    returnDate:'2026-10-18' }
    ]
  },

  {
    id: 'p09',
    name: 'Matras / Sleeping Pad',
    category: 'sleeping',
    img: 'https://outdoorhub-res.cloudinary.com/image/fetch/f_auto,q_auto:low,w_auto,dpr_auto/https://www.outdoorhub.com/wp-content/uploads/sites/2/2021/06/Pads-3.jpg',
    desc: 'Matras isolasi alas tidur, mencegah hilangnya panas tubuh ke tanah. Ringan dan mudah digulung.',
    price: { 1:20000, 2:35000, 3:50000, 4:62000, 5:75000, 6:85000, 7:95000 },
    stock: [
      { id:'s028', label:'Foam Roll — Single',     img:'https://outdoorhub-res.cloudinary.com/image/fetch/f_auto,q_auto:low,w_auto,dpr_auto/https://www.outdoorhub.com/wp-content/uploads/sites/2/2021/06/Pads-3.jpg', status:'available', returnDate:null },
      { id:'s029', label:'Self-Inflating — Single', img:'https://outdoorhub-res.cloudinary.com/image/fetch/f_auto,q_auto:low,w_auto,dpr_auto/https://www.outdoorhub.com/wp-content/uploads/sites/2/2021/06/Pads-3.jpg', status:'available', returnDate:null },
      { id:'s030', label:'Self-Inflating — Double', img:'https://outdoorhub-res.cloudinary.com/image/fetch/f_auto,q_auto:low,w_auto,dpr_auto/https://www.outdoorhub.com/wp-content/uploads/sites/2/2021/06/Pads-3.jpg', status:'available', returnDate:null }
    ]
  },

  // ══════════════════════════════
  //  PERALATAN MASAK
  // ══════════════════════════════
  {
    id: 'p10',
    name: 'Kompor Portable Gas',
    category: 'masak',
    img: 'https://tse2.mm.bing.net/th/id/OIP.0YE0hc05cqqYEd79i2LmkwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    desc: 'Kompor portable ringan menggunakan tabung gas kaleng standar. Mudah dibawa dan dinyalakan, cocok untuk semua kondisi.',
    price: { 1:25000, 2:45000, 3:65000, 4:80000, 5:95000, 6:110000, 7:125000 },
    stock: [
      { id:'s032', label:'Primus — Windproof', img:'https://tse2.mm.bing.net/th/id/OIP.0YE0hc05cqqYEd79i2LmkwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'available', returnDate:null },
      { id:'s033', label:'MSR — Ultralight',   img:'https://tse2.mm.bing.net/th/id/OIP.0YE0hc05cqqYEd79i2LmkwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'available', returnDate:null },
      { id:'s034', label:'Consina — Standard', img:'https://tse2.mm.bing.net/th/id/OIP.0YE0hc05cqqYEd79i2LmkwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'rented',    returnDate:'2026-10-19' },
      { id:'s035', label:'Camp1 — Standard',   img:'https://tse2.mm.bing.net/th/id/OIP.0YE0hc05cqqYEd79i2LmkwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'available', returnDate:null }
    ]
  },

  {
    id: 'p11',
    name: 'Nesting / Cooking Set',
    category: 'masak',
    img: 'https://tse4.mm.bing.net/th/id/OIP.fZfGL295_M2MesfCzz7xcgHaGM?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    desc: 'Set memasak compact: panci, wajan, tutup. Aluminium food grade anti lengket, hemat ruang di carrier.',
    price: { 1:20000, 2:38000, 3:55000, 4:70000, 5:85000, 6:98000, 7:110000 },
    stock: [
      { id:'s036', label:'1 Person — Aluminium', img:'https://tse4.mm.bing.net/th/id/OIP.fZfGL295_M2MesfCzz7xcgHaGM?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'available', returnDate:null },
      { id:'s037', label:'2 Person — Aluminium', img:'https://tse4.mm.bing.net/th/id/OIP.fZfGL295_M2MesfCzz7xcgHaGM?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'available', returnDate:null },
      { id:'s038', label:'4 Person — Titanium',  img:'https://tse4.mm.bing.net/th/id/OIP.fZfGL295_M2MesfCzz7xcgHaGM?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'available', returnDate:null }
    ]
  },

  // ══════════════════════════════
  //  NAVIGASI & SAFETY
  // ══════════════════════════════
  {
    id: 'p14',
    name: 'Headlamp LED',
    category: 'navigasi',
    img: 'https://tse4.mm.bing.net/th/id/OIP.LMJQ8d6HoVTzUjZx3Lme9QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    desc: 'Headlamp LED hingga 350 lumens, waterproof IPX4, baterai tahan ±40 jam. Cocok dipakai saat pendakian malam.',
    price: { 1:20000, 2:38000, 3:55000, 4:70000, 5:85000, 6:98000, 7:110000 },
    stock: [
      { id:'s045', label:'Petzl — 350 Lumens',         img:'https://tse4.mm.bing.net/th/id/OIP.LMJQ8d6HoVTzUjZx3Lme9QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'available', returnDate:null },
      { id:'s046', label:'Black Diamond — 250 Lumens',  img:'https://tse4.mm.bing.net/th/id/OIP.LMJQ8d6HoVTzUjZx3Lme9QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'available', returnDate:null },
      { id:'s047', label:'Eiger — 100 Lumens',          img:'https://tse4.mm.bing.net/th/id/OIP.LMJQ8d6HoVTzUjZx3Lme9QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'rented',    returnDate:'2026-10-19' },
      { id:'s048', label:'Fenix — 350 Lumens',          img:'https://tse4.mm.bing.net/th/id/OIP.LMJQ8d6HoVTzUjZx3Lme9QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', status:'available', returnDate:null }
    ]
  },

  {
    id: 'p15',
    name: 'Trekking Pole',
    category: 'navigasi',
    img: 'https://i5.walmartimages.com/asr/57ad5dda-f66e-4cbb-a1c2-b5cb536341b9.0dc744baad93be2abb7ce3897ea5ffde.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff',
    desc: 'Tongkat trekking aluminium dapat dilipat, membantu keseimbangan dan mengurangi tekanan pada lutut saat turun.',
    price: { 1:25000, 2:45000, 3:65000, 4:80000, 5:95000, 6:110000, 7:125000 },
    stock: [
      { id:'s049', label:'Black Diamond — Aluminium', img:'https://i5.walmartimages.com/asr/57ad5dda-f66e-4cbb-a1c2-b5cb536341b9.0dc744baad93be2abb7ce3897ea5ffde.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff', status:'available', returnDate:null },
      { id:'s050', label:'Leki — Carbon Fiber',       img:'https://i5.walmartimages.com/asr/57ad5dda-f66e-4cbb-a1c2-b5cb536341b9.0dc744baad93be2abb7ce3897ea5ffde.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff', status:'available', returnDate:null },
      { id:'s051', label:'Eiger — Aluminium',         img:'https://i5.walmartimages.com/asr/57ad5dda-f66e-4cbb-a1c2-b5cb536341b9.0dc744baad93be2abb7ce3897ea5ffde.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff', status:'available', returnDate:null },
      { id:'s052', label:'Consina — Aluminium',       img:'https://i5.walmartimages.com/asr/57ad5dda-f66e-4cbb-a1c2-b5cb536341b9.0dc744baad93be2abb7ce3897ea5ffde.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff', status:'rented',    returnDate:'2026-10-20' }
    ]
  },

  // ══════════════════════════════
  //  PAKAIAN OUTDOOR
  // ══════════════════════════════
  {
    id: 'p17',
    name: 'Jaket Gunung Windbreaker',
    category: 'pakaian',
    img: 'https://down-id.img.susercontent.com/file/sg-11134201-7rd3n-lurko8ehcf0m46',
    desc: 'Jaket tahan angin & air ringan, material 3-layer dengan lapisan DWR, breathable dan tidak membatasi gerak.',
    price: { 1:45000, 2:85000, 3:120000, 4:155000, 5:190000, 6:220000, 7:250000 },
    stock: [
      { id:'s056', label:'Eiger — M — Hitam',         img:'https://down-id.img.susercontent.com/file/sg-11134201-7rd3n-lurko8ehcf0m46', status:'available', returnDate:null },
      { id:'s057', label:'Eiger — L — Hitam',         img:'https://down-id.img.susercontent.com/file/sg-11134201-7rd3n-lurko8ehcf0m46', status:'rented',    returnDate:'2026-10-19' },
      { id:'s058', label:'Consina — M — Hijau',       img:'https://down-id.img.susercontent.com/file/sg-11134201-7rd3n-lurko8ehcf0m46', status:'available', returnDate:null },
      { id:'s059', label:'The North Face — L — Biru', img:'https://down-id.img.susercontent.com/file/sg-11134201-7rd3n-lurko8ehcf0m46', status:'available', returnDate:null },
      { id:'s060', label:'Patagonia — M — Abu-abu',   img:'https://down-id.img.susercontent.com/file/sg-11134201-7rd3n-lurko8ehcf0m46', status:'available', returnDate:null }
    ]
  }

];

// ── Payment methods ──
const PAYMENT_INFO = {
  bca:       { name:'BCA',       no:'1234567890',  holder:'Euna Rental', color:'#0061AB' },
  bni:       { name:'BNI',       no:'9876543210',  holder:'Euna Rental', color:'#FF6600' },
  bri:       { name:'BRI',       no:'0011223344',  holder:'Euna Rental', color:'#00529B' },
  mandiri:   { name:'Mandiri',   no:'1122334455',  holder:'Euna Rental', color:'#003D8F' },
  gopay:     { name:'GoPay',     no:'081234567890',holder:'Euna Rental', color:'#00AED6' },
  ovo:       { name:'OVO',       no:'081234567890',holder:'Euna Rental', color:'#4C3494' },
  dana:      { name:'DANA',      no:'081234567890',holder:'Euna Rental', color:'#118EEA' },
  shopeepay: { name:'ShopeePay', no:'081234567890',holder:'Euna Rental', color:'#EE4D2D' },
};

// ── Helpers ──
function rupiah(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}
function availableDate(stock) {
  if (stock.status === 'available') return null;
  const d = new Date(stock.returnDate);
  d.setDate(d.getDate() + 1);
  return d.toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
}
function countAvail(product) {
  return product.stock.filter(s => s.status === 'available').length;
}
function getProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}
function dateStr(d) {
  return new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
}
