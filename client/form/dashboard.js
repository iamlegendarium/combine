const loginBtn = () => {
    let url = 'https://combine-4nvv.onrender.com/login'

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