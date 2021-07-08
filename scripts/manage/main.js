'use strict'

import Helpers  from '../helpers.js';
import HtmlFactory from '../patterns/factory.js';
import { loadNavbar, loadFooter } from '../sharedScripts.js';
import './htmlElements.js';
import '../sharedHtmlElements.js';

const helpers = new Helpers();

//[FUNCTIONS]
const getPost = async () => {

  const posts = await helpers.getPosts({order:'desc', sort:'createDate'});
  console.log(posts);

  for (let post of posts) {
    const trHtml = new HtmlFactory('tr', {
      'id': post.id,
      'title': post.title,
      'date': post.createDate,
      'author':  post.author
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
getPost();