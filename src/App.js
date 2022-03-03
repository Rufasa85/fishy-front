import  {useState,useEffect} from "react";
function App() {
  const [fish, setFish] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:3001/api/fish").then(res=>res.json()).then(data=>{
      setFish(data);
    }).catch(err=>{
      console.log(err);
    })

  },[])
  return (
    <>
    <h1>Hello</h1>
    {fish.map(fishy=><h2 key={fishy.id}>{fishy.name}</h2>)}
    </>
  );
}

export default App;
