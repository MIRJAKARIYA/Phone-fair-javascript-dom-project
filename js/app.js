// getting search field text
const searchPhone = () => {
    const searchText = document.getElementById('search-field');
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText.value}`)
    .then(res => res.json())
    .then(data => console.log(data))
    searchText.value = '';
}
