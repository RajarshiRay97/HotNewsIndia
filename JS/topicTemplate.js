// .js Template file for busines-news.html, entertainment-news.html, health-news.html, science-news.html, sports-news.html, technology-news.html

// function for converting sec into hr, min, sec
function timeAgo(diffInsec){
  let sec = diffInsec%60;
  let min = (Math.floor(diffInsec/60))%60;
  let hr = Math.floor((Math.floor(diffInsec/60))/60);
  if (hr === 0){
    if (min === 0){
      if (sec === 0){
        return `Currently Published`;
      }
      else if(sec === 1){
        return `${sec} second ago`;
      }
      else{
        return `${sec} seconds ago`;
      }
    }
    else{
      if (min === 1){
        return `${min} minute ago`;
      }
      else{
        return `${min} minutes ago`;
      }
    }
  }
  else{
    if (hr === 1){
      return `${hr} hour ago`;
    }
    else{
      return `${hr} hours ago`;
    }
  }
}

// function to get how much time ago the news is published
function getPublishTime(publishTime,currentTime){
  let publishYear = Number(publishTime.substr(0,4)); 
  let publishMonth = Number(publishTime.substr(5,2));
  let publishDate = Number(publishTime.substr(8,2));
  let publishHr = Number(publishTime.substr(11,2));
  let publishMin = Number(publishTime.substr(14,2));
  let publishSec = Number(publishTime.substr(17,2));
  let currentYear = currentTime.getFullYear(); 
  let currentMonth = currentTime.getMonth()+1;
  let currentDate = currentTime.getDate();  
  let currentHr = currentTime.getHours();
  let currentMin = currentTime.getMinutes();
  let currentSec = currentTime.getSeconds();
  let publishTimeInSec = (((publishHr*60)+publishMin)*60)+publishSec;
  let currentTimeInSec = (((currentHr*60)+currentMin)*60)+currentSec;
  let timeDiff = currentTimeInSec - publishTimeInSec;
  let modTimeDiff;
  if (publishYear === currentYear){
    if (publishMonth === currentMonth){
      if (publishDate === currentDate){
        return timeAgo(timeDiff);
      }
      else if((currentDate - publishDate) === 1){
        if (timeDiff >= 0){
          return `Yesterday`;
        }
        else{
          modTimeDiff = timeDiff + (24*60*60);
          return timeAgo(modTimeDiff);
        }
      }
      else{
        return `${currentDate - publishDate} days ago`;
      }
    }
    else if((currentMonth - publishMonth) === 1){
      if ((currentDate - publishDate)<0){
        if (publishMonth === 1 || publishMonth === 3 || publishMonth === 5 || publishMonth === 7 || publishMonth === 8 || publishMonth === 10 || publishMonth === 12){
          if ((currentDate-publishDate+31) === 1){
            if (timeDiff >= 0){
              return `Yesterday`;
            }
            else{
              modTimeDiff = timeDiff + (24*60*60);
              return timeAgo(modTimeDiff);
            }
          }
          else{
            return `${currentDate-publishDate+31} days ago`;
          }
        }
        else if (publishMonth === 2){
          if ((currentDate-publishDate+28) === 1){
            if (timeDiff >= 0){
              return `Yesterday`;
            }
            else{
              modTimeDiff = timeDiff + (24*60*60);
              return timeAgo(modTimeDiff);
            }
          }
          else{
            return `${currentDate-publishDate+28} days ago`;
          }
        }
        else{
          if ((currentDate-publishDate+30) === 1){
            if (timeDiff >= 0){
              return `Yesterday`;
            }
            else{
              modTimeDiff = timeDiff + (24*60*60);
              return timeAgo(modTimeDiff);
            }
          }
          else{
            return `${currentDate-publishDate+30} days ago`;
          }
        }
      }
      else{
        return `${currentMonth - publishMonth} month ago`;
      }
    }
    else{
      return `${currentMonth - publishMonth} months ago`;
    }
  }
  else if((currentYear - publishYear) === 1){
    if ((currentDate-publishDate+31) === 1){
      if (timeDiff >= 0){
        return `Yesterday`;
      }
      else{
        modTimeDiff = timeDiff + (24*60*60);
        return timeAgo(modTimeDiff);
      }
    }
    else{
      return `${currentDate-publishDate+31} days ago`;
    }
  }
}

