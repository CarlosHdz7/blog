class SmallPost {
  constructor(props){
    this.title = props.title;
    this.url = props.url;
    this.id = props.id;
    return this.create();
  }

  create(){
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const img = document.createElement('img');
    const a = document.createElement('a');

    a.textContent = this.title;
    a.href = `post.html?id=${this.id}`;
    img.src = this.url;


    div1.classList.add('preview-small-post');
    div2.classList.add('small-post__img');
    div3.classList.add('small-post__title');

    div2.appendChild(img);
    div3.appendChild(a);
    div1.appendChild(div2);
    div1.appendChild(div3);

    return div1;
  }
}
class Post {
  constructor(props){
    this.title = props.title;
    this.description = props.description;
    this.date = props.date;
    this.url = props.url;
    this.size = (props.size) ? props.size : 'square';
    this.id = props.id;
    return this.create();
  }

  create(){
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const img = document.createElement('img');
    const a = document.createElement('a');
    const small = document.createElement('small');
    const small2 = document.createElement('small');

    a.textContent = this.title;
    a.href = `post.html?id=${this.id}`;
    small.textContent = this.description;
    small2.textContent = this.date;
    img.src = this.url;

    a.classList.add('preview-post__title');
    small.classList.add('preview-post__subtitle');
    small2.classList.add('preview-post__date');
    div2.classList.add('preview-post__img');
    div3.classList.add('preview-post__description');
    (this.size === 'square')
      ? div2.classList.add('img-square')
      : div2.classList.add('img-rectangle');

    (this.size === 'square')
      ? div1.classList.add('preview-post')
      : div1.classList.add('preview-post','w-100')

    div2.appendChild(img);
    div3.appendChild(a);
    div3.appendChild(small);
    div3.appendChild(small2);
    div1.appendChild(div2);
    div1.appendChild(div3);

    return div1;
  }
}
class Tags {
  constructor(props){
    this.text = props.name;
    return this.create();
  }

  create(){
    const span = document.createElement('span');
    const text = document.createTextNode(this.text);
    span.classList.add('tag');
    span.appendChild(text);

    return span;
  }
}
class Comment{
  constructor(props){
    this.comment = props.comment;
    return this.create();
  }

  create(){
    const div = document.createElement('div');
    const p = document.createElement('p');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span2');
    const text1 = document.createTextNode('Anonymous');
    const text2 = document.createTextNode(this.comment);


    div.classList.add('comment');
    span1.classList.add('comment__user');
    span2.classList.add('comment__text');
    span1.appendChild(text1);
    span2.appendChild(text2);
    p.appendChild(span1);
    p.appendChild(span2);
    div.appendChild(p);

    return div;
  }
}
class Tr{
  constructor(props){
    this.id = props.id;
    this.title = props.title;
    this.author = props.author;
    this.date = props.date;
    this.events = props.events;
    return this.create();
  }

  create(){
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdAuthor = document.createElement('td');
    const tdDate = document.createElement('td');
    const tdOptions = document.createElement('td');

    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');
    btnEdit.classList.add('button-edit');
    btnDelete.classList.add('button-delete');

    if(this.events.hasOwnProperty('delete')){
      btnDelete.addEventListener('click', () => {
        this.events.delete(this.id);
      })
    }

    if(this.events.hasOwnProperty('edit')){
      btnEdit.addEventListener('click', () => {
        this.events.edit(this.id);
      })
    }

    const txtId = document.createTextNode(this.id);
    const txtTitle = document.createTextNode(this.title);
    const txtAuthor = document.createTextNode(this.author);
    const txtDate = document.createTextNode(this.date);

    tdId.appendChild(txtId);
    tdTitle.appendChild(txtTitle);
    tdAuthor.appendChild(txtAuthor);
    tdDate.appendChild(txtDate);
    tdOptions.appendChild(btnEdit);
    tdOptions.appendChild(btnDelete);
    
    tr.appendChild(tdId);
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdDate);
    tr.appendChild(tdOptions);

    return tr;
  }
}
class TrNoResults{
  constructor(props){
    this.colSpan = props.colSpan;

    return this.create();
  }

  create(){
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const txtTd = document.createTextNode('No results found.');
    td.setAttribute('colSpan', this.colSpan);
    td.style.textAlign = 'center';

    td.appendChild(txtTd);
    tr.appendChild(td);

    return tr;
  }
}
class ItemResultTag{
  constructor(props){
    this.name = props.name;
    this.id = props.id;
    this.events = props.events;
    return this.create();
  }

  create(){
    const item = document.createElement('div');
    item.textContent = this.name;
    item.classList.add('container-results__item');

    if(this.events.hasOwnProperty('select')){
      item.addEventListener('click', () => {
        this.events.select(this.id);
      });
    }

    return item;
  }
}

class HtmlFactory {
  constructor(type, props) {
    if(type === "post")
      return new Post(props);
    if(type === "smallPost")
      return new SmallPost(props);
    if(type === "tag")
      return new Tags(props);
    if(type === "comment")
      return new Comment(props);
    if(type === "tr")
      return new Tr(props);
    if(type === "trNoResults")
      return new TrNoResults(props);
    if(type === "itemResultTag")
      return new ItemResultTag(props);
  }
};

export default HtmlFactory;