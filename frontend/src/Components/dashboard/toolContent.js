import React from "react";
import {Link} from 'react-router-dom';

export default function content(props){
    
    return (
        <div>
            <Link to={`/profile/${props.name}`}><p>Username: {props.name}</p></Link>
            <p>Distance: {props.distance}</p>
            <p>Destination: {props.destination}</p>
            <p>Mode: {props.location}</p>
        </div>
    );
}