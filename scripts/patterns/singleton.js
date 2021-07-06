let instance = null;

/*SINGLETON*/

class Singleton {
  
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

  async getPostById(id) {
    const response = await fetch(`${this.url}/posts/${id}`);
    const data = await response.json();
    return data;
  }

  //Nota: hacerlo configurable
  async getLastPost({ limit = 3, order = 'asc' } = {}) {
    const response = await fetch(`${this.url}/posts?_limit=${limit}&_order=${order}&_sort=createDate`);
    const data = await response.json();
    return data;
  }

  async getTags() {
    const response = await fetch(`${this.url}/tags`);
    const data = await response.json();
    return data;
  }
}

export default Singleton;