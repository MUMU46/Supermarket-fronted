// Example POST method implementation:
export  async function postData (url = '', data = {},method: 'POST'){
    // Default options are marked with *
    const preurl='http://47.99.191.1:8467';
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not available');
    }
    
    const response = await fetch(preurl+url, {
      method, 
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'token':token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
     /*  redirect: 'follow', */ // manual, *follow, error
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  export  async function getJson (url = ''){
    // Default options are marked with *
    const preurl='http://47.99.191.1:8467';
    const token = localStorage.getItem('token')
    if(!token){
      return
    }
    const response = await fetch(preurl+url, {
      method:'GET', 
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'token':token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
     
      //redirect: 'follow', // manual, *follow, error
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  export  async function putData (url = '', data = {},method: 'PUT'){
    // Default options are marked with *
    const preurl='http://47.99.191.1:8467';
    const token = localStorage.getItem('token')
    if(!token){
      return
    }
    const response = await fetch(preurl+url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'token':token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
     /*  redirect: 'follow', */ // manual, *follow, error
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }

  /* postData('https://example.com/answer', { answer: 42 })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    }); */