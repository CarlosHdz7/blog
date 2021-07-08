'use strict'

import { loadNavbar, loadFooter } from '../sharedScripts.js';
import '../sharedHtmlElements.js';


//[FUNCTIONS]
const loadHtml = async () => {
  const navbar = await loadNavbar();
  const footer = await loadFooter();

  navbarContainer.innerHTML = navbar;
  footerContainer.innerHTML = footer;
};

const getQueryParams = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('id');
  console.log(code);
};

//[TRIGGERS]
getQueryParams();
loadHtml();
