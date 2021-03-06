'use strict';

import './htmlElements.js';
import '../sharedHtmlElements.js';
import Helpers from '../helpers.js';
import HtmlFactory from '../patterns/factory.js';
import { loadNavbar, loadFooter } from '../sharedScripts.js';
import { debounce } from '../algorithms.js';
import { validateForm, cleanErrorsMessages } from './validateForm.js';
import Utilities from '../utilities.js';

const helpers = new Helpers();
const utilities = new Utilities();
let selectedTags = [];

//[FUNCTIONS]
const addPost = async () => {
  try {
    if (!validateForm()) {
      return;
    }

    utilities.removeErrorMessage(errorFormContainer);
    const data = buildDataPost('add');
    await helpers.addPost(data);
    await loadPosts();
    toggleContainers();
  } catch (error) {
    const errorHtml = new HtmlFactory('errorMessage', {
      message: error.message,
    });
    utilities.setErrorMessage(errorFormContainer, errorHtml);
  }
};

const editPost = async () => {
  try {
    if (!validateForm()) {
      return false;
    }

    utilities.removeErrorMessage(errorFormContainer);
    const data = buildDataPost('edit');
    await helpers.patchPost(data);
    await loadPosts();
    toggleContainers();
  } catch (error) {
    const errorHtml = new HtmlFactory('errorMessage', {
      message: error.message,
    });
    utilities.setErrorMessage(errorFormContainer, errorHtml);
  }
};

const loadPost = async (id) => {
  try {
    toggleEventsSaveButton('edit');
    const post = await helpers.getPosts({ id: id });
    await displayInformation(post);
    toggleContainers();
  } catch (error) {
    window.location.href = './500.html';
  }
};

const loadPosts = async (title = '') => {
  try {
    let data = { order: 'desc', sort: 'id' };
    if (title) data.title = title;

    const authors = await getAuthors();
    const posts = await helpers.getPosts(data);

    await utilities.clearBodyTable(blogsTableBody);

    if (posts.length) {
      for (let post of posts) {
        let author = authors.find((a) => a.id === post.author);
        author = author ? `${author.name} ${author.lastName}` : 'Unknown';

        const trHtml = new HtmlFactory('tr', {
          id: post.id,
          title: post.title,
          date: post.createDate,
          author: author,
          events: {
            delete: showDeleteModal,
            edit: loadPost,
          },
        });

        blogsTableBody.appendChild(trHtml);
      }
    } else {
      setEmptyTable(blogsTableBody, 5);
    }
  } catch (error) {
    window.location.href = './500.html';
  }
};

const setEmptyTable = async (bodyTable, colSpan) => {
  await utilities.clearBodyTable(bodyTable);
  const trHtml = new HtmlFactory('trNoResults', {
    colSpan: colSpan,
  });
  bodyTable.appendChild(trHtml);
};

const selectTag = (id) => {
  inputSearchTags.value = '';
  selectedTags.push(id);
  closeResultContainer();
  refreshTags();
};

const removeTag = (id) => {
  selectedTags = utilities.arrayRemove(selectedTags, id);
  refreshTags();
};

const closeResultContainer = () => {
  containerResults.style.display = 'none';
};

const showResultContainer = () => {
  containerResults.style.display = 'block';
};

