class SmallPost {
  constructor(props){
    this.title = props.title;
    this.url = props.url;
    this.id = props.id;
    return this.create();
  }

  create(){
    const div1 = document.createElement('a');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const img = document.createElement('img');
    const a = document.createElement('a');

    a.textContent = this.title;
    div1.href = `post.html?id=${this.id}`;
    img.src = this.url;


    div1.classList.add('preview-small-post');
    div2.classList.add('small-post__img');
    a.classList.add('small-post__title');

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
    this.likes = props.likes;
    return this.create();
  }

  create(){
    const div1 = document.createElement('a');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    const div5 = document.createElement('div');
    const div6 = document.createElement('div');

    const img = document.createElement('img');
    const a = document.createElement('a');
    const small = document.createElement('small');
    const small2 = document.createElement('small');
    const small3 = document.createElement('small');

    a.textContent = this.title;
    div1.href = `post.html?id=${this.id}`;
    small.textContent = this.description;
    small2.textContent = this.date;
    small3.textContent = this.likes;
    img.src = this.url;

    a.classList.add('preview-post__title');
    small.classList.add('preview-post__subtitle');
    small2.classList.add('preview-post__date');
    div2.classList.add('preview-post__img');
    div3.classList.add('preview-post__description');
    div4.classList.add('d-flex','justify-content-between');
    div5.classList.add('d-flex');
    div6.classList.add('like','mr-1');

    (this.size === 'square')
      ? div2.classList.add('img-square')
      : div2.classList.add('img-rectangle');

    (this.size === 'square')
      ? div1.classList.add('preview-post')
      : div1.classList.add('preview-post','w-100')

    div2.appendChild(img);
    div3.appendChild(a);
    div3.appendChild(small);

    div5.appendChild(div6);
    div5.appendChild(small3);
    div4.appendChild(div5);
    div4.appendChild(small2);
    div3.appendChild(div4);
    div1.appendChild(div2);
    div1.appendChild(div3);

    return div1;
  }
}
class Tags {
  constructor(props){
    this.text = props.name;
    this.id = props.id;
    this.events = props.events;
    this.cross = props.cross;
    return this.create();
  }

  create(){
    const div =document.createElement('div');
    const span = document.createElement('span');
    const text = document.createTextNode(this.text);
    const span2 = document.createElement('span');
    const text2 = document.createTextNode('✖');
    span.appendChild(text);
    
    if(this.cross){
      span2.appendChild(text2);
    }

    if(this.events && this.events.hasOwnProperty('remove')){
      span2.addEventListener('click', () => {
        this.events.remove(this.id);
      })
    }
    
    div.classList.add('tag');
    span2.classList.add('close-tag');
    div.appendChild(span)
    div.appendChild(span2)
    return div;
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
    const text1 = document.createTextNode('Anonymous:');
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

class ErrorMessage{
  constructor(props){
    this.message = props.message;
    return this.create();
  }

  create(){
    const p = document.createElement('p');
    p.classList.add('error-message');
    p.textContent = this.message;

    return p;
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
    if(type === "errorMessage")
      return new ErrorMessage(props);
  }
};

export default HtmlFactory;