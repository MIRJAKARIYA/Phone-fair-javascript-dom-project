// getting search field text
const searchPhone = () => {
    const searchText = document.getElementById('search-field');
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText.value}`)
    .then(res => res.json())
    .then(data => putResult(data.data))
    searchText.value = '';
}

// putting search results into result container
const putResult = phones => {
    const resultContainer = document.getElementById('result-container');
    for(const phone of phones){
        const div = document.createElement('div');
        div.classList.add('col-4');
        div.innerHTML = `
            <div class="product-container rounded-3 p-2 pb-3">
                <img src="${phone.image}" class="w-100 rounded-3 d-block img-style" alt="">
                <div class="product-info text-center">
                    <p class="mb-1 mt-3">Phone Name: <span>${phone.phone_name}</span></p>
                    <p class="mt-0">Brand: <span>${phone.brand}</span></p>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-success">Details</button>
                        <button class="ms-2 btn btn-danger">Remove</button>
                    </div>
                </div>
            </div>
        `;
        resultContainer.appendChild(div);
    }
}