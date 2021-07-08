'use strict'

import Helpers  from '../helpers.js';
import HtmlFactory from '../patterns/factory.js';
import { loadNavbar, loadFooter } from '../sharedScripts.js';
import './htmlElements.js';
import '../sharedHtmlElements.js';

const helpers = new Helpers();

//[FUNCTIONS]
const deletePost = async (id) => {
  try {
    await helpers.deletePost(id);
    loadPost();
  } catch (error) {
    console.log(error.message);
  }
}

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
        'delete': deletePost
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
//[TRIGGERS]
loadHtml();
loadPost();