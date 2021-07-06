let instance = null;

/*SINGLETON*/

class Blog {
  
  constructor(){
    if (!instance) {
      instance = this;
    }

    this.url = 'http://localhost:3000';

    return instance;
  }


  //Nota: Agregar paginacion
  async getPost() {
    const response = await fetch(`${this.url}/posts`);
    const data = await response.json();
    return data;
  }

  //Nota: hacerlo configurable
  async getLastPost(limit = '', order = '') {
    const response = await fetch(`${this.url}/posts?_limit=3&_sort=createDate&_order=desc`);
    const data = await response.json();
    return data;
  }

  async getTags() {
    const response = await fetch(`${this.url}/tags`);
    const data = await response.json();
    return data;
  }
}

export default Blog;