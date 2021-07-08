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
  async getPost(order = 'desc') {
    const response = await fetch(`${this.url}/posts?&_order=${order}&_sort=createDate`);
    const data = await response.json();
    return data;
  }

  async getPostById(id) {
    const response = await fetch(`${this.url}/posts/${id}`);

    if(response.status === 404){
      throw new Error('Http not found');
    }
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

  async getAuthorById(id) {
    const response = await fetch(`${this.url}/authors/${id}`);
    const data = await response.json();
    return data;
  }

  async getCommentsByPostId(id) {
    const response = await fetch(`${this.url}/posts/${id}/comments?_sort=id&_order=desc`);
    const data = await response.json();
    return data;
  }

  async getUsers() {
    const response = await fetch(`${this.url}/users`);
    const data = await response.json();
    return data;
  }

  async postData(url = '', data = {}, message = 'A error has ocurred') {

    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data)
    });

    if(!response.ok){
      throw new Error(message);
    }

    return response.json();
    
  }

  async patchData(url = '', data = {}, message = 'A error has ocurred') {

    const response = await fetch(url, {
      method: 'PATCH', 
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data)
    });

    if(!response.ok){
      throw new Error(message);
    }

    return response.json();
    
  }
}

export default Singleton;