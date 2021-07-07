const loadNavbar = async () => {
  const htmlNavbar = await fetch('../shared/navbar.html');
  return htmlNavbar.text();
};

const loadFooter = async () => {
  const htmlFooter = await fetch('../shared/footer.html');
  return htmlFooter.text();
};

export {
  loadNavbar,
  loadFooter
}