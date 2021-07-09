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

    const data = buildDataPost('add');

    await helpers.addPost(data);
    await loadPosts();
    toggleContainers();

  }catch(error){
    console.log(error.message);
  }
};

const deletePost = async (id) => {
  try {
    await helpers.deletePost(id);
    loadPosts();
  } catch (error) {
    console.log(error.message);
  }
};

const editPost = async () => {
  try{
    const data = buildDataPost('edit');
    await helpers.patchPost(data);
    await loadPosts();
    toggleContainers();

  }catch(error){
    console.log(error.message);
  }
}

const loadPost = async (id) => {
  try {
    formTitle.textContent = 'Edit post';
    toggleEventsSaveButton('edit');

    const post = await helpers.getPosts({id: id});
    console.log(post);
    await displayInformation(post);
    toggleContainers();
  } catch (error) {
    console.log(error.message);
  }
};

const loadPosts = async () => {

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
        'edit': loadPost
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
  textIdPost.value = post.id;
  textTitle.value = post.title;
  textSubTitle.value = post.subTitle;
  textDescription.textContent = post.body;
  textUrlImage.value = post.image;
};

const toggleEventsSaveButton = (action) => { 
  if(action === 'add'){
    buttonSave.removeEventListener('click', editPost);
    buttonSave.addEventListener('click', addPost);
  }

  if(action === 'edit'){
    buttonSave.removeEventListener('click', addPost);
    buttonSave.addEventListener('click', editPost);
  }
};

const buildDataPost = (action) => {
  let data = {
    'title':textTitle.value,
    'subTitle':textSubTitle.value,
    'image':textUrlImage.value,
    'body':textDescription.value,
    'createDate': utilities.formatDate(new Date(Date.now()),'yyyy/mm/dd'),
    'likes':0,
    'author':1,
    'tags': []
  }

  if(action === 'edit') { data.id = textIdPost.value; };

  return data;
}

//[EVENTS]
buttonShowForm.addEventListener('click', () => {
  toggleEventsSaveButton('add');
  toggleContainers();
})

//[TRIGGERS]
loadHtml();
loadPosts();