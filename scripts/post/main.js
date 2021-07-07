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

//[TRIGGERS]
loadHtml();
