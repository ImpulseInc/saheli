import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import './dashboard.css'
import TextField from '@material-ui/core/TextField';
import AuthService from '../../ApiServices/services'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects() {
  const classes = useStyles();
  const [distance,distanceHandler]=React.useState(0);
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const editHandler=(event)=>{
      distanceHandler(event.target.value);
  }
  const SumbitHandler=(e)=>{
      e.preventDefault();
      const form ={}
      form['range']=distance;
      form['age']=state.age;
      AuthService.range(form)
      .then(res=>{
        console.log(res);
      })
      .catch(err=>{
        console.log(err.response);
      })
  }

  return (
 <div className="filter">

    <div>
    <TextField className={"distance"} type="text" onChange={(e)=>editHandler(e)} id="distance" label="distance filter (km)" required />

      <FormControl className={classes.formControl}>
        
        <NativeSelect
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: '',
          }}
        >
          <option value={17}>15-20</option>
          <option value={25}>20-30</option>
          <option value={35}>30-40</option>
        </NativeSelect>
      
      </FormControl>

    </div>

    <Button onClick={(e)=>SumbitHandler(e)} variant="contained" className="find_button" color="primary">Find Saheli</Button>

</div>
  );
}