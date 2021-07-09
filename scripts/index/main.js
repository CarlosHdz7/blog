'use strict'

import Helpers  from '../helpers.js';
import HtmlFactory from '../patterns/factory.js';
import { loadNavbar, loadFooter } from '../sharedScripts.js';
import '../sharedHtmlElements.js';
import './htmlElements.js';

const helpers = new Helpers();

//[FUNCTIONS]
const getPost = async () => {

  const posts = await helpers.getPosts({order:'desc', sort:'createDate'});

  for (let i = 3; i < posts.length; i++) {
    const post = new HtmlFactory('post', {
      'title': posts[i].title,
      'url': posts[i].image, 
      'description': posts[i].subTitle,
      'date': posts[i].createDate,
      'id':  posts[i].id
    });

    normalPostContainer.appendChild(post);
  }

}

const getTags = async () => {
  const tags = await helpers.getTags();
  for(let tag of tags){
    const tagHtml = new HtmlFactory('tag', {'name': tag.name } );
  }
  console.log(tags);
}

const getLatestPost = async () => {  
  const latestPosts = await helpers.getPosts({order:'desc', sort:'createDate', limit:3});
  const lastPost = latestPosts[0];

  const post = new HtmlFactory('post', {
    'title': lastPost.title, 
    'url': lastPost.image,
    'description': lastPost.subTitle,
    'size':'rectangle',
    'date': lastPost.createDate,
    'id': lastPost.id 
  });

  main.appendChild(post);
  
  for(let post of latestPosts){
    const smallPost = new HtmlFactory('smallPost', {
      'title': post.title, 
      'url': post.image, 
      'id': post.id 
    });
    smallPostContainer.appendChild(smallPost);
  }
}

const loadHtml = async () => {
  const navbar = await loadNavbar();
  const footer = await loadFooter();

  navbarContainer.innerHTML = navbar;
  footerContainer.innerHTML = footer;
};

//[TRIGGERS]
loadHtml();
getPost();
getTags();
getLatestPost();