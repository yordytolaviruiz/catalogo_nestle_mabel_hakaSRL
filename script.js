// Categorías
const categories = [
    'TODOS',
    'CHOCOLATES',
    'GALLETAS',
    'NESCAFE',
    'LACTEOS',
    'CULINARIOS',
    'CEREALES'
];

// Estado de la aplicación
let activeCategory = 'TODOS';
let mobileMenuOpen = false;

// Elementos del DOM
const navDesktop = document.getElementById('navDesktop');
const navMobile = document.getElementById('navMobile');
const navMobileButtons = document.getElementById('navMobileButtons');
const productsGrid = document.getElementById('productsGrid');
const categoryTitle = document.getElementById('categoryTitle');
const productCount = document.getElementById('productCount');
const emptyState = document.getElementById('emptyState');
const menuBtn = document.getElementById('menuBtn');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

// Inicializar la aplicación
function init() {
    renderNavigation();
    filterProductsByCategory(); // <-- Nueva función para filtrar
    setupEventListeners();
}

// Renderizar navegación
function renderNavigation() {
    // Desktop
    navDesktop.innerHTML = categories.map(cat => 
        `<button class="nav-btn ${cat === activeCategory ? 'active' : ''}" 
                onclick="changeCategory('${cat}')">
            ${cat}
        </button>`
    ).join('');
    
    // Mobile
    navMobileButtons.innerHTML = categories.map(cat => 
        `<button class="nav-btn ${cat === activeCategory ? 'active' : ''}" 
                onclick="changeCategory('${cat}'); toggleMobileMenu();">
            ${cat}
        </button>`
    ).join('');
}

// Cambiar categoría
function changeCategory(category) {
    activeCategory = category;
    renderNavigation();
    filterProductsByCategory(); // <-- Filtramos productos al cambiar
}

// --- NUEVA FUNCIÓN PARA FILTRAR PRODUCTOS (basada en el DOM) ---
function filterProductsByCategory() {
    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;

    productCards.forEach(card => {
        // Obtenemos la categoría del atributo data-category
        const cardCategory = card.getAttribute('data-category');
        
        if (activeCategory === 'TODOS' || cardCategory === activeCategory) {
            card.classList.remove('hidden'); // Mostrar
            visibleCount++;
        } else {
            card.classList.add('hidden'); // Ocultar
        }
    });

    // Actualizar el título y el contador
    categoryTitle.textContent = activeCategory;
    productCount.textContent = `${visibleCount} productos disponibles`;

    // Mostrar u ocultar el estado vacío
    if (visibleCount === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}
// --- FIN DE LA NUEVA FUNCIÓN ---

// Toggle menú móvil
function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        navMobile.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        navMobile.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Configurar event listeners
function setupEventListeners() {
    menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Cerrar menú móvil al hacer click fuera
    navMobile.addEventListener('click', (e) => {
        if (e.target === navMobile) {
            toggleMobileMenu();
        }
    });
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);