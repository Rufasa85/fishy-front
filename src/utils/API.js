// const BASEURL="http://localhost:3001"
const BASEURL="https://joes-fishies-back.herokuapp.com"

const API = {
    getTokenData: (token)=>{
        return fetch(`${BASEURL}/api/users/gettokendata`, {
            headers: {
              authorization: `Bearer ${token}`
            }
          })
            .then(res => res.json())
    },
    login: (email,password)=>{
       return fetch(`${BASEURL}/api/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password:password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
    },
    getTanks:()=>{
        return fetch(`${BASEURL}/api/tanks`)
        .then(res => res.json())
    },
    getSingleTank:id=>{
        return  fetch(`${BASEURL}/api/tanks/${id}`).then(res=>res.json())
    }
}

export default API;