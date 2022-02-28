// getting search field text
const searchPhone = () => {
    const searchText = document.getElementById('search-field');
    if(searchText.value === ''){
        document.getElementById('error-message').style.display='block';
        document.getElementById('result-container').textContent='';
        document.getElementById('show-more-button').style.display='none';
        return;
    }
    document.getElementById('error-message').style.display='none';
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText.value}`)
    .then(res => res.json())
    .then(data => putResult(data.data));
    searchText.value = '';
};
// putting search results into result container
const putResult = phones => {
    const resultContainer = document.getElementById('result-container');
    resultContainer.textContent = '';
    if(phones.length>20){
        showLimit(0,phones,20) //showing 20 data if data>20
    }
    else{
        showLimit(0,phones,phones.length); //showing data <=20
    }
};
let products = []; //to contain the mobile data for show more button
//function to show result limitwise
const showLimit = (initialize,phones,limit) => {
    products= products.concat(phones);
    const resultContainer = document.getElementById('result-container');
    for(let i=initialize;i<limit;i++){
        const div = document.createElement('div');
        div.classList.add('col-md-6','col-lg-4');
        div.innerHTML = `
            <div class="product-container rounded-3 p-2 pb-3 h-100">
                <img src="${phones[i].image}" class="w-100 rounded-3 d-block img-style" alt="">
                <div class="product-info text-center">
                    <p class="mb-1 mt-3">Phone Name: <span>${phones[i].phone_name}</span></p>
                    <p class="mt-0">Brand: <span>${phones[i].brand}</span></p>
                    <div class="d-flex justify-content-center">
                        <button onclick="showDetails('${phones[i].slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        details
                        </button>
                        <button class="ms-2 btn btn-danger">Remove</button>
                    </div>
                </div>
            </div>
        `;
        console.log(limit)
        resultContainer.appendChild(div);
    }
    if(phones.length>20){
        document.getElementById('show-more-button').style.display='block';
    }
};
//showing full data as show more button is clicked
const showFullResult = () =>{
    showLimit(20,products,products.length);
    document.getElementById('show-more-button').style.display='none';
};
//showing details on modal
const showDetails = details => {
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
    .then(res => res.json())
    .then(data => putDetailsIntoModal(data.data));
};
const putDetailsIntoModal = mobile => {
    const sensors = mobile.mainFeatures.sensors.join(',');
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = 
    `
    <div class="d-flex justify-content-center">
        <img src="${mobile.image}">
    </div>
    <div class="mt-4">
        <div class="text-center"><span class="product-details-heading">Product name:</span> ${mobile.name}.</div>
        <div class="text-center"><span class="product-details-heading">Release date:</span> ${mobile.releaseDate?mobile.releaseDate:'no release date found'}.</div>
        <div class="mt-4">
            <h4 class="text-center mb-4 text-primary">Main features:</h4>
            <div><span class="product-details-heading">Storage:</span> ${mobile.mainFeatures.storage}.</div>
            <div><span class="product-details-heading">Display size:</span> ${mobile.mainFeatures.displaySize}.</div>
            <div><span class="product-details-heading">Chipset:</span> ${mobile.mainFeatures.chipSet}.</div>
            <div><span class="product-details-heading">merory:</span> ${mobile.mainFeatures.memory}.</div>
            <div><span class="product-details-heading">Sensors:</span> ${sensors}.</div>
        </div>
        <div class="mt-4">
            <h4 class="text-center text-primary mb-4">Other informations:</h4>
            <div>
                <div><span class="product-details-heading">WLAN:</span> ${mobile.others?.WLAN||'no information found'}.</div>
                <div><span class="product-details-heading">Blutooth:</span> ${mobile.others?.Bluetooth||'no information found'}.</div>
                <div><span class="product-details-heading">GPS:</span> ${mobile.others?.GPS||'no information found'}.</div>
                <div><span class="product-details-heading">NFC:</span> ${mobile.others?.NFC||'no information found'}.</div>
                <div><span class="product-details-heading">Radio:</span> ${mobile.others?.Radio||'no information found'}.</div>
                <div><span class="product-details-heading">USB:</span> ${mobile.others?.USB||'no information found'}.</div>
            </div>
        </div>
    </div>
    `;
};
//clearing modal body when close buttons are clicked
const clearModal = () => {
    document.getElementById('modalBody').textContent = '';
};
//remove button functionality
document.getElementById('result-container').addEventListener('click',event => {
    if(event.target.innerText === 'Remove'){
        event.target.parentNode.parentNode.parentNode.parentNode.style.display='none';
    }
})