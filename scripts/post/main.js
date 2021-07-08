'use strict'

import Singleton from '../patterns/singleton.js';
import { loadNavbar, loadFooter } from '../sharedScripts.js';
import '../sharedHtmlElements.js';
import './htmlElements.js';

let idPost = 0;
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
  idPost = urlParams.get('id');

  const obj = await singleton.getPostById(idPost);
  const author = await singleton.getAuthorById(obj.author);

  displayPostInformation(obj, author);
  loadComments(idPost);
};

const displayPostInformation = (obj, author) => {

  textTitle.textContent = obj.title;
  textSubTitle.textContent = obj.subTitle;
  textDescription.textContent = obj.body;
  textDate.textContent = obj.createDate;
  textAuthor.textContent = author.name;
  imgPost.src = obj.image;
  textLikes.textContent = obj.likes;
};

const loadComments = async (id) => {

  const comments = await singleton.getCommentsByPostId(id);
  while(commentsContainer.firstChild) commentsContainer.removeChild(commentsContainer.firstChild);

  for(let comment of comments){
    const p = document.createElement('p');
    p.textContent = comment.comment; 
    commentsContainer.appendChild(p);
  }

};

const postComment = async () => {
  try{
    await singleton.postData('http://localhost:3000/comments', { "comment": "prueba 2", "postId": 1 });
    loadComments(idPost);

  }catch(error){
    console.log(error.message);
  }
}

//[LISTENERS]
// btnComment.addEventListener('click',postComment);

//[TRIGGERS]
loadHtml();
loadPost();
getQueryParams();
postComment();
