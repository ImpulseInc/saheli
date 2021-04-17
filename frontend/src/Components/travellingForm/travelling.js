import React from "react";
import Navbar from '../Navigation/Navbar';
import TextField from '@material-ui/core/TextField';
import styles from './form.module.css';
import Button from '@material-ui/core/Button';
import AuthService from '../../ApiServices/services';

 function TravellingForm()  {

    const [location,locationHandler]=React.useState({to:null,vehicle:null});
    
    const editHandler= (e,form)=>{
        locationHandler({...location,[form]:e.target.value});
    }

    const formSumbitHandler=(event)=>{
      event.preventDefault();
        const formData={}
        formData["vehicle"]=location['vehicle'];
        formData["destination"]=location['to'];
        
        AuthService.vehicle(formData)
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })

        AuthService.destination(formData)
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })



    }

    return (
        <>
            <Navbar/>
              <h3 className={styles.heading}>Please fill up these details real quick!</h3>
                <form  autoComplete="off">

                  <div className={styles.form}> 
                    <TextField type="text" onChange={(e)=>editHandler(e,"to")} id="from" label="Travelling to" required />
                    <TextField type="text" onChange={(e)=>editHandler(e,"mode")} id="mode" label="Mode of transport" required/>
                  </div>
                <div  className={styles.sumbitButton}>
                  <Button onClick={(event)=>formSumbitHandler(event)} type="sumbit" variant="contained" color="primary">Sumbit</Button>
                </div>

                </form>

                
        </>
      );
}

export default TravellingForm;