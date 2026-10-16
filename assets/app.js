/* ==========================================================================
   رزا بوتیک (Rosa Boutique) - منطق کامل فروشگاهی (Vanilla JavaScript)
   پشتیبانی از ۴ صفحه، سبد خرید پایدار، فیلتر، جستجو، علاقه‌مندی و نمایش سریع
   ========================================================================== */

const PRODUCTS_DATA = [
  {
    id: 1,
    title: "پیراهن ساحلی حریر رُزا",
    category: "dress",
    categoryLabel: "پیراهن و سارافون",
    price: 1480000,
    oldPrice: 1750000,
    tag: "پرفروش",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#f472b6", "#ffffff", "#fbcfe8"],
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=80",
    desc: "پیراهن تابستانی و چهارفصل با پارچه حریر کرپ درجه یک، بسیار سبک، ضد چروک و دارای آستر نخی ضد حساسیت."
  },
  {
    id: 2,
    title: "کت و شلوار رسمی صورتی پاستلی",
    category: "suit",
    categoryLabel: "کت و ست مجلسی",
    price: 2650000,
    oldPrice: 2980000,
    tag: "کالکشن جدید",
    sizes: ["M", "L", "XL"],
    colors: ["#f9a8d4", "#fff1f2", "#db2777"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=80",
    desc: "ست دو تکه کت بلیزر و شلوار راسته با برش مزونی دقیق، مناسب مهمانی‌ها و استایل‌های نیمه‌رسمی شیک."
  },
  {
    id: 3,
    title: "شومیز ساتن ابریشم مرواریدی",
    category: "blouse",
    categoryLabel: "شومیز و بلوز",
    price: 980000,
    oldPrice: 1190000,
    tag: "تخفیف ویژه",
    sizes: ["Free", "M", "L"],
    colors: ["#ffffff", "#fce7f3", "#ec4899"],
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=700&q=80",
    desc: "شومیز لطیف ساتن ابریشم با دکمه‌های مرواریدی دست‌دوز و تن‌خور آزاد و بسیار راحت."
  },
  {
    id: 4,
    title: "مانتو کتی لنین گلبهی",
    category: "coat",
    categoryLabel: "مانتو و پالتو",
    price: 1890000,
    oldPrice: 2150000,
    tag: "محدود",
    sizes: ["S", "M", "L"],
    colors: ["#fbcfe8", "#ffffff", "#be185d"],
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=700&q=80",
    desc: "مانتو کتی دوخت مزون رزا با پارچه لنین نخی تنفس‌پذیر و طراحی مینیمال در پالت سفید و صورتی."
  },
  {
    id: 5,
    title: "پیراهن مجلسی ارگانزا شکوفه",
    category: "dress",
    categoryLabel: "پیراهن و سارافون",
    price: 3120000,
    oldPrice: 3450000,
    tag: "مزونی",
    sizes: ["S", "M", "L"],
    colors: ["#fce7f3", "#f472b6"],
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80",
    desc: "پیراهن مجلسی رویایی با آستین‌های پفی ارگانزا و گلدوزی ظریف برجسته روی سینه."
  },
  {
    id: 6,
    title: "بافت موهر لطیف سفید برفی",
    category: "blouse",
    categoryLabel: "شومیز و بلوز",
    price: 1150000,
    oldPrice: 1350000,
    tag: "پاییزه و بهاره",
    sizes: ["Free"],
    colors: ["#ffffff", "#fbcfe8"],
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=80",
    desc: "پلیور بافت بسیار نرم و ضد خارش با ترکیب رنگ سفید صدفی و نوار صورتی ملایم."
  },
  {
    id: 7,
    title: "ست اسپرت مراکشی رزگلد",
    category: "suit",
    categoryLabel: "کت و ست مجلسی",
    price: 1740000,
    oldPrice: 1990000,
    tag: "پرفروش",
    sizes: ["M", "L", "XL"],
    colors: ["#f472b6", "#ffffff"],
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=700&q=80",
    desc: "ست راحتی و بیرون‌پوش با پارچه کرپ مراکشی بدون آبرفت و نیاز به اتوکشی."
  },
  {
    id: 8,
    title: "بارانی شیشه‌ای مروارید باران",
    category: "coat",
    categoryLabel: "مانتو و پالتو",
    price: 2290000,
    oldPrice: 2600000,
    tag: "ویژه",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#fce7f3", "#ec4899", "#ffffff"],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80",
    desc: "بارانی ضدآب با برش مدرن و کمربند قابل تنظیم، الهام‌گرفته از ترندهای روز اروپا."
  }
];

// تبدیل اعداد به فرمت فارسی
function formatPersianPrice(num) {
  return num.toLocaleString('fa-IR') + ' تومان';
}

// مدیریت سبد خرید و علاقه‌مندی‌ها در LocalStorage
let cart = JSON.parse(localStorage.getItem('rosa_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('rosa_wishlist') || '[]');

function saveCart() {
  localStorage.setItem('rosa_cart', JSON.stringify(cart));
  updateCartUI();
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

function addToCart(productId, selectedSize = 'M') {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId && item.size === selectedSize);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: selectedSize,
      qty: 1
    });
  }
  saveCart();
  showToast(`«${product.title}» (سایز ${selectedSize}) به سبد خرید اضافه شد 🛍️`);
}

function changeCartQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
}

function toggleWishlist(productId, btnEl) {
  const idx = wishlist.indexOf(productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    if (btnEl) btnEl.classList.remove('active');
    showToast('از لیست علاقه‌مندی‌ها حذف شد');
  } else {
    wishlist.push(productId);
    if (btnEl) btnEl.classList.add('active');
    showToast('به لیست علاقه‌مندی‌های شما اضافه شد 💖');
  }
  localStorage.setItem('rosa_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlist-count');
  if (badge) badge.textContent = wishlist.length.toLocaleString('fa-IR');
}

function updateCartUI() {
  const countEls = document.querySelectorAll('.cart-count-badge');
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  countEls.forEach(el => (el.textContent = totalQty.toLocaleString('fa-IR')));

  const itemsContainer = document.getElementById('cart-items-list');
  const totalPriceEl = document.getElementById('cart-total-price');
  if (!itemsContainer || !totalPriceEl) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align:center; padding: 50px 10px; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 10px;">🛍️</div>
        <p>سبد خرید شما در حال حاضر خالی است.</p>
      </div>
    `;
    totalPriceEl.textContent = '۰ تومان';
    return;
  }

  let total = 0;
  itemsContainer.innerHTML = cart.map((item, idx) => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.title}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">سایز: ${item.size}</div>
          <div class="cart-item-price">${formatPersianPrice(item.price)}</div>
          <div class="qty-box">
            <button class="qty-btn" onclick="changeCartQty(${idx}, 1)">+</button>
            <span>${item.qty.toLocaleString('fa-IR')}</span>
            <button class="qty-btn" onclick="changeCartQty(${idx}, -1)">−</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  totalPriceEl.textContent = formatPersianPrice(total);
}

// ایجاد کارت محصول
function createProductCardHTML(product) {
  const isWished = wishlist.includes(product.id) ? 'active' : '';
  const dotsHTML = product.colors.map(c => `<span class="color-dot" style="background:${c}"></span>`).join('');
  return `
    <article class="glass-card product-card">
      <div class="product-thumb">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <span class="product-tag">${product.tag}</span>
        <div class="product-actions-overlay">
          <button class="mini-action-btn ${isWished}" onclick="toggleWishlist(${product.id}, this)" title="افزودن به علاقه‌مندی">♥</button>
          <button class="mini-action-btn" onclick="openQuickView(${product.id})" title="مشاهده سریع">👁</button>
        </div>
      </div>
      <div class="product-body">
        <span class="product-cat">${product.categoryLabel}</span>
        <h3 class="product-title">${product.title}</h3>
        <div class="product-meta">
          <span>سایز: ${product.sizes.join('، ')}</span>
          <div class="color-dots">${dotsHTML}</div>
        </div>
        <div class="product-footer">
          <div class="price-wrap">
            <span class="old-price">${formatPersianPrice(product.oldPrice)}</span>
            <span class="current-price">${formatPersianPrice(product.price)}</span>
          </div>
          <button class="add-cart-btn" onclick="addToCart(${product.id}, '${product.sizes[0]}')">+ افزودن</button>
        </div>
      </div>
    </article>
  `;
}

// مودال نمایش سریع محصول
let currentQuickProduct = null;
let currentSelectedSize = 'M';

function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;
  currentQuickProduct = product;
  currentSelectedSize = product.sizes[0];

  const modal = document.getElementById('quickview-modal-overlay');
  const content = document.getElementById('quickview-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="background: var(--pink-50); height: 100%;">
      <img src="${product.image}" alt="${product.title}" style="width:100%; height:100%; max-height:460px; object-fit:cover;">
    </div>
    <div style="padding: 30px;">
      <span class="hero-tag" style="margin-bottom:10px;">${product.categoryLabel}</span>
      <h2 style="font-size:1.5rem; margin-bottom:10px;">${product.title}</h2>
      <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:16px;">${product.desc}</p>
      <div style="margin-bottom: 14px;">
        <span class="old-price" style="font-size:0.9rem; margin-left:10px;">${formatPersianPrice(product.oldPrice)}</span>
        <strong style="font-size:1.35rem; color:var(--pink-600);">${formatPersianPrice(product.price)}</strong>
      </div>
      <div>
        <label style="font-weight:700; font-size:0.88rem;">انتخاب سایز:</label>
        <div class="size-chips" id="modal-size-chips">
          ${product.sizes.map((s, i) => `
            <button type="button" class="size-chip ${i === 0 ? 'active' : ''}" onclick="selectModalSize('${s}', this)">${s}</button>
          `).join('')}
        </div>
      </div>
      <button class="btn btn-primary" style="width:100%;" onclick="addToCart(${product.id}, currentSelectedSize); closeQuickView();">
        افزودن به سبد خرید
      </button>
    </div>
  `;
  modal.classList.add('open');
}

