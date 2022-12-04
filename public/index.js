

const nameInput = document.querySelector('#nameInput');
const nameSubmit = document.querySelector('#nameSubmit');
const characterName = document.querySelector('#characterName');
const nameSection = document.querySelector('#nameSection');

const storeViewSection = document.querySelector('#storeViewSection');
const openStoreButton = document.querySelector('#openStoreButton');
const closeStoreButton = document.querySelector('#closeStoreButton');
const storeSide = document.querySelector('#storeSide');

const pocketsViewSection = document.querySelector('#pocketsViewSection');
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
    renderStoreItems();
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
}

const closeStore = () => {
    // hide storeViewSection and show the openStore button
    storeViewSection.classList.add('hide');
    openStoreButton.classList.remove('hide');
}

const makeItemHTML = (item) => {
    return `
        <div>
            <img src='${item.image}/>
        </div>
    `
}

const renderStoreItems = () => {
    // use getAllItems function from server.js to render the items and then set the innerHTML of pocketsViewSection? to be those items
    axios.get('/api/getAllItems')
    .then((data) => {
        data.forEach(item => {
            let itemHTML = makeItemHTML(item);
            pocketsViewSection.innerHTML += itemHTML;
        })
    })
}

const writeName = (e) => {
    e.preventDefault()
    let inputContent = nameInput.value
    const body = {
        inputContent
    }
    axios.post('/api/name', body)
    .then((res) => {
        characterName.textContent = `${res.data}`
    }).catch((err) => console.log(err))
}
    // axios.post('/api/name', body)
    // .then((res) => {
    //     characterName.textContent = `${res.data}`
    // }).catch((err) => console.log(err))
    // let inputContent = nameInput.value
    // console.log(inputContent)
    // characterName.textContent = `${inputContent}`

// clear name function here


openPocketsButton.addEventListener('click', openPockets);
closePocketsButton.addEventListener('click', closePockets);

openStoreButton.addEventListener('click', openStore);
closeStoreButton.addEventListener('click', closeStore);

nameSection.addEventListener('submit', writeName);





