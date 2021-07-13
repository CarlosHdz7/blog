import Singleton from './patterns/singleton.js';
import errorMessages from './errorMessages.js';

const BASE_URL = 'https://week3-carloshdz.herokuapp.com';
const singleton = new Singleton(BASE_URL);

class Helpers {
  //Add pagination
  async getPosts({ order, sort, limit, title, tags, id } = {}) {
    let url = `/posts?`;

    if (order) url += `&_order=${order}`;
    if (sort) url += `&_sort=${sort}`;
    if (limit) url += `&_limit=${limit}`;
    if (title) url += `&title_like=${title}`;
    if (tags) url += `&tags_like=[${tags}]`;
    if (id) url = `/posts/${id}`;

    const data = await singleton.getData(url);
    return data;
  }

  async getTags({ name, ignoreTags } = {}) {
    let url = `/tags?`;

    if (name) url += `&name_like=${name}`;

    if (ignoreTags && ignoreTags.length) {
      for (let tagId of ignoreTags) {
        url += `&id_ne=${tagId}`;
      }
    }

    const data = await singleton.getData(url);
    return data;
  }

  async getAuthors() {
    let url = `/authors`;
    const data = await singleton.getData(url);
    return data;
  }

  async getAuthors({ id } = {}) {
    let url = `/authors?`;
    if (id) url = `/authors/${id}`;
    const data = await singleton.getData(url);
    return data;
  }

  async getComments({ id, order, sort } = {}) {
    let url = `/posts/${id}/comments?`;
    if (order) url += `&_order=${order}`;
    if (sort) url += `&_sort=${sort}`;
    const data = await singleton.getData(url);
    return data;
  }

  async addComment(comment, idPost) {
    let url = `/comments`;
    await singleton.postData(url, { comment: comment, postId: idPost }, errorMessages['addComment']);
  }

  async addLike(idPost, likes) {
    let url = `/posts/${idPost}`;
    await singleton.patchData(url, { likes: likes }, errorMessages['likePost']);
  }

  async addPost(data) {
    let url = `/posts`;
    await singleton.postData(url, data, errorMessages['addPost']);
  }

  async updatePost(data) {
    let url = `/posts/${data.id}`;
    await singleton.updateData(url, data);
  }

  async patchPost(data) {
    let url = `/posts/${data.id}`;
    await singleton.patchData(url, data, errorMessages['patchPost']);
  }

  async deletePost(id) {
    let url = `/posts/${id}`;
    const data = await singleton.deleteData(url);
    return data;
  }
}

export default Helpers;
