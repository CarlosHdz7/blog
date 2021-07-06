'use strict'
import Blog from "./services/Blog.js";
import './htmlElements.js';

const blog = new Blog();

//[FUNCTIONS]
const getPost = async () => {

  const posts = await blog.getPost();
  const lastestPosts = await blog.getLastPost();
  const tags = await blog.getTags();
  
  console.log(posts);
  console.log(lastestPosts);
  console.log(tags);

}

//[CALLS]
getPost();