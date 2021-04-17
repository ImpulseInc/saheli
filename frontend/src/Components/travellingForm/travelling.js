import React from "react";
import {Redirect} from "react-router-dom"
import Navbar from '../Navigation/Navbar';
import TextField from '@material-ui/core/TextField';
import styles from './form.module.css';
import Button from '@material-ui/core/Button';
import AuthService from '../../ApiServices/services';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from '../Button/Loading';

 function TravellingForm()  {

  
  const [destination,destinationHandler]=React.useState(null);
  const [vehicle, setState] = React.useState("metro");
  const [loading,loader]=React.useState(false);
  const [redirect,redirectHandler]=React.useState(null);

  const handleChange = (event) => {
    setState(event.target.value);
  };
  
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

    const classes = useStyles();
    const editHandler= (e)=>{
        destinationHandler(e.target.value);
    }

    const formSumbitHandler=(event)=>{
      event.preventDefault();
        loader(true);
        const formData={}
        formData["vehicle"]=vehicle;
        formData["destination"]=destination;
        
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
          loader(false)
          redirectHandler("/dashboard")
        })
        .catch(err=>{
          console.log(err)
        })



    }

    let button = null;
      
    {loading ? button = <LoadingButton/> : button=<Button onClick={(event)=>formSumbitHandler(event)} 
    type="sumbit" variant="contained" color="primary">Sumbit</Button>}

    if(redirect){
      return <Redirect to={redirect} />
    }
    return (
        <>
            <Navbar/>
              <h3 className={styles.heading}>Please fill up these details real quick!</h3>
                <form  autoComplete="off">

                  <div className={styles.form}> 
                    <TextField type="text" onChange={(e)=>editHandler(e)} id="from" label="Travelling to" required />
                   
                    <FormControl className={classes.formControl} required>
                    <InputLabel htmlFor="age-native-helper">Transport Mode</InputLabel>
                      <NativeSelect
                        value={vehicle}
                        onChange={handleChange}
                        inputProps={{
                          name: 'mode',
                          id: 'mode',
                        }}
                      >
                        <option value={'bicycle'}>Bicycle</option>
                        <option value={'walk'}>Walk</option>
                        <option value={'metro'}>Metro</option>
                        <option value={'Bus'}>Bus</option>
                        <option value={'Motorbike'}>Motorbike</option>
                        <option value={'taxi'}>Taxi</option>
                      </NativeSelect>
                      <FormHelperText>mode that you are using</FormHelperText>
                  </FormControl>
                  </div>
                <div  className={styles.sumbitButton}>
                  {button}
                </div>

                </form>
              
        </>
      );
}

export default TravellingForm;