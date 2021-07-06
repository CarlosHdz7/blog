'use strict'
import Singleton from "./singleton.js";

const postContainer = document.getElementById('postContainer');
const singleton = new Singleton();

//[FUNCTIONS]
const getPost = async () => {
  const posts = await singleton.getPost();
  console.log(posts);
  for(let post of posts){
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(post.title));
    postContainer.appendChild(p);
  }
}

//[CALLS]
getPost();