const loadTags = async (name = '') => {
  const tags = await helpers.getTags({ name: name, ignoreTags: selectedTags });

  while (containerResults.firstChild)
    containerResults.removeChild(containerResults.firstChild);

  if (tags.length) {
    for (let tag of tags) {
      const itemHtml = new HtmlFactory('itemResultTag', {
        id: tag.id,
        name: tag.name,
        events: {
          select: selectTag,
        },
      });
      containerResults.appendChild(itemHtml);
    }
    showResultContainer();
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
  textDate.value = post.createDate;
  selectedTags = post.tags;
  selectAuthor.value = post.author;
  refreshTags();
};

const toggleEventsSaveButton = (action) => {
  if (action === 'add') {
    resetForm();
    formTitle.textContent = 'Create new post';
    textDate.value = utilities.formatDate(new Date(Date.now()), 'yyyy/mm/dd');
    buttonSave.removeEventListener('click', editPost);
    buttonSave.addEventListener('click', addPost);
  }

  if (action === 'edit') {
    formTitle.textContent = 'Edit post';
    buttonSave.removeEventListener('click', addPost);
    buttonSave.addEventListener('click', editPost);
  }
};

const buildDataPost = (action) => {
  let data = {
    title: textTitle.value,
    subTitle: textSubTitle.value,
    image: textUrlImage.value,
    body: textDescription.value,
    author: parseInt(selectAuthor.value),
    tags: selectedTags,
  };

  if (action === 'edit') {
    data.id = textIdPost.value;
  }
  if (action === 'add') {
    data.likes = 0;
    data.createDate = utilities.formatDate(new Date(Date.now()), 'yyyy/mm/dd');
  }

  return data;
};

const resetForm = () => {
  textDescription.textContent = '';
  selectedTags = [];
  clearTagsContainer();
  formContainer.reset();
};

const showDeleteModal = (id) => {
  spanIdPost.textContent = id;
  buttonDelete.dataset.idPost = id;
  modalDelete.style.display = 'block';
};

const closeDeleteModal = () => {
  utilities.removeErrorMessage(errorModalContainer);
  modalDelete.style.display = 'none';
};

const clearTagsContainer = async () => {
  while (tagsContainer.firstChild)
    tagsContainer.removeChild(tagsContainer.firstChild);
};

const refreshTags = async () => {
  const tags = await helpers.getTags();

  await clearTagsContainer();

  for (const selectedTag of selectedTags) {
    const tag = tags.find((t) => t.id === selectedTag);

    const tagHtml = new HtmlFactory('tag', {
      name: tag.name,
      id: tag.id,
      cross: true,
      events: {
        remove: removeTag,
      },
    });
    tagsContainer.appendChild(tagHtml);
  }
};

const loadAuthors = async () => {
  const authors = await getAuthors();
  for (let author of authors) {
    const optionHtml = new HtmlFactory('option', {
      id: author.id,
      text: `${author.name} ${author.lastName}`,
    });
    selectAuthor.appendChild(optionHtml);
  }
};

//[EVENTS]
buttonShowForm.addEventListener('click', () => {
  toggleEventsSaveButton('add');
  toggleContainers();
});

buttonBackForm.addEventListener('click', async () => {
  utilities.removeErrorMessage(errorFormContainer);
  await cleanErrorsMessages();
  resetForm();
  toggleContainers();
});

buttonDelete.addEventListener('click', async (event) => {
  try {
    utilities.removeErrorMessage(errorModalContainer);

    await helpers.deletePost(event.target.dataset.idPost);
    loadPosts();
    closeDeleteModal();
  } catch (error) {
    const errorHtml = new HtmlFactory('errorMessage', {
      message: error.message,
    });
    utilities.setErrorMessage(errorModalContainer, errorHtml);
  }
});

buttonCancel.addEventListener('click', () => {
  closeDeleteModal();
});

closeSpan.addEventListener('click', () => {
  closeDeleteModal();
});

inputSearch.addEventListener(
  'keyup',
  debounce(() => {
    loadPosts(inputSearch.value);
  }, 500)
);

inputSearchTags.addEventListener(
  'keyup',
  debounce(() => {
    const text = inputSearchTags.value;
    if (text.trim()) {
      loadTags(text);
    } else {
      closeResultContainer();
    }
  }, 500)
);

window.addEventListener('click', (event) => {
  if (event.target == modalDelete) {
    closeDeleteModal();
  }
});

//[TRIGGERS]
loadHtml();
loadPosts();
loadAuthors();
resetForm();
