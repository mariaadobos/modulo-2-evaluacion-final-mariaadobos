'use strict';

const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const resultsList = document.querySelector('#resultsList');
const favouriteList = document.querySelector('#favouriteList');
const favouriteSeriesSection = document.querySelector('#favouriteSeries');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
let favouriteArray = [];
let lis;

const addNewFavourite = (object) => {
  const favElement = document.createElement('li');
  favElement.innerHTML += `<span>${object.name}</span><img src=${object.image}>`;
  favouriteList.appendChild(favElement);
};
const getLocalStorage = () =>{
  if(localStorage.getItem('object')!==null){
    favouriteArray = JSON.parse(localStorage.getItem('object'));
    //console.log(favouriteArray);
    favouriteSeriesSection.classList.remove('hidden');
    for (const object of favouriteArray){
      //console.log(object);
      addNewFavourite(object);
    }
  }
};
const selectShow = (event) => {
  event.currentTarget.classList.toggle('selected');
  favouriteSeriesSection.classList.remove('hidden');
  if (event.currentTarget.classList.contains('selected')===true){
    const li = event.currentTarget;
    const y = li.firstChild.src;
    const x = li.lastChild.innerHTML;
    const object = {
      'name': x,
      'image': y,
    };
    favouriteArray.push(object);
    addNewFavourite(object);
    localStorage.setItem('object', JSON.stringify(favouriteArray));
    //console.log(object);
  }
};
const displayResults = (result) => {
  resultsList.innerHTML = '';
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
    .then(data => {displayResults(data);
      lis = document.querySelectorAll('li');
    });
};
btn.addEventListener('click', connectToAPI);
window.addEventListener('load', getLocalStorage);

