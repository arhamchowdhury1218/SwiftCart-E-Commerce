const manageSpinner = (isLoading) => {
  const spinner = document.getElementById("loading-section");
  const productContainer = document.getElementById("products-container");
  if (isLoading) {
    spinner.classList.remove("hidden");
    productContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    productContainer.classList.remove("hidden");
  }
};

const loadProducts = () => {
  manageSpinner(true);
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      console.log("Data received:", data);
      const topRatedProducts = data.filter(
        (product) => product.rating.rate >= 4.7,
      );
      console.log("Top rated products:", topRatedProducts);
      const topThreeProducts = topRatedProducts.slice(0, 3);
      displayProducts(topThreeProducts);

      // displayProducts(data);
    });
};

const loadCategories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((categories) => {
      console.log("Categories received:", categories);
      displayCategories(categories);
    });
};

const loadProductsByCategory = (category) => {
  manageSpinner(true);
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(`Products in category "${category}":`, data);
      displayProducts(data);
    });
};

const loadProductDetails = (productId) => {
  manageSpinner(true);
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Product details:", data);
      displayProductDetails(data);
    });
};

const addToCart = (productId) => {
  console.log(`Product with ID ${productId} added to cart.`);
  const cartCountElement = document.getElementById("cart-count");
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  cartCount = cartCount + 1;
  localStorage.setItem("cartCount", cartCount);
  cartCountElement.textContent = cartCount;
};

const displayProductDetails = (product) => {
  const productDetailsContainer = document.getElementById("product-details");
  productDetailsContainer.innerHTML = `
    <div class="card bg-base-100 w-96 shadow-sm border border-gray-200 mx-auto">
      <div class="flex items-center justify-center bg-gray-200 p-10">
        <figure>
          <img class="h-40 w-40" src="${product.image}" alt="${product.title}" />
        </figure>
      </div>
      <div class="card-body">
        <h2 class="card-title">${product.title}</h2>
        <p>${product.description}</p>
       <div class="card-actions justify-between">
            <p class="font-bold text-2xl">$${product.price}</p>
            <div class="flex items-center gap-1">
            <img class="h-4 w-4" src="/Assets/star.png" alt="Star Logo" />
            <p>${product.rating.rate}(${product.rating.count})</p>
        </div>
    </div>
       
        <div class="card-actions justify-between mt-4">
          <button class="btn btn-primary">
            <i class="fa-solid fa-cart-arrow-down"></i>Buy Now
          </button>
          <button onclick="addToCart(${product.id})" class="btn btn-neutral btn-outline">
            <i class="fa-solid fa-cart-shopping"></i>Add to Cart
          </button>

          
        </div>
      </div>
    </div>`;
  productmodal = document.getElementById("my_modal_5");
  productmodal.showModal();
  manageSpinner(false);
};

const displayCategories = (categories) => {
  console.log("Displaying categories:", categories);
  const categoriesContainer = document.getElementById("categories-list");
  console.log("Categories container element:", categoriesContainer);
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryButton = document.createElement("button");
    categoryButton.classList.add("btn", "btn-primary", "btn-outline", "m-2");
    console.log("Creating button for category:", category);
    categoryButton.innerHTML = category;
    categoryButton.addEventListener("click", () => {
      console.log(`Category "${category}" button clicked`);
      loadProductsByCategory(category);
    });
    categoriesContainer.appendChild(categoryButton);
  });
};

const displayProducts = (products) => {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add(
      "card",
      "bg-base-100",
      "w-96",
      "shadow-sm",
      "border",
      "border-gray-200",
      "mx-auto",
      "gap-3",
    );
    productDiv.innerHTML = `
    <div class="flex items-center justify-center bg-gray-200 p-10">

      <figure>
            <img
              class="h-40 w-40"
              src="${product.image}"
              alt="${product.title}"
            />
          </figure>
          </div>
          <div class="card-body">
            <div>
              <div class="card-actions justify-between">
                <div class="badge badge-soft badge-primary bg-gray-200">
                    ${product.category}
                </div>
                <div class="flex items-center gap-1">
                  <img class="h-4 w-4" src="/Assets/star.png" alt="Star Logo" />
                  <p>${product.rating.rate}(${product.rating.count})</p>
                </div>
              </div>
              <div></div>
            </div>

            <h2 class="card-title">${product.title}</h2>
            <p class="font-bold text-2xl">$${product.price}</p>
            <div class="card-actions justify-between mt-4">
              <button
               onclick="loadProductDetails(${product.id})" class="btn btn-neutral btn-outline">
                <i class="fa-regular fa-eye"></i>Detail
              </button>

              <button class="btn btn-primary">
                <i class="fa-solid fa-cart-shopping"></i>Buy Now
              </button>
            </div>
          </div>
    `;
    productsContainer.appendChild(productDiv);
    manageSpinner(false);
  });
};

loadProducts();
