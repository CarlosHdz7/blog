let instance = null;

class Singleton {
  
  constructor(){
    if (!instance) {
      instance = this;
    }
  }

  singletonMethod() {
    return 'singletonMethod';
  }

  async getPost() {
    const response = await fetch('http://localhost:3000/posts');
    const data = await response.json();
    return data;
  }
}

export default Singleton;