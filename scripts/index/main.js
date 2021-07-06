'use strict'

import Singleton from '../patterns/singleton.js';
import HtmlFactory from '../patterns/factory.js';
import './htmlElements.js';

const singleton = new Singleton();


//[FUNCTIONS]
const getPost = async () => {
  const posts = await singleton.getPost();
  console.log(posts);
}

const getPostById = async (id) => {
  const post = await singleton.getPostById(id);
  const postHtml = new HtmlFactory('post', {'name': post.title } );
  console.log(post);
  console.log(postHtml);
}

const getTags = async () => {
  const tags = await singleton.getTags();
  for(let tag of tags){
    const tagHtml = new HtmlFactory('tag', {'name': tag.name } );
    console.log(tagHtml);
  }
  console.log(tags);
}

const getLastestPost = async () => {
  const lastestPosts = await singleton.getLastPost({ limit:3, order:'desc'});
  for(let post of lastestPosts){
    const smallPost = new HtmlFactory('smallPost', {'title': post.title, 'url': post.image } );
    smallPostContainer.appendChild(smallPost);
  }
}

//[CALLS]
// getPost();
// getPostById(1);
// getTags();
getLastestPost();