import {useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import "./style.css"
import Fish from '../../components/Fish';
import API from '../../utils/API';

export default function TankDetail() {
    const params = useParams();
    const [tank, setTank] = useState({
        name:"",
        Fishes:[]
    })
    useEffect(() => {
        API.getSingleTank(params.id)
       .then(data=>{
            setTank({
                name:data.name,
                Fishes:data.Fishes
            })
        })
    }, [])
    return (
        <>
            <h1>{tank.name}</h1>
        <div className="TankDetail">
            {tank.Fishes.map(fishie=><Fish key={fishie.id} name={fishie.name} color={fishie.color} width={fishie.width}/>)}
        </div>
        <div className="seaFloor"></div>
        </>
    )
}
