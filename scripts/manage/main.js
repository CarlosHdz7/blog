'use strict'

import Helpers  from '../helpers.js';
import HtmlFactory from '../patterns/factory.js';
import { loadNavbar, loadFooter } from '../sharedScripts.js';
import { debounce } from '../algorithms.js';
import './htmlElements.js';
import '../sharedHtmlElements.js';
import Utilities from '../utilities.js';

const helpers = new Helpers();
const utilities = new Utilities();

//[FUNCTIONS]
const addPost = async () => {
  try{
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
    toggleEventsSaveButton('edit');

    const post = await helpers.getPosts({id: id});
    console.log(post);
    await displayInformation(post);
    toggleContainers();
  } catch (error) {
    console.log(error.message);
  }
};

const loadPosts = async (title = '') => {

  let data = {order:'desc', sort:'createDate'};
  if(title) data.title = title;

  const authors = await getAuthors();
  const posts = await helpers.getPosts(data);

  while(blogsTableBody.firstChild) blogsTableBody.removeChild(blogsTableBody.firstChild);

  if(posts.length){
    for (let post of posts) {
  
      const author = authors.find( a => a.id === post.author);
  
      const trHtml = new HtmlFactory('tr', {
        'id': post.id,
        'title': post.title,
        'date': post.createDate,
        'author':  `${author.name} ${author.lastName}`,
        'events':{
          'delete': showDeleteModal,
          'edit': loadPost
        }
      });
  
      blogsTableBody.appendChild(trHtml);
    }
  }else{
    const trHtml = new HtmlFactory('trNoResults', {
      'colSpan': 5,
    });

    blogsTableBody.appendChild(trHtml);
  }
};

const getAuthors = async () => {
  const authors = await helpers.getAuthors();
  return authors;
};

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
    resetForm();
    formTitle.textContent = 'Add post';
    buttonSave.removeEventListener('click', editPost);
    buttonSave.addEventListener('click', addPost);
  }

  if(action === 'edit'){
    formTitle.textContent = 'Edit post';
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
  if(action === 'add') { data.createDate = utilities.formatDate(new Date(Date.now()),'yyyy/mm/dd'); };

  return data;
}

const resetForm = () => {
  textDescription.textContent = '';
  formContainer.reset();
}

const showDeleteModal = (id) => {
  spanIdPost.textContent = id;
  buttonDelete.dataset.idPost = id;
  modalDelete.style.display = 'block';
};

const closeDeleteModal = () => {
  modalDelete.style.display = 'none';
};

//[EVENTS]
buttonShowForm.addEventListener('click', () => {
  toggleEventsSaveButton('add');
  toggleContainers();
});

buttonBackForm.addEventListener('click', () => {
  resetForm();
  toggleContainers();
});

buttonDelete.addEventListener('click', async (event) => {
  await deletePost(event.target.dataset.idPost);
  closeDeleteModal();
});

buttonCancel.addEventListener('click', () => {
  closeDeleteModal();
});

closeSpan.addEventListener('click', () => {
  closeDeleteModal();
});

inputSearch.addEventListener('keyup', debounce(() => {
  loadPosts(inputSearch.value);
}, 500));

window.addEventListener('click', (event) => {
  if (event.target == modalDelete) {
    closeDeleteModal();
  }
});

//[TRIGGERS]
loadHtml();
loadPosts();
resetForm();
getAuthors();