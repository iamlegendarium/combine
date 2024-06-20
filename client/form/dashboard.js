const loginBtn = () => {
    let url = 'http://localhost:5000/login'

    fetch(url)
    .then((response)=>{
        return response.data()
    })
    // .then((data)=>{
    //     return data.json()
    // })
    .catch((error)=>{
        console.log(error);
    })
}