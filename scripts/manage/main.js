'use strict'

import Helpers  from '../helpers.js';
import HtmlFactory from '../patterns/factory.js';
import { loadNavbar, loadFooter } from '../sharedScripts.js';
import './htmlElements.js';
import '../sharedHtmlElements.js';
import Utilities from '../utilities.js';

const helpers = new Helpers();
const utilities = new Utilities();

//[FUNCTIONS]
const addPost = async () => {
  try{

    formTitle.textContent = 'Add post';

    const data = {
      'title':textTitle.value,
      'subTitle':textSubTitle.value,
      'image':textUrlImage.value,
      'body':textDescription.value,
      'createDate': utilities.formatDate(new Date(Date.now()),'yyyy/mm/dd'),
      'likes':0,
      'author':1,
      'tags': []
    }

    await helpers.addPost(data);
    await loadPost();
    toggleContainers();

  }catch(error){
    console.log(error.message);
  }
};

const editPost = async (id) => {
  try {
    formTitle.textContent = 'Edit post';

    const post = await helpers.getPosts({id: id});
    console.log(post);
    await displayInformation(post);
    toggleContainers();
  } catch (error) {
    console.log(error.message);
  }
};

const deletePost = async (id) => {
  try {
    await helpers.deletePost(id);
    loadPost();
  } catch (error) {
    console.log(error.message);
  }
};



const loadPost = async () => {

  const posts = await helpers.getPosts({order:'desc', sort:'createDate'});
  console.log(posts);

  while(blogsTableBody.firstChild) blogsTableBody.removeChild(blogsTableBody.firstChild);

  for (let post of posts) {
    const trHtml = new HtmlFactory('tr', {
      'id': post.id,
      'title': post.title,
      'date': post.createDate,
      'author':  post.author,
      'events':{
        'delete': deletePost,
        'edit': editPost
      }
    });

    blogsTableBody.appendChild(trHtml);
  }

}

const loadHtml = async () => {
  const navbar = await loadNavbar();
  const footer = await loadFooter();

  navbarContainer.innerHTML = navbar;
  footerContainer.innerHTML = footer;
};

const toggleContainers = () => {
  postsContainer.classList.toggle('d-none');
  formContainer.classList.toggle('d-none');
};

const displayInformation = async (post) => {
  textTitle.value = post.title;
  textSubTitle.value = post.subTitle;
  textDescription.textContent = post.body;
  textUrlImage.value = post.image;
};

//[EVENTS]
buttonShowForm.addEventListener('click', () => {
  toggleContainers();
})

buttonSave.addEventListener('click', () => {
  addPost();
});

//[TRIGGERS]
loadHtml();
loadPost();