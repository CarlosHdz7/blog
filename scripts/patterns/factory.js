class Post {
  constructor(props){
    this.text = props.name;
    return this.create();
  }

  create(){
    let p = document.createElement('p');
    let text = document.createTextNode(this.text);
    p.appendChild(text);

    return p;
  }
}

class SmallPost {
  constructor(props){
    this.title = props.title;
    this.url = props.url;
    return this.create();
  }

  create(){
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let img = document.createElement('img');
    let span = document.createElement('span');

    span.textContent = this.title;
    img.src = this.url;


    div1.classList.add('preview-small-post');
    div2.classList.add('small-post__img');
    div3.classList.add('small-post__title');

    div2.appendChild(img);
    div3.appendChild(span);
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

class HtmlFactory {
  constructor(type, props) {
    if(type === "post")
      return new Post(props);
    if(type === "smallPost")
      return new SmallPost(props);
    if(type === "tag")
      return new Tags(props);
  }
};

export default HtmlFactory;