import React from 'react'
import "./style.css"
import FishThumnail from "../FishThumbnail"

export default function TankThumbnail(props) {
    return (
        <div className="TankThumbnail">
            <h1>{props.name}</h1>
           
            {props.fish.map(fishie=><FishThumnail key={fishie.id} name={fishie.name} width={fishie.width} color={fishie.color}/>)}
        
        </div>
    )
}
