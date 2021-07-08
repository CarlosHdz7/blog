import Singleton from './patterns/singleton.js';

const singleton = new Singleton();

class Helpers{

  async getPosts ({order = 'desc', sort = 'createDate', limit = 0} = {}){
    let url = `/posts?&_order=${order}&_sort=${sort}`;
    if(limit) url += `&_limit=${limit}`;
  
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