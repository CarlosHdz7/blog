'use strict'

import Helpers  from '../helpers.js';
import HtmlFactory from '../patterns/factory.js';
import { loadNavbar, loadFooter } from '../sharedScripts.js';
import { debounce } from '../algorithms.js';
import Utilities from '../utilities.js';
import '../sharedHtmlElements.js';
import './htmlElements.js';

const helpers = new Helpers();
const utilities = new Utilities();
let selectedTags = [];

//[FUNCTIONS]
const loadPosts = async (title = '') => {
  await clearPost();
  await setLoader(normalPostContainer);

  try {
    let data = {order:'desc', sort:'id'};
    if(title) data.title = title;
    const posts = await helpers.getPosts(data);

    console.log(posts);

    if(posts.length){
      await clearPost();

      for (let post of posts) {
        const postHtml = new HtmlFactory('post', {
          'title':post.title,
          'url': post.image, 
          'description': post.subTitle,
          'date': post.createDate,
          'likes': post.likes,
          'id': post.id
        });
        normalPostContainer.appendChild(postHtml);
      }
    }else{
      await clearPost();
      handleMessages(normalPostContainer);
    }
  } catch (error) {
    window.location.href = './500.html';
  }

}

const clearPost = async () => {
  while(normalPostContainer.firstChild) normalPostContainer.removeChild(normalPostContainer.firstChild);
};

const getTags = async () => {
  
  const tags = await helpers.getTags();
  
  for (let tag of tags) {

    const tagHtml = new HtmlFactory('tag', {
      'name': tag.name,
      'id': tag.id,
      'cross':false,
      'events':{
        'select':selectTag
      }
    });
    containerTags.appendChild(tagHtml);
  }
}

const selectTag = (tag,id) => {
  
  if(tag.classList.contains('tag-active')){
    tag.classList.remove('tag-active');
    selectedTags = utilities.arrayRemove(selectedTags, id);
    return;
  }
  
  tag.classList.add('tag-active');
  selectedTags.push(id);
};

const loadLatestPost = async () => {
  try {
    const latestPosts = await helpers.getPosts({order:'desc', sort:'createDate', limit:3});  
    if(latestPosts.length){
      for(let post of latestPosts){
        const smallPost = new HtmlFactory('smallPost', {
          'title': post.title, 
          'url': post.image, 
          'id': post.id 
        });
        smallPostContainer.appendChild(smallPost);
      }
    }else{
      handleMessages(smallPostContainer);
    }
  } catch (error) {
    window.location.href = './500.html';
  }  
}

const loadHtml = async () => {
  const navbar = await loadNavbar();
  const footer = await loadFooter();

  navbarContainer.innerHTML = navbar;
  footerContainer.innerHTML = footer;
};

const handleMessages = (container) => {
  const messageHtml = new HtmlFactory('notResults', {} );
  container.appendChild(messageHtml);
};

const setLoader = (container) => {
  const loaderHtml = new HtmlFactory('loader', {} );
  container.appendChild(loaderHtml);
};

const toggleTagContainer = () => {
  containerTags.classList.toggle('d-none');
};

//[EVENTS]
inputSearch.addEventListener('keyup', debounce(() => {
  loadPosts(inputSearch.value);
}, 500));

buttonTags.addEventListener('click', () => {
  toggleTagContainer();
});

//[TRIGGERS]
loadHtml();
loadPosts();
getTags();
loadLatestPost();