// To expend when we click on Arrow(expend) Button
function expandContent(index){
  document.getElementById(`${parseInt(index)}content`).style.display = 'block';
  document.getElementById(index).parentNode.querySelector('.fullStory').style.visibility = 'visible';
  document.getElementById(index).innerHTML = `<div class="close"></div>`;
  document.getElementById(index).setAttribute('onclick','closeContent(this.id)');
}

// To close when we click on Arrow(close) Button
function closeContent(index){
  document.getElementById(`${parseInt(index)}content`).style.display = 'none';
  document.getElementById(index).parentNode.querySelector('.fullStory').style.visibility = 'hidden';
  document.getElementById(index).innerHTML = `<div class="expand"></div>`;
  document.getElementById(index).setAttribute('onclick','expandContent(this.id)');
}

// function to change the color from black to blue when the mouse is over the arrow button
function changeColorToBlue(index){
  document.getElementById(index).getElementsByTagName('div')[0].style.backgroundColor = '#1a73e8';
}

// function to change the color from blue to black when the mouse is outside of the arrow button
function changeColorToBlack(index){
  document.getElementById(index).getElementsByTagName('div')[0].style.backgroundColor = '#353535';
}




// Initialize the country code and apiKey
const countryCode = "in";         // India
const categoryName =  document.title.slice(document.title.indexOf("-")+2,document.title.lastIndexOf("-")-1).toLowerCase();
const apiKey = "8e77f42e76cd47c6852f605b1cc6d5d4";

// Create an xhr object
const xhr = new XMLHttpRequest();

// open xhr object
xhr.open('GET',`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${categoryName}&apiKey=${apiKey}`,true);

// send xhr object request
xhr.send();

