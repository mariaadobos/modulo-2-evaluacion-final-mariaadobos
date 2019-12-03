'use strict';

const elementForm = document.querySelector('#form');
const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const resultsList = document.querySelector('#resultsList');
const favouriteList = document.querySelector('#favouriteList');
const favouriteSeriesSection = document.querySelector('#favouriteSeries');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
let favouriteArray = [];

const addNewFavourite = (object) => {
  const favElement = document.createElement('li');
  favElement.classList.add('fav-item');
  const elementImgFav = document.createElement('img');
  elementImgFav.src = object.image;
  const elementSpanFav = document.createElement('span');
  const elementSpanFavContent = document.createTextNode(object.name);
  elementSpanFav.appendChild(elementSpanFavContent);
  const elementSpanRemove = document.createElement('span');
  elementSpanRemove.innerHTML = '<i class="fas fa-times-circle"></i>';
  favElement.appendChild(elementImgFav);
  favElement.appendChild(elementSpanFav);
  favElement.appendChild(elementSpanRemove);
  favouriteList.appendChild(favElement);
};
const getLocalStorage = () =>{
  if(localStorage.getItem('object')!==null){
    favouriteArray = JSON.parse(localStorage.getItem('object'));
    favouriteSeriesSection.classList.remove('hidden');
    for (const object of favouriteArray){
      addNewFavourite(object);
    }
  }
};
const selectShow = (event) => {
  event.currentTarget.classList.toggle('selected');
  favouriteSeriesSection.classList.remove('hidden');
  if (event.currentTarget.classList.contains('selected')===true){
    const favShowImage = event.currentTarget.firstChild.src;
    const favShowName = event.currentTarget.lastChild.innerHTML;
    const object = {
      'name': favShowName,
      'image': favShowImage,
    };
    favouriteArray.push(object);
    addNewFavourite(object);
    localStorage.setItem('object', JSON.stringify(favouriteArray));
  }
};
const displayResults = (result) => {
  resultsList.innerHTML = '';
  for (const item of result){
    const show = item.show;
    const elementLi = document.createElement('li');
    elementLi.classList.add('search-result-item');
    const elementImg = document.createElement('img');
    const images = show.image;
    if (images===null){
      elementImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      elementImg.src = images.medium;
    }
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
const submitFormHandler = (event) => {
  event.preventDefault();
  connectToAPI();
};
elementForm.addEventListener('submit', submitFormHandler);
btn.addEventListener('click', connectToAPI);
window.addEventListener('load', getLocalStorage);

