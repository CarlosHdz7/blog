import Singleton from './patterns/singleton.js';

const BASE_URL = 'http://localhost:3000';
const singleton = new Singleton(BASE_URL);

class Helpers{

  //Add pagination
  async getPosts ({order, sort, limit, id} = {}){
    let url = `/posts?`;
    
    if(order) url += `&_order=${order}`;
    if(sort) url += `&_sort=${sort}`;
    if(limit) url += `&_limit=${limit}`;
    if(id) url = `/posts/${id}`;
  
    const data = await singleton.getData(url);
    return data;
  }

  async getTags (){
    let url = `/tags`;
    const data = await singleton.getData(url);
    return data;
  }

  async getAuthors ({id} = {}){
    let url = `/authors?`;
    if(id) url = `/authors/${id}`;
    const data = await singleton.getData(url);
    return data;
  }

  async getComments ({id, order, sort} = {}) {
    let url = `/posts/${id}/comments?`;
    if(order) url += `&_order=${order}`;
    if(sort) url += `&_sort=${sort}`;
    const data = await singleton.getData(url);
    return data;
  }

  async addComment (comment, idPost){
    let url = `/comments`;
    await singleton.postData(url, { "comment": comment, "postId": idPost });
  }

  async addLike (idPost, likes){
    let url = `/posts/${idPost}`;
    await singleton.patchData(url, { "likes": likes });
  }

  async addPost (data){
    let url = `/posts`;
    await singleton.postData(url, data);
  }

  async updatePost (data){
    let url = `/posts/${data.id}`;
    await singleton.updateData(url, data);
  }

  async patchPost (data){
    let url = `/posts/${data.id}`;
    await singleton.patchData(url, data);
  }

  async deletePost (id){
    let url = `/posts/${id}`;
    const data = await singleton.deleteData(url);
    return data;
  }
}

export default Helpers;