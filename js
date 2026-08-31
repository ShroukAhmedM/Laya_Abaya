/* ==========================================
   LAYA ABAYAS
   MAIN JAVASCRIPT
========================================== */


/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        name: "عباية كريب ملكي",
        price: 1550,
        category: "فخمة",
        image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 2,
        name: "عباية بتطريز راقي",
        price: 1650,
        category: "مناسبات",
        image:
        "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 3,
        name: "عباية سوداء كلاسيك",
        price: 1250,
        category: "يومية",
        image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 4,
        name: "عباية شمواه فاخرة",
        price: 1450,
        category: "فخمة",
        image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 5,
        name: "عباية مناسبات ناعمة",
        price: 1750,
        category: "مناسبات",
        image:
        "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 6,
        name: "عباية يومية أنيقة",
        price: 1150,
        category: "يومية",
        image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 7,
        name: "عباية حرير بتفاصيل ذهبية",
        price: 1890,
        category: "فخمة",
        image:
        "https://images.unsplash.com/photo-1544957992-20514f595d6f?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 8,
        name: "عباية عملية بقصة واسعة",
        price: 1290,
        category: "يومية",
        image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85"
    }

];



/* ================= CART ================= */

let cart =
    JSON.parse(
        localStorage.getItem("layaCart")
    ) || [];



/* ================= RENDER PRODUCTS ================= */

