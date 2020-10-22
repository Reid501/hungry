const button = document.querySelector('.button');
const container = document.querySelector('.container');
const input = document.querySelector('.input');
const errorMessage = document.querySelector('.errorMessage')
const api = 'https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i='

function getJSON(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () =>{
            if(xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                console.log(data)
                resolve(data);
            } else {
                reject( Error(xhr.statusText));
            }
        };
        xhr.onerror = () => reject( Error('A network error accured'))
        xhr.send();
    })
}

function makeRecipes(data){
    if (data.results.length === 0 || data.results.length === null){
        errorMessage.textContent = `Sorry, we don't have a recipe for this ingredient.`;
    } else {
        errorMessage.textContent = '';
    }
    data.results.map( item => {
        const section = document.createElement('section');
        container.appendChild(section);
        section.innerHTML = 
        `<h2>${item.title}</h2>
        <p class="ingredientsP"><span>Ingredients:</span> ${item.ingredients}</p>
        <img src="${item.thumbnail}">
        <button type="button"><a target="_blank" href="${item.href}">Recipe</a></button>`
    })
}

button.addEventListener('click', () => {
    
    if (input.value === '' || input.value === null){
        errorMessage.textContent = 'Oopse looks like you have not enetered and ingrediant.'
    } else {
    container.innerHTML = '';
    searchResult = api + input.value;
    getJSON(searchResult)
    .then(makeRecipes)
    .catch( err => console.log('mistake'))
    input.value = '';
    }
})