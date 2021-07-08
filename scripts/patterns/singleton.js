let instance = null;

/*SINGLETON*/
class Singleton {
  
  constructor(BASEURL){

    if (!instance) {
      instance = this;
    }

    this.url = BASEURL;

    return instance;
  }

  //Reusable functions
  async getData(endpoint = '', message = 'A error has ocurred') {

    const response = await fetch(`${this.url}${endpoint}`);

    if(!response.ok){
      throw new Error(message);
    }
    
    const data = await response.json();
    return data;
    
  }

  async postData(endpoint = '', data = {}, message = 'A error has ocurred') {

    const response = await fetch(`${this.url}${endpoint}`, {
      method: 'POST', 
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data)
    });

    if(!response.ok){
      throw new Error(message);
    }

    return response.json();
    
  }

  async patchData(endpoint = '', data = {}, message = 'A error has ocurred') {

    const response = await fetch(`${this.url}${endpoint}`, {
      method: 'PATCH', 
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data)
    });

    if(!response.ok){
      throw new Error(message);
    }

    return response.json();
    
  }

}

export default Singleton;