import Singleton from './patterns/singleton.js';

const singleton = new Singleton();

class Helpers{

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

}


export default Helpers;