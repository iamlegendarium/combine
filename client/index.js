const clickBtn = () =>{
    let url = 'http://localhost:5000/register'

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