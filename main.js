let loadingWrapper = document.querySelector("#loadingWrapper");
let products = document.querySelector("#products");
let input = document.querySelector("input");
let button = document.querySelector("button");

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
    data.map(item => {
        console.log(item);
        let card = document.createElement("div");
        card.className = 'bg-base-300 flex flex-col gap-2 w-1/4 max-w-[80%] mx-auto container p-10 rounded-lg shadow-lg shadow-emerald-500 border-2 border-success mt-10 items-center mb-10';
        card.innerHTML = `
            <div class="text-xl">${item.id}</div>
            <div class="flex items-center justify-center">
                <img src="${item.pic}" class="size-20 rounded-3xl" alt="" />
            </div>
            <div class="text-center">
                <p class="text-2xl text-primary">${item.name}</p>
            </div>
            <div class="flex flex-col text-center">
                <p class="text-base text-accent">$ ${item.price}</p>
                <p class="text-base">${item.fulldesc}</p>
            </div>
        `;
        products.appendChild(card);
    });
}

input.addEventListener('input', function () {
    let searchText = input.value.toLowerCase();
    let filteredProducts = allProducts.filter(item => item.name.toLowerCase().includes(searchText));
    displayProducts(filteredProducts);
});
