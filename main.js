let products = document.querySelector("#products");
let input = document.querySelector("input");

let allProducts = [];

fetch('https://raw.githubusercontent.com/diyor011/apibest/master/api.json')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        allProducts = data;
        displayProducts(data);
    });

function displayProducts(data) {
    products.innerHTML = "";
    data.forEach((item, index) => {
        let card = document.createElement("div");
        card.className = 'bg-base-300 flex flex-col gap-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-5 rounded-lg shadow-lg border border-success mt-5 items-center mb-5 opacity-0 transition-opacity duration-500 ease-in-out';
        card.style.transitionDelay = `${index * 100}ms`; 
        card.innerHTML = `
            <div class="text-xl font-bold">${item.id}</div>
            <div class="flex items-center justify-center">
                <img src="${item.pic}" class="h-40 w-40 object-cover rounded-xl" alt="${item.name}" />
            </div>
            <div class="text-center mt-2">
                <p class="text-2xl text-primary font-semibold">${item.name}</p>
            </div>
            <div class="flex flex-col text-center mt-2">
                <p class="text-lg text-accent">$${item.price}</p>
                <p class="text-sm mt-1">${item.fulldesc}</p>
            </div>
        `;
        products.appendChild(card);
        setTimeout(() => {
            card.style.opacity = 1;
        }, 50);
    });
}

input.addEventListener('input', function () {
    let searchText = input.value.toLowerCase();
    let filteredProducts = allProducts.filter(item => item.name.toLowerCase().includes(searchText));
    products.style.opacity = 0;
    setTimeout(() => {
        displayProducts(filteredProducts);
        products.style.opacity = 1;
    }, 300); 
});
