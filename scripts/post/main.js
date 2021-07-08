'use strict'

import Singleton from '../patterns/singleton.js';
import { loadNavbar, loadFooter } from '../sharedScripts.js';
import '../sharedHtmlElements.js';
import './htmlElements.js';

const singleton = new Singleton();

//[FUNCTIONS]
const loadHtml = async () => {
  const navbar = await loadNavbar();
  const footer = await loadFooter();

  navbarContainer.innerHTML = navbar;
  footerContainer.innerHTML = footer;
};

const getQueryParams = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams;
};

const loadPost = async () => {
  const urlParams = await getQueryParams();
  const id = urlParams.get('id');

  const obj = await singleton.getPostById(id);
  const author = await singleton.getAuthorById(obj.author);
  const comments = await singleton.getCommentsByPostId(id);

  displayPostInformation(obj, author, comments);
};

const displayPostInformation = (obj, author, comments) => {
  for(let comment of comments){
    const p = document.createElement('p');
    p.textContent = comment.comment; 
    commentsContainer.appendChild(p);
  }

  textTitle.textContent = obj.title;
  textSubTitle.textContent = obj.subTitle;
  textDescription.textContent = obj.body;
  textDate.textContent = obj.createDate;
  textAuthor.textContent = author.name;
  imgPost.src = obj.image;
  textLikes.textContent = obj.likes;
};
//[TRIGGERS]
loadPost();
getQueryParams();
loadHtml();
