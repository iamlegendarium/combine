const loginBtn = () => {
    let url = 'https://combine-eight.vercel.app/login'

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