function selectModalSize(size, btn) {
  currentSelectedSize = size;
  document.querySelectorAll('#modal-size-chips .size-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function closeQuickView() {
  const modal = document.getElementById('quickview-modal-overlay');
  if (modal) modal.classList.remove('open');
}

// راه‌اندازی اولیه در تمام صفحات
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  updateWishlistBadge();

  // رندر محصولات برگزیده در صفحه اصلی (index.html)
  const featuredGrid = document.getElementById('featured-products-grid');
  if (featuredGrid) {
    featuredGrid.innerHTML = PRODUCTS_DATA.slice(0, 4).map(createProductCardHTML).join('');
  }

  // رندر و فیلتر محصولات در صفحه فروشگاه (products.html)
  const catalogGrid = document.getElementById('catalog-products-grid');
  if (catalogGrid) {
    let activeCategory = new URLSearchParams(window.location.search).get('cat') || 'all';
    let searchQuery = '';
    let sortMode = 'newest';

    const renderCatalog = () => {
      let filtered = PRODUCTS_DATA.filter(item => {
        const matchCat = activeCategory === 'all' || item.category === activeCategory;
        const matchSearch = item.title.includes(searchQuery) || item.categoryLabel.includes(searchQuery);
        return matchCat && matchSearch;
      });

      if (sortMode === 'cheapest') filtered.sort((a, b) => a.price - b.price);
      if (sortMode === 'expensive') filtered.sort((a, b) => b.price - a.price);

      const countLabel = document.getElementById('catalog-count');
      if (countLabel) countLabel.textContent = `${filtered.length.toLocaleString('fa-IR')} کالا`;

      if (filtered.length === 0) {
        catalogGrid.innerHTML = `
          <div class="glass-card" style="grid-column: 1/-1; padding: 50px; text-align: center;">
            <h3>محصولی با این مشخصات پیدا نشد 🌸</h3>
            <p style="color:var(--text-muted); margin-top:8px;">لطفاً عبارت جستجو یا دسته‌بندی را تغییر دهید.</p>
          </div>
        `;
      } else {
        catalogGrid.innerHTML = filtered.map(createProductCardHTML).join('');
      }
    };

    // دکمه‌های دسته‌بندی
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
      if (pill.dataset.cat === activeCategory) {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      }
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.dataset.cat;
        renderCatalog();
      });
    });

    // جستجو و مرتب‌سازی
    const searchInput = document.getElementById('product-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value.trim();
        renderCatalog();
      });
    }

    const sortSelect = document.getElementById('product-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', e => {
        sortMode = e.target.value;
        renderCatalog();
      });
    }

    renderCatalog();
  }

  // باز و بسته کردن منوی موبایل
  const mobileBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('main-nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // باز و بسته کردن دراور سبد خرید
  const cartOpenBtns = document.querySelectorAll('.open-cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartCloseBtn = document.getElementById('close-cart-btn');

  const toggleCart = (open) => {
    if (!cartDrawer || !cartBackdrop) return;
    cartDrawer.classList.toggle('open', open);
    cartBackdrop.classList.toggle('open', open);
  };

  cartOpenBtns.forEach(btn => btn.addEventListener('click', () => toggleCart(true)));
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', () => toggleCart(false));
  if (cartBackdrop) cartBackdrop.addEventListener('click', () => toggleCart(false));

  // ثبت سفارش در سبد خرید
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('سبد خرید شما خالی است!');
        return;
      }
      cart = [];
      saveCart();
      toggleCart(false);
      showToast('سفارش شما با موفقیت ثبت شد! کد رهگیری پیامک می‌شود ✨');
    });
  }

  // فرم تماس با ما
  const contactForm = document.getElementById('rosa-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      contactForm.reset();
      showToast('پیام شما با موفقیت ارسال شد. کارشناسان ما به‌زودی با شما تماس می‌گیرند 🌷');
    });
  }
});
