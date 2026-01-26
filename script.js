// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.querySelector('i').classList.toggle('fa-bars');
    navToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.querySelector('i').classList.add('fa-bars');
        navToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Cake Data
const cakes = [
    {
        id: 1,
        name: "Chocolate Dream",
        category: "birthday",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Rich chocolate cake with chocolate ganache and fresh berries",
        price: "£35",
        bestseller: true
    },
    {
        id: 2,
        name: "Vanilla Elegance",
        category: "wedding",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Classic vanilla cake with buttercream frosting and floral decorations",
        price: "£120",
        bestseller: true
    },
    {
        id: 3,
        name: "Red Velvet Delight",
        category: "anniversary",
        image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Moist red velvet cake with cream cheese frosting",
        price: "£45",
        bestseller: false
    },
    {
        id: 4,
        name: "Carrot Cake Special",
        category: "birthday",
        image: "https://images.unsplash.com/photo-1596223575327-99a5be4faf1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Spiced carrot cake with walnuts and cream cheese frosting",
        price: "£38",
        bestseller: false
    },
    {
        id: 5,
        name: "Berry Bliss Cupcakes",
        category: "cupcakes",
        image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Vanilla cupcakes with mixed berry frosting",
        price: "£24/dozen",
        bestseller: true
    },
    {
        id: 6,
        name: "Lemon Drizzle",
        category: "birthday",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Zesty lemon cake with lemon glaze and edible flowers",
        price: "£32",
        bestseller: false
    }
];

// Load cakes on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCakes('all');
    setupCategoryFilters();
    setupCustomOrder();
    setupContactForm();
    setMinDeliveryDate();
});

// Display cakes based on category
function displayCakes(category) {
    const cakesGrid = document.querySelector('.cakes-grid');
    cakesGrid.innerHTML = '';
    
    const filteredCakes = category === 'all' 
        ? cakes 
        : cakes.filter(cake => cake.category === category);
    
    filteredCakes.forEach(cake => {
        const cakeCard = document.createElement('div');
        cakeCard.className = 'cake-card';
        cakeCard.innerHTML = `
            <div class="cake-image">
                <img src="${cake.image}" alt="${cake.name}">
            </div>
            <div class="cake-info">
                ${cake.bestseller ? '<span class="cake-bestseller">Bestseller</span>' : ''}
                <h3 class="cake-title">${cake.name}</h3>
                <span class="cake-category">${cake.category.charAt(0).toUpperCase() + cake.category.slice(1)} Cake</span>
                <p class="cake-description">${cake.description}</p>
                <div class="cake-price">${cake.price}</div>
                <button class="btn btn-primary" onclick="orderCake(${cake.id})">Order Now</button>
            </div>
        `;
        cakesGrid.appendChild(cakeCard);
    });
}

// Setup category filter buttons
function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Filter cakes
            const category = btn.getAttribute('data-category');
            displayCakes(category);
        });
    });
}

// Order cake function
function orderCake(cakeId) {
    const cake = cakes.find(c => c.id === cakeId);
    alert(`Added ${cake.name} to your order! Proceed to custom order section to complete your order.`);
    window.location.href = '#custom';
}

// Custom Order Steps
let currentStep = 1;
let orderDetails = {
    type: '',
    flavor: '',
    size: '',
    message: '',
    date: ''
};

function nextStep(step) {
    if (step === 2 && !orderDetails.type) {
        alert('Please select a cake type');
        return;
    }
    if (step === 3 && !orderDetails.flavor) {
        alert('Please select a flavor');
        return;
    }
    
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${step}`).classList.add('active');
    currentStep = step;
}

function prevStep(step) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${step}`).classList.add('active');
    currentStep = step;
}

function setupCustomOrder() {
    // Cake type selection
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            orderDetails.type = card.getAttribute('data-type');
        });
    });
    
    // Flavor selection
    document.querySelectorAll('input[name="flavor"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            orderDetails.flavor = e.target.value;
        });
    });
}

function submitOrder() {
    orderDetails.size = document.getElementById('size').value;
    orderDetails.message = document.getElementById('message').value;
    orderDetails.date = document.getElementById('date').value;
    
    if (!orderDetails.size || !orderDetails.date) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real app, you would send this data to your server
    console.log('Order submitted:', orderDetails);
    
    // Show success message
    document.getElementById('step3').classList.remove('active');
    document.getElementById('step4').classList.add('active');
    currentStep = 4;
}

function resetForm() {
    // Reset all form values
    orderDetails = { type: '', flavor: '', size: '', message: '', date: '' };
    document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('input[name="flavor"]').forEach(r => r.checked = false);
    document.getElementById('size').selectedIndex = 0;
    document.getElementById('message').value = '';
    setMinDeliveryDate();
    
    // Go back to step 1
    document.getElementById('step4').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    currentStep = 1;
}

// Set minimum delivery date to tomorrow
function setMinDeliveryDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', formattedDate);
}

// Contact Form Submission
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In a real app, you would send this data to your server
        console.log('Contact form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you within 24 hours.');
        contactForm.reset();
    });
}

// Newsletter Form
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
        alert(`Thank you for subscribing with ${email}!`);
        e.target.reset();
    }
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});
