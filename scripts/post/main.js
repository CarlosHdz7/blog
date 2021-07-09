'use strict'

import Helpers  from '../helpers.js';
import HtmlFactory from '../patterns/factory.js';
import { loadNavbar, loadFooter } from '../sharedScripts.js';
import '../sharedHtmlElements.js';
import './htmlElements.js';

let idPost = 0;
const helpers = new Helpers();


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
  try{
    const urlParams = await getQueryParams();
    idPost = urlParams.get('id');
  
    const obj = await helpers.getPosts({id: idPost});
    const author = await helpers.getAuthors({id: obj.author});
  
    displayPostInformation(obj, author);
    loadComments(idPost);

  }catch(error){
    window.location.href = './404.html';
  }
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

const loadComments = async () => {

  const comments = await helpers.getComments({id: idPost, sort: 'id', order: 'desc'});

  while(commentsContainer.firstChild) commentsContainer.removeChild(commentsContainer.firstChild);

  for(let comment of comments){
    const commentHtml = new HtmlFactory('comment', {'comment': comment.comment } );
    commentsContainer.appendChild(commentHtml);
  }

};

const postComment = async () => {
  try{
    const comment = textComment.value;
    if(comment){
      await helpers.addComment(comment, idPost);
      loadComments(idPost);
      textComment.value = "";
    }

  }catch(error){
    console.log(error.message);
  }
}

const setLike = async () => {
  try{
    const obj = await helpers.getPosts({id: idPost});
    const likes = obj.likes + 1;
    await helpers.addLike(idPost, likes)
    updateLikes();
  }catch(error){
    console.log(error.message);
  }
}

const updateLikes = async () => {
  try{
    const obj = await helpers.getPosts({id: idPost});
    textLikes.textContent = obj.likes;
  }catch(error){
    console.log(error.message);
  }
}

//[LISTENERS]
buttonComment.addEventListener('click', postComment);
buttonLike.addEventListener('click', setLike);

//[TRIGGERS]
loadHtml();
loadPost();
getQueryParams();

