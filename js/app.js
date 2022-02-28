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
        
    }
}