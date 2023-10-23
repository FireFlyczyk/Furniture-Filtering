const productsContainer = document.querySelector('.products-container');
const searchInput = document.querySelector('.search-input');
const companiesDOM = document.querySelector('.companies');

let filteredProducts = [...products];

/**
 * Displays the products on the webpage based on the filteredProducts array.
 *
 * @return {undefined} No return value.
 */
const displayProducts = () => {
  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
  } else {
    productsContainer.innerHTML = filteredProducts
      .map(({ id, title, image, price }) => {
        return `<article class="product" data-id="${id}">
          <img src="${image}" class="product-img img" />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">${price}</span>
          </footer>
        </article>`;
      })
      .join('');
  }
};

/**
 * Filters the products based on the given text and displays them.
 *
 * @param {string} text - The text to filter the products by.
 * @return {undefined} - This function does not return a value.
 */
const filterProductsByText = (text) => {
  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(text);
  });
  displayProducts();
};

/**
 * Filters the products by company.
 *
 * @param {string} company - The company to filter by.
 * @return {undefined} No return value.
 */
const filterProductsByCompany = (company) => {
  if (company === 'all') {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter((product) => {
      return product.company === company;
    });
  }
  searchInput.value = '';
  displayProducts();
};

searchInput.addEventListener('keyup', () => {
  const inputValue = searchInput.value.toLowerCase();
  filterProductsByText(inputValue);
});

companiesDOM.addEventListener('click', (event) => {
  const element = event.target;
  if (element.classList.contains('company-btn')) {
    filterProductsByCompany(element.dataset.id);
  }
});

/**
 * Generates and displays buttons for each unique company in the products array.
 *
 * @param {none} - This function does not accept any parameters.
 * @return {none} - This function does not return any value.
 */
const displayButtons = () => {
  const buttons = [
    'all',
    ...new Set(products.map((product) => product.company)),
  ];
  companiesDOM.innerHTML = buttons
    .map((company) => {
      return `<button class="company-btn" data-id="${company}">${company}</button>`;
    })
    .join('');
};

displayButtons();
