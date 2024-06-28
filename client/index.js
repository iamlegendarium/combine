const clickBtn = () =>{
    let url = 'https://combine-4nvv.onrender.com/register'

    fetch(url)
    .then((response)=>{
        return response
    })
    .then((data)=>{
        return data.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}