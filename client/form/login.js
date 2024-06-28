const loginBtn = () => {
    const token = localStorage.setItem('token', token)
    let url = 'https://combine-4nvv.onrender.com/login'

    fetch(url)
    .then((response)=>{
        console.log(response);
    })
    .then((data)=>{
        localStorage.setItem('token', data.token)
        // return data.json()
    })
    .catch((error)=>{
        console.log(error);
    })
}

