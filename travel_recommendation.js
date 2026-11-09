const searchInput = document.getElementById('search');
const searchResults = document.getElementById('results');
const searchResultsSection = document.getElementById('results_section');
const heroSection = document.querySelector('.hero')
const searchBtn = document.getElementById('search_btn')
const resetBtn  = document.getElementById('reset_btn')
let recommendationsData = [];

async function fetchRecommendationsApiData(rawKeyword) {
    const keyword = rawKeyword.trim().toLowerCase();
    console.log(keyword)

    if (keyword !== 'beach' && keyword !== 'temple' && keyword !== 'country') {
        return "No data found"
    }

    try {
        const response = await fetch('travel_recommendation_api.json');
        const apiData = await response.json();
        console.log('apiData', apiData)
        if (keyword === 'beach') {
            return apiData.beaches
        } else if (keyword === 'temple') {
            return apiData.temples
        } else if (keyword === 'country') {
            return apiData.countries.map(country => country.cities).flat()
        }
    } catch(error) {
        console.error(error);
    }
}

async function displaySearchResults() {
    searchResults.innerHTML = ''
    heroSection.classList.add('hidden')
    searchResultsSection.classList.remove('hidden');
    recommendationsData = await fetchRecommendationsApiData(searchInput.value);
    console.log(recommendationsData)

    if (typeof recommendationsData !== 'object') {
        searchResults.innerHTML = '<p> No data found </p>'

    } else {
        for (const data of recommendationsData) {
            searchResults.innerHTML += `<div class="card">
            <img src=${data.imageUrl} alt=${data.name}>
            <h3>${data.name}</h3>
            <p>${data.description}</p>
        </div>`
        }
    }
}

function clearSearchResults() {
    searchInput.value = '';
    heroSection.classList.remove('hidden');
    searchResultsSection.classList.add('hidden');
}

searchBtn.addEventListener('click', displaySearchResults)
resetBtn.addEventListener('click', clearSearchResults)