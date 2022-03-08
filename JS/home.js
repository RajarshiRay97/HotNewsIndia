// .js file for home page

// Initialize the country code and apiKey
const countryCode = "in";         // India
const apiKey = "8e77f42e76cd47c6852f605b1cc6d5d4";

// Create an xhr object
const xhr = new XMLHttpRequest();

// open xhr object
xhr.open('GET',`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${apiKey}`,true);

// send xhr object request
xhr.send();

// When the response is ready
xhr.onload = function (){
    if (this.status === 200){
        let topNewsObj = JSON.parse(this.responseText);
        // console.log(topNewsObj);
        let articlesArray = topNewsObj.articles;
        let slideBox = document.getElementById('slideBox');
        let pageButton = document.getElementById('pageButton');
        let pageStr = "";
        let btnStr = "";
        let pageCount = 0;
        for (let i=0;i<articlesArray.length;i++){
            if (articlesArray[i].urlToImage !== null){
                if (pageCount === 0){
                    pageStr += `<div class="carousel-item active">
                                    <a class="topNews" href="${articlesArray[i].url}" target="_blanked">
                                        <div class="topNewsHeading">
                                            <h4 class="newsTitle">"${articlesArray[i].title.slice(0,articlesArray[i].title.lastIndexOf('-')-1)}"</h4>
                                            <h3 class="newsSource"> -- ${articlesArray[i].title.slice(articlesArray[i].title.lastIndexOf('-')+2,)}</h3>
                                        </div>
                                        <img class="topNewsImg" src="${articlesArray[i].urlToImage}" alt="">
                                    </a>
                                </div>`;
                    pageCount++;
                    btnStr += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${pageCount-1}" class="active" aria-current="true" aria-label="Slide ${pageCount}"></button>`;
                }
                else{
                    pageStr += `<div class="carousel-item">
                                    <a class="topNews" href="${articlesArray[i].url}" target="_blanked">
                                        <div class="topNewsHeading">
                                            <h4 class="newsTitle">"${articlesArray[i].title.slice(0,articlesArray[i].title.lastIndexOf('-')-1)}"</h4>
                                            <h3 class="newsSource"> -- ${articlesArray[i].title.slice(articlesArray[i].title.lastIndexOf('-')+2,)}</h3>
                                        </div>
                                        <img class="topNewsImg" src="${articlesArray[i].urlToImage}" alt="">
                                    </a>
                                </div>`;
                    pageCount++;
                    btnStr += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${pageCount-1}" aria-label="Slide ${pageCount}"></button>`;
                }
            }
            if (pageCount === 5){
                break;
            }
        }
        slideBox.innerHTML = pageStr;
        pageButton.innerHTML = btnStr
    }
    else{
        console.log("Some error occured");
    }
}