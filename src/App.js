import { useState, useEffect } from "react";
function App() {
  const [fish, setFish] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");

  const [loginInfo, setLoginInfo] = useState({
    email:"",
    password:""
  })

  useEffect(() => {
    fetch("http://localhost:3001/api/fish")
      .then(res => res.json())
      .then(data => {
        setFish(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3001/gettokendata", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setUserId(data.id);
          setUserEmail(data.email);
          setToken(token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const logMeIn = (e) => {
    e.preventDefault()
    fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify({
        email: loginInfo.email,
        password: loginInfo.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        setUserId(data.user.id);
        setUserEmail(data.user.email);
        setToken(data.token);
        localStorage.setItem("token", data.token);
      }).catch(err=>{
        console.log(err);
      });
  };

  const logMeOut = ()=>{
    localStorage.removeItem("token");
    setUserId(0);
    setUserEmail("");
    setToken("");
  }

  const handleInputChange = e=>{
    console.log(e.target.name,e.target.value)
    setLoginInfo({
      ...loginInfo,
      [e.target.name]:e.target.value
    })
  }

  return (
    <>
      <h1>Hello</h1>
      {userEmail ? (
        <div>

        <h2>Welcome to the club, {userEmail}</h2>
        <button onClick={logMeOut}>LogOut</button>
        </div>
      ) : (
        <form onSubmit={logMeIn}>
          <input value={loginInfo.email} onChange={handleInputChange} name="email"/>
          <input value={loginInfo.password} onChange={handleInputChange} name="password"/>
        <button >Login</button>
        </form>
      )}
      {fish.map(fishy => (
        <h2 key={fishy.id}>{fishy.name}</h2>
      ))}
    </>
  );
}

export default App;
