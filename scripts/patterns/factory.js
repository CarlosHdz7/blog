class SmallPost {
  constructor(props){
    this.title = props.title;
    this.url = props.url;
    this.id = props.id;
    return this.create();
  }

  create(){
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let img = document.createElement('img');
    let a = document.createElement('a');

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
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let img = document.createElement('img');
    let a = document.createElement('a');
    let small = document.createElement('small');
    let small2 = document.createElement('small');

    a.textContent = this.title;
    a.href = `post.html?id=${this.id}`;
    small.textContent = this.description;
    small2.textContent = this.date;
    img.src = this.url;

    a.classList.add('preview-post__title');
    small.classList.add('preview-post__subtitle');
    small2.classList.add('preview-post__date');
    div2.classList.add('preview-post__img');
    div3.classList.add('preview-post__descripcion');
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
    let span = document.createElement('span');
    let text = document.createTextNode(this.text);
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
    let div = document.createElement('div');
    let p = document.createElement('p');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span2');
    let text1 = document.createTextNode('Anonymous');
    let text2 = document.createTextNode(this.comment);


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
    return this.create();
  }

  create(){
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdTitle = document.createElement('td');
    let tdAuthor = document.createElement('td');
    let tdDate = document.createElement('td');
    let tdOptions = document.createElement('td');

    let txtId = document.createTextNode(this.id);
    let txtTitle = document.createTextNode(this.title);
    let txtAuthor = document.createTextNode(this.author);
    let txtDate = document.createTextNode(this.date);

    tdId.appendChild(txtId);
    tdTitle.appendChild(txtTitle);
    tdAuthor.appendChild(txtAuthor);
    tdDate.appendChild(txtDate);

    tr.appendChild(tdId);
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdDate);
    tr.appendChild(tdOptions);

    return tr;
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
  }
};

export default HtmlFactory;