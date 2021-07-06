'use strict'

import Singleton from '../patterns/singleton.js';
import HtmlFactory from '../patterns/factory.js';
import './htmlElements.js';

const singleton = new Singleton();


//[FUNCTIONS]
const getPost = async () => {
  const posts = await singleton.getPost();

  for (let i = 3; i < posts.length; i++) {
    const normalPost = new HtmlFactory('bigPost', {'title': posts[i].title, 'url': posts[i].image, 'description': posts[i].subTitle } );
    normalPostcontainer.appendChild(normalPost);
  }
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
  const lastPost = lastestPosts[0];

  const bigPost = new HtmlFactory('bigPost', {'title': lastPost.title, 'url': lastPost.image,'description': lastPost.subTitle } );
  main.appendChild(bigPost);
  
  for(let post of lastestPosts){
    const smallPost = new HtmlFactory('smallPost', {'title': post.title, 'url': post.image } );
    smallPostContainer.appendChild(smallPost);
  }
}

//[CALLS]
getPost();
// getPostById(1);
// getTags();
getLastestPost();