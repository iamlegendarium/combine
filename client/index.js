const clickBtn = () =>{
    let url = 'https://combine-eight.vercel.app/register'

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