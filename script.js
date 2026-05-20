// ==========================================
// 1. Show current date and time on homepage
// ==========================================
function showDateTime() {
    const dateTimeElement = document.getElementById('currentDateTime');
    if (dateTimeElement) {
        setInterval(() => {
            const now = new Date();
            dateTimeElement.textContent = now.toLocaleString();
        }, 1000);
    }
}
showDateTime();

// ==========================================
// 2. Add to Cart System
// ==========================================
const cart = [];
function addToCart(item) {
    cart.push(item);
    alert(`${item} has been added to your cart!`);
    console.log('Cart:', cart);
}

// ==========================================
// 3. Reservation Form Validation
// ==========================================
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const guests = document.getElementById('guests').value.trim();
        const date = document.getElementById('date').value.trim();
        const time = document.getElementById('time').value.trim();

        if (!name || !email || !phone || !guests || !date || !time) {
            alert('Please fill in all required fields.');
            return;
        }

        alert('Thank you for your reservation! We will contact you shortly.');
    });
}

// ==========================================
// 4. Login/Signup Success Message
// ==========================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            alert('Please fill in all required fields.');
            return;
        }

        alert('Login successful! Welcome back.');
    });
}

const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!firstName || !lastName || !phone || !email || !username || !password) {
            alert('Please fill in all required fields.');
            return;
        }

        alert('Signup successful! Welcome to our platform.');
    });
}

// ==========================================
// 5. Quantity Increase/Decrease (Global)
// ==========================================
const increaseQuantity = document.getElementById('increaseQuantity');
const decreaseQuantity = document.getElementById('decreaseQuantity');
const quantityInput = document.getElementById('quantity');
if (increaseQuantity && decreaseQuantity && quantityInput) {
    increaseQuantity.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (!isNaN(quantity)) {
            quantityInput.value = quantity + 1;
        }
    });

    decreaseQuantity.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (!isNaN(quantity) && quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    });
}

// ==========================================
// 6. Smooth Scroll for Navigation
// ==========================================
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
            event.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ==========================================
// 7. Professional Footer Live Clock Synchronization (Fixed Glitch)
// ==========================================
function runClassicFooterClock() {
    const timeContainer = document.getElementById('footerLiveDateTime');
    if (timeContainer) {
        setInterval(() => {
            const current = new Date();
            const configOptions = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: true 
            };
            timeContainer.textContent = current.toLocaleString('en-US', configOptions);
        }, 1000);
    }
}
runClassicFooterClock();

// ==========================================
// 8. Platform Level Storage & Inventory Engine
// ==========================================
let catalogStateSelectedCategory = 'all';
let catalogStateSelectedPreference = 'all';

const searchInput = document.getElementById('menuLiveSearchQuery');
if (searchInput) {
    searchInput.addEventListener('input', function(event) {
        const structuralQueryText = event.target.value.toLowerCase().trim();
        reprocessCatalogInventoryFiltering(structuralQueryText);
    });
}

function executeCategoryFilter(categoryValueString, triggeringElement) {
    document.querySelectorAll('.navigation-list-engine .sidebar-filter-link').forEach(button => button.classList.remove('active'));
    if (triggeringElement) triggeringElement.classList.add('active');
    catalogStateSelectedCategory = categoryValueString;
    reprocessCatalogInventoryFiltering();
}

function executePreferenceFilter(preferenceValueString, triggeringElement) {
    catalogStateSelectedPreference = preferenceValueString;
    reprocessCatalogInventoryFiltering();
}

