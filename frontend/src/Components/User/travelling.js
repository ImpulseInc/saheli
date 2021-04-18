import React from 'react';
import styles from './CSS/travelling.module.css';
import DirectionsTransitTwoToneIcon from '@material-ui/icons/DirectionsTransitTwoTone';

export default function travelling(props) {
  
  return (
         <>
         <div className={styles.travel_status}>
             <p>Status: </p>
             <span>  Travelling right now.</span>
         </div>
            <div className={styles.travel}>
            <div className={styles.travel_left}>
                    <p>From</p>
                    <h1>Sector 53</h1>
                    <h4>by {props.vehicle}</h4>
            </div>

            < DirectionsTransitTwoToneIcon className={styles.travel_icon}/>

            <div className={styles.travel_right}>
                    <p>To</p>
                    <h1>{props.destination}</h1>
                    <h4>by {props.vehicle}</h4>
            </div>

            </div> 
        </>
  );
}