const api_key = '5a2036cbea474258b2e3678914a61475'
const url = 'https://newsapi.org/v2/everything?q='

window.addEventListener("load",()=>{
    return fetchNews("India")
})

async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${api_key}`);
    const data = await response.json();
    bindData(data.articles)
}

function bindData(articles){
    const card_container = document.querySelector('#card-container')
    const template = document.querySelector('#template-news-card')

    card_container.innerHTML = '';
    articles.forEach((article) => {
        if(!article.urlToImage) return // articles that do not have image do not show
        const cardClone = template.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        card_container.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    console.log(newsImg.src);
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, '_blank');
    })

}
let currSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navitem = document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navitem;
    currSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('news-btn');
const searchText = document.getElementById('news-input');
searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query){
       return;
    }
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;
})