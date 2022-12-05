// const { default: axios } = require("axios");

const nameSection = document.querySelector('#nameSection');
const nameInput = document.querySelector('#nameInput');
const nameSubmit = document.querySelector('#nameSubmit');
const clearNameButton = document.querySelector('#clearNameButton');
const characterName = document.querySelector('#characterName');

const storeViewSection = document.querySelector('#storeViewSection');
const openStoreButton = document.querySelector('#openStoreButton');
const closeStoreButton = document.querySelector('#closeStoreButton');
const storeSide = document.querySelector('#storeSide');
const storeSideInner = document.querySelector('#storeSideInner');
const pocketsSideInnerRenderedItems = document.querySelector('#pocketsSideInnerRenderedItems');
const storeItem = document.querySelectorAll('.renderedItem')

const pocketsViewSection = document.querySelector('#pocketsViewSection');
const pocketsViewInner = document.querySelector('#pocketsViewInner');
const pocketsViewInnerRenderedItems = document.querySelector('#pocketsViewInnerRenderedItems');
const openPocketsButton = document.querySelector('#openPocketsButton');
const closePocketsButton = document.querySelector('#closePocketsButton');
const clearPocketsButton = document.querySelector('#clearPocketsButton');

// add class='hide' to the sections that need to start out hidden (storeViewSection, pocketsViewSection)
storeViewSection.classList.add('hide');
pocketsViewSection.classList.add('hide');

const openPockets = () => {
    // show pocketsViewSection and hide the openPockets button
    pocketsViewSection.classList.remove('hide');
    openPocketsButton.classList.add('hide');
    pocketsViewInner.classList.add('hide');
    renderPocketItems();
}

const clearPockets = () => {
    // remove all pocket items
    pocketsViewInner.classList.remove('hide');
    deleteItems();
}

const closePockets = () => {
    // hide pocketsViewSection and show the openPockets button
    pocketsViewSection.classList.add('hide');
    openPocketsButton.classList.remove('hide');
}

const openStore = () => {
    // show storeViewSection and hide the openStore button
    storeViewSection.classList.remove('hide');
    openStoreButton.classList.add('hide');
    renderStoreItems();
}

const buyItem = (e) => {
    const itemId = e.target.parentElement.id;
    // delete store item with that id
    // add store item to pockets with that id
    axios.put(`http://localhost:3001/api/items/${itemId}`)
    .then((res) => {
        let item = res.data;
      let itemHTML = makeItemHTML(item);
      pocketsSideInnerRenderedItems.innerHTML += itemHTML;  
    }).catch((err) => console.log(err))
}

const closeStore = () => {
    // hide storeViewSection and show the openStore button
    storeViewSection.classList.add('hide');
    openStoreButton.classList.remove('hide');
}

const makeItemHTML = (item) => {
    return `
        <div class="renderedItem" id=${item.id}>
            <img class="renderedItemImage" src='${item.image}'/>
        </div>
    `
}

const renderPocketItems = () => {
    // use getAllItems function from server.js to render the items and then set the innerHTML of pocketsViewSection? to be those items
    axios.get('http://localhost:3001/api/items')
    .then(({data}) => {
        pocketsViewInnerRenderedItems.innerHTML = '';
        data.forEach(item => {
            let itemHTML = makeItemHTML(item)
            pocketsViewInnerRenderedItems.innerHTML += itemHTML;
        })
    }).catch((err) => console.log(err));
}

const renderStoreItems = () => {
    // use getAllItems function from server.js to render the items and then set the innerHTML of storeSideInner? to be those items
    axios.get('http://localhost:3001/api/items')
    .then(({data}) => {
        storeSideInner.innerHTML = '';
        data.forEach(item => {
            let itemHTML = makeItemHTML(item)
            storeSideInner.innerHTML += itemHTML;
        })
    }).catch((err) => console.log(err));
}

const deleteItems = () => {
    pocketsViewInnerRenderedItems.innerHTML = "";

}

const writeName = (e) => {
    e.preventDefault()
    let inputContent = nameInput.value
    const body = {
        inputContent
    }
    axios.post('http://localhost:3001/api/name', body)
    .then((res) => {
        characterName.textContent = `${res.data}`
    }).catch((err) => console.log(err))
}

const clearName = () => {
    let inputContent = ""
    const body = {inputContent}
    axios.delete('http://localhost:3001/api/nameDelete', body)
    .then((res) => {
        characterName.textContent = `${res.data}`
    })
}


openPocketsButton.addEventListener('click', openPockets);
clearPocketsButton.addEventListener('click', clearPockets);
closePocketsButton.addEventListener('click', closePockets);

openStoreButton.addEventListener('click', openStore);
storeSideInner.addEventListener('click', buyItem);
closeStoreButton.addEventListener('click', closeStore);

nameSubmit.addEventListener('click', writeName);
clearNameButton.addEventListener('click', clearName);





