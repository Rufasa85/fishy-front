import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import API from "../../utils/API"
import TankThumbnail from "../../components/TankThumbnail";
import "./style.css";

export default function Home() {
  const [tanks, setTanks] = useState([]);
  useEffect(() => {
    API.getTanks()
      .then(data => {
        setTanks(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className="Home">
      {tanks.map(tank => {
        return (
            <Link key={tank.id} to={`/tanks/${tank.id}`}>
              <TankThumbnail name={tank.name} fish={tank.Fishes}/>
            </Link>
        );
      })}
    </div>
  );
}
