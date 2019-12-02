'use strict';

const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const resultsList = document.querySelector('#resultsList');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';

const selectShow = (event) => {
  event.currentTarget.classList.toggle('selected');
};
const displayResults = (result) => {
  for (const item of result){
    const show = item.show;
    //console.log(show)
    const elementLi = document.createElement('li');
    const elementImg = document.createElement('img');
    const images = show.image;
    if (images===null){
      elementImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      elementImg.src = images.medium;
    }
    //console.log(images)
    const elementSpan = document.createElement('span');
    const showName = document.createTextNode(show.name);
    elementSpan.appendChild(showName);

    elementLi.appendChild(elementImg);
    elementLi.appendChild(elementSpan);
    resultsList.appendChild(elementLi);

    elementLi.addEventListener('click', selectShow);
  }
};
const connectToAPI = () => {
  fetch(urlBase+input.value.toLowerCase())
    .then(response => response.json())
    .then(data => displayResults(data));
};
btn.addEventListener('click', connectToAPI);