function reprocessCatalogInventoryFiltering(activeQueryString = '') {
    let executionVisibilityActiveCounter = 0;
    
    let currentActiveInputText = activeQueryString;
    const searchElement = document.getElementById('menuLiveSearchQuery');
    if (!currentActiveInputText && searchElement) {
        currentActiveInputText = searchElement.value.toLowerCase().trim();
    }

    document.querySelectorAll('.menu-item-data-container').forEach(cardWrapperNode => {
        const headingElement = cardWrapperNode.querySelector('.item-heading-anchor');
        const descElement = cardWrapperNode.querySelector('.text-clamp-description');
        
        const extractionHeadingText = headingElement ? headingElement.innerText.toLowerCase() : '';
        const extractionDescriptionText = descElement ? descElement.innerText.toLowerCase() : '';
        
        const configurationMatchesCategory = (catalogStateSelectedCategory === 'all' || cardWrapperNode.getAttribute('data-category') === catalogStateSelectedCategory);
        const configurationMatchesPreference = (catalogStateSelectedPreference === 'all' || cardWrapperNode.getAttribute('data-preference') === catalogStateSelectedPreference);
        const configurationMatchesSearchText = (!currentActiveInputText || extractionHeadingText.includes(currentActiveInputText) || extractionDescriptionText.includes(currentActiveInputText));

        if (configurationMatchesCategory && configurationMatchesPreference && configurationMatchesSearchText) {
            cardWrapperNode.style.display = 'block';
            executionVisibilityActiveCounter++;
        } else {
            cardWrapperNode.style.display = 'none';
        }
    });

    const metricCounterElement = document.getElementById('visibleCatalogMetricCount');
    if (metricCounterElement) {
        metricCounterElement.innerText = executionVisibilityActiveCounter;
    }
}

// Ensure DOM content is fully loaded before executing tracking hooks
document.addEventListener('DOMContentLoaded', function () {
    
    // NOTE: Purano duplicated footer clock-ti kete dewa hoyeche conflict thik korar jonno.

    // 2. Reservation Form Submit Interception Logic
    const restaurantForm = document.getElementById('restaurantReservationForm');
    if (restaurantForm) {
        restaurantForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const customerName = document.getElementById('name').value.trim();
            const customerPhone = document.getElementById('phone').value.trim();
            const totalGuestsSelect = document.getElementById('guests');
            const selectedGuestsText = totalGuestsSelect.options[totalGuestsSelect.selectedIndex].text;
            const selectedDate = document.getElementById('date').value;
            const totalTimeSelect = document.getElementById('time');
            const selectedTimeText = totalTimeSelect.options[totalTimeSelect.selectedIndex].text;

            if (!customerName || !customerPhone || !selectedGuestsText || !selectedDate || !selectedTimeText) {
                alert('Validation Error: Please fill all configuration variables.');
                return;
            }

            document.getElementById('modalName').innerText = customerName;
            document.getElementById('modalPhone').innerText = customerPhone;
            document.getElementById('modalGuests').innerText = selectedGuestsText;
            document.getElementById('modalTime').innerText = selectedTimeText;
            document.getElementById('modalDate').innerText = selectedDate;

            const modalDOMTarget = document.getElementById('reservationSummaryModal');
            if (modalDOMTarget) {
                const bootstrapPopupEngine = new bootstrap.Modal(modalDOMTarget);
                bootstrapPopupEngine.show();
            }

            restaurantForm.reset();
        });
    }
});

// Contact Form Submission Loop Handler
const contactForm = document.getElementById('restaurantContactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameVal = document.getElementById('contactName').value;
        const emailVal = document.getElementById('contactEmail').value;
        const subjectVal = document.getElementById('contactSubject').value;

        document.getElementById('modalContactName').textContent = nameVal;
        document.getElementById('modalContactEmail').textContent = emailVal;
        document.getElementById('modalContactSubject').textContent = subjectVal;

        const successModal = new bootstrap.Modal(document.getElementById('contactSuccessModal'));
        successModal.show();

        contactForm.reset();
    });
}

// --- Dish Details Functionalities ---
document.addEventListener('DOMContentLoaded', function () {
    const btnPlus = document.getElementById('btnPlus');
    const btnMinus = document.getElementById('btnMinus');
    const qtyInput = document.getElementById('dishQuantity');

    if (btnPlus && btnMinus && qtyInput) {
        btnPlus.addEventListener('click', function () {
            let currentVal = parseInt(qtyInput.value);
            if (!isNaN(currentVal)) {
                qtyInput.value = currentVal + 1;
            }
        });

        btnMinus.addEventListener('click', function () {
            let currentVal = parseInt(qtyInput.value);
            if (!isNaN(currentVal) && currentVal > 1) {
                qtyInput.value = currentVal - 1;
            }
        });
    }
});
