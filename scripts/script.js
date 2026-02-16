const loadProducts = () => {
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
              <button class="btn btn-neutral btn-outline">
                <i class="fa-regular fa-eye"></i>Detail
              </button>

              <button class="btn btn-primary">
                <i class="fa-solid fa-cart-shopping"></i>Buy Now
              </button>
            </div>
          </div>
    `;
    productsContainer.appendChild(productDiv);
  });
};

loadProducts();
