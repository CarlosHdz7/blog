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
    if(type === "tag")
      return new Tags(props);
  }
};

export default HtmlFactory;