// When the response is ready
xhr.onload = function (){
    if (this.status === 200){
        let topNewsObj = JSON.parse(this.responseText);
        let articlesArray = topNewsObj.articles;
        let str = "";
        articlesArray.forEach(function (element,index){
          let emptydescription = "";
          let author = element.title.slice(element.title.lastIndexOf('-')+2,)+" Special Correspondent";
          if (element.content !== null && element.urlToImage !== null){
            str +=  `<div class="newsItem">
                      <div class="newsBox">
                        <div class="newsText">
                          <div class="newsTitle"><h4>${element.title.slice(0,element.title.lastIndexOf('-')-1)}</h4></div>
                          <div class="sourceAndTime">
                            <small class="text-muted">${element.source.name}</small>
                            <div class="dot"></div>
                            <small class="text-muted">${getPublishTime(element.publishedAt,new Date())}</small>
                          </div>
                          <div class="descriptionAndAuthor">
                            <p class="description">
                              ${element.description !== null?element.description:emptydescription}
                            </p>
                            <p class="text-muted author"> <span class="blueAuthor">Author</span> - ${element.author !== null?element.author:author}</p>
                          </div>
                        </div>
                        <div class="newsImg">
                          <img src="${element.urlToImage}" alt="">
                        </div>
                      </div>
                      <div class="contentBox" id="${index+1}content">
                        <p>${element.content.slice(0,element.content.lastIndexOf('['))}</p>
                      </div>
                      <div class="buttonSection">
                        <button class="fullStory" style="visibility: hidden;">
                          <a href="${element.url}" target="_blanked">
                            <img src="./IMAGES/readMore.png" alt="" class="readStoryLogo">
                            <p style="margin-bottom: 0;">View Full Story</p>
                          </a>
                        </button>
                        <button class="arrowBtn" id="${index+1}ArrowBtn" onclick="expandContent(this.id)" onmouseover="changeColorToBlue(this.id)" onmouseout="changeColorToBlack(this.id)">
                          <div class="expand"></div>
                        </button>
                      </div>
                    </div>`;
          }
          else if(element.content === null && element.urlToImage !== null){
            str += `<div class="newsItem">
                      <div class="newsBox">
                        <div class="newsText">
                          <div class="newsTitle"><h4>${element.title.slice(0,element.title.lastIndexOf('-')-1)}</h4></div>
                          <div class="sourceAndTime">
                            <small class="text-muted">${element.source.name}</small>
                            <div class="dot"></div>
                            <small class="text-muted">${getPublishTime(element.publishedAt,new Date())}</small>
                          </div>
                          <div class="descriptionAndAuthor">
                            <p class="description">
                              ${element.description !== null?element.description:emptydescription}
                            </p>
                            <p class="text-muted author"> <span class="blueAuthor">Author</span> - ${element.author !== null?element.author:author}</p>
                          </div>
                        </div>
                        <div class="newsImg">
                          <img src="${element.urlToImage}" alt="">
                        </div>
                      </div>
                      <div class="buttonSection">
                        <button class="fullStory">
                          <a href="${element.url}" target="_blanked">
                            <img src="./IMAGES/readMore.png" alt="" class="readStoryLogo">
                            <p style="margin-bottom: 0;">View Full Story</p>
                          </a>
                        </button>
                        <button class="arrowBtn" id="${index+1}ArrowBtn" onclick="expandContent(this.id)" onmouseover="changeColorToBlue(this.id)" onmouseout="changeColorToBlack(this.id)"  style="visibility: hidden;">
                          <div class="expand"></div>
                        </button>
                      </div>
                    </div>`;
          }
          else if(element.content !== null && element.urlToImage === null){
            str +=  `<div class="newsItem">
                      <div class="newsBox">
                        <div class="newsText" style="width: 100%">
                          <div class="newsTitle"><h4>${element.title.slice(0,element.title.lastIndexOf('-')-1)}</h4></div>
                          <div class="sourceAndTime">
                            <small class="text-muted">${element.source.name}</small>
                            <div class="dot"></div>
                            <small class="text-muted">${getPublishTime(element.publishedAt,new Date())}</small>
                          </div>
                          <div class="descriptionAndAuthor">
                            <p class="description">
                            ${element.description !== null?element.description:emptydescription}
                            </p>
                            <p class="text-muted author"> <span class="blueAuthor">Author</span> - ${element.author !== null?element.author:author}</p>
                          </div>
                        </div>
                      </div>
                      <div class="contentBox" id="${index+1}content">
                        <p>${element.content.slice(0,element.content.lastIndexOf('['))}</p>
                      </div>
                      <div class="buttonSection">
                        <button class="fullStory" style="visibility: hidden;">
                          <a href="${element.url}" target="_blanked">
                            <img src="./IMAGES/readMore.png" alt="" class="readStoryLogo">
                            <p style="margin-bottom: 0;">View Full Story</p>
                          </a>
                        </button>
                        <button class="arrowBtn" id="${index+1}ArrowBtn" onclick="expandContent(this.id)" onmouseover="changeColorToBlue(this.id)" onmouseout="changeColorToBlack(this.id)">
                          <div class="expand"></div>
                        </button>
                      </div>
                    </div>`;
          }
          else{
            str += `<div class="newsItem">
                      <div class="newsBox">
                        <div class="newsText" style="width: 100%">
                          <div class="newsTitle"><h4>${element.title.slice(0,element.title.lastIndexOf('-')-1)}</h4></div>
                          <div class="sourceAndTime">
                            <small class="text-muted">${element.source.name}</small>
                            <div class="dot"></div>
                            <small class="text-muted">${getPublishTime(element.publishedAt,new Date())}</small>
                          </div>
                          <div class="descriptionAndAuthor">
                            <p class="description">
                              ${element.description !== null?element.description:emptydescription}
                            </p>
                            <p class="text-muted author"> <span class="blueAuthor">Author</span> - ${element.author !== null?element.author:author}</p>
                          </div>
                        </div>
                      </div>
                      <div class="buttonSection">
                        <button class="fullStory">
                          <a href="${element.url}" target="_blanked">
                            <img src="./IMAGES/readMore.png" alt="" class="readStoryLogo">
                            <p style="margin-bottom: 0;">View Full Story</p>
                          </a>
                        </button>
                        <button class="arrowBtn" id="${index+1}ArrowBtn" onclick="expandContent(this.id)" onmouseover="changeColorToBlue(this.id)" onmouseout="changeColorToBlack(this.id) "style="visibility: hidden;">
                          <div class="expand"></div>
                        </button>
                      </div>
                    </div>`;
          }
        });
        document.getElementById('newsListContainer').innerHTML = str;
    }
    else{
        console.log("Some error has been occured");
    }
}