function renderProducts(list = products.slice(0,4)) {

    const grid =
        document.getElementById("productGrid");

    grid.innerHTML = "";

    list.forEach((product, index) => {

        const card =
        document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            ${
                index < 4
                ?
                <span class="badge">جديد</span>
                :
                ""
            }

            <button
                class="wish"
                onclick="toggleFavorite(this)"
            >
                ♡
            </button>

            <div
                class="product-image"
                style="
                    background-image:
                    url('${product.image}')
                "
            ></div>

            <div class="product-info">

                <div class="product-name">
                    ${product.name}
                </div>

                <div class="price">
                    ${product.price.toLocaleString("ar-EG")}
                    جنيه
                </div>

                <div class="swatches">

                    <i style="background:#111"></i>

                    <i style="background:#9c8d7a"></i>

                    <i style="background:#d7d0c8"></i>

                </div>

                <button
                    class="outline-button"
                    style="
                        width:100%;
                        margin-top:10px;
                        padding:7px;
                    "
                    onclick="addToCart(${product.id})"
                >
                    أضيفي للسلة
                </button>

            </div>
        `;

        grid.appendChild(card);

    });

}



/* ================= FAVORITE ================= */

function toggleFavorite(button) {

    button.classList.toggle("active");

    if (button.classList.contains("active")) {

        button.innerHTML = "♥️";

    } else {

        button.innerHTML = "♡";

    }

}



/* ================= ADD TO CART ================= */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) return;


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

}



/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "layaCart",
        JSON.stringify(cart)
    );

}



/* ================= CART COUNT ================= */

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    document.getElementById(
        "cartCount"
    ).textContent = count;

}



/* ================= OPEN CART ================= */

function openCart() {

    document
        .getElementById("cartModal")
        .classList.add("show");


    renderCart();

}



/* ================= RENDER CART ================= */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    if (cart.length === 0) {

        container.innerHTML = `

            <p
                style="
                    text-align:center;
                    padding:30px;
                    color:#777;
                "
            >
                السلة فارغة حالياً
            </p>

        `;

        document.getElementById(
            "cartTotal"
        ).textContent = "0 جنيه";

        return;

    }


    container.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;


        const row =
            document.createElement("div");

        row.className = "cart-row";


        row.innerHTML = `

            <span>
                ${item.name}
                ×
                ${item.quantity}
            </span>

            <strong>
                ${
                    (
                        item.price *
                        item.quantity
                    ).toLocaleString("ar-EG")
                }
                جنيه
            </strong>

            <button
                onclick="
                    removeFromCart(${item.id})
                "
            >
                حذف
            </button>

        `;


        container.appendChild(row);

    });


    document.getElementById(
        "cartTotal"
    ).textContent =
        total.toLocaleString("ar-EG")
        + " جنيه";

}



/* ================= REMOVE FROM CART ================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    updateCartCount();

    renderCart();

}



/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("show");

}



/* ================= SEARCH ================= */

function openSearch() {

    document
        .getElementById("searchModal")
        .classList.add("show");


    document
        .getElementById("searchInput")
        .focus();


    searchProducts();

}



function closeSearch() {

    document
        .getElementById("searchModal")
        .classList.remove("show");

}



function searchProducts() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const query =
        input.value.trim();


    const results =
        products.filter(product =>

            product.name.includes(query) ||

            product.category.includes(query)

        );


    const container =
        document.getElementById(
            "searchResults"
        );


    if (!results.length) {

        container.innerHTML = `

            <p
                style="
                    text-align:center;
                    padding:20px;
                "
            >
                لا توجد نتائج
            </p>

        `;

        return;

    }


    container.innerHTML = "";


    results.forEach(product => {

        const result =
            document.createElement("div");

        result.className =
            "search-result";


        result.innerHTML = `

            <strong>
                ${product.name}
            </strong>

            <br>

            <small>
                ${
                    product.price.toLocaleString("ar-EG")
                }
                جنيه
            </small>

        `;


        result.onclick = () => {

            addToCart(product.id);

            closeSearch();

        };


        container.appendChild(result);

    });

}



/* ================= FILTER ================= */

function filterProducts(category) {

    const filtered =
        products.filter(
            product =>
                product.category === category
        );


    renderProducts(filtered);


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* ================= SHOW ALL ================= */

function showAllProducts() {

    renderProducts(products);

}



/* ================= MOBILE MENU ================= */

function toggleMenu() {

    document
        .getElementById("mobileMenu")
        .classList.toggle("open");

}



/* ================= WHATSAPP ================= */

function openWhatsApp() {

    const phone =
        "201000000000";

    const message =
        encodeURIComponent(
            "مرحباً LAYA، أريد الاستفسار عن العبايات المتاحة."
        );


    window.open(
        https://wa.me/${phone}?text=${message},
        "_blank"
    );

}



/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        alert("السلة فارغة");

        return;

    }


    let message =
        "مرحباً LAYA، أريد تأكيد طلبي:%0A%0A";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        total += itemTotal;


        message +=
            - ${item.name} × ${item.quantity}%0A;

    });


    message +=
        %0Aالإجمالي: ${total} جنيه;


    const phone =
        "201000000000";


    window.open(
        https://wa.me/${phone}?text=${message},
        "_blank"
    );

}



/* ================= HERO SLIDER ================= */

const slides = [

    {
        title: "أناقة تليق بك",

        text:
        "تشكيلة فاخرة من العبايات<br>" +
        "بتصاميم راقية وجودة عالية",

        image:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=85"
    },


    {
        title: "تفاصيل تخطف الأنظار",

        text:
        "تطريزات راقية ولمسات ذهبية<br>" +
        "صممت لتناسب مناسباتك",

        image:
        "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=1800&q=85"
    },


    {
        title: "بساطة لا تُنسى",

        text:
        "قصّات يومية أنيقة<br>" +
        "لإطلالة مريحة وفاخرة",

        image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=85"
    },


    {
        title: "فخامة LAYA",

        text:
        "اختاري عبايتك المفضلة<br>" +
        "واجعلي كل لحظة أكثر أناقة",

        image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1800&q=85"
    }

];


let currentSlide = 0;



function changeSlide(index) {

    currentSlide = index;


    const slide =
        slides[index];


    document.getElementById(
        "heroTitle"
    ).textContent =
        slide.title;


    document.getElementById(
        "heroText"
    ).innerHTML =
        slide.text;


    document.getElementById(
        "heroImage"
    ).style.backgroundImage =

        `
        linear-gradient(
            90deg,
            rgba(0,0,0,.05),
            rgba(0,0,0,.78)
        ),
        url('${slide.image}')
        `;


    document
        .querySelectorAll(".dot")
        .forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentSlide
                );

            }
        );

}



/* AUTO SLIDER */

setInterval(
    () => {

        currentSlide++;

        if (
            currentSlide >=
            slides.length
        ) {

            currentSlide = 0;

        }


        changeSlide(
            currentSlide
        );

    },

    5000
);



/* ================= INITIALIZE ================= */

renderProducts();

updateCartCount();