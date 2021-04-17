import React, { Component } from "react";
import Switch from "react-switch";
import {Link,Redirect} from "react-router-dom";
import AuthService from '../../ApiServices/services'

 export default function SwitchButton(){

  const [checked,checkHandler] =React.useState( JSON.parse(localStorage.getItem('outside')));
  const [redirect,redirectHandler] =React.useState(null);
  

  const handleChange=(checked)=> {
    //this.setState({ checked });
    AuthService.outside({outside:checked})
    .then(res=>{
      console.log(res)
      if(res.data.Type == "Success")
      {
        redirectHandler("/travelForm");
        checkHandler(true)
         localStorage.setItem('outside',true);
      }
       //this.setState({redirect:"/travelForm"})}
    
    })
    .catch(err=>{
      console.log(err)
    })
  }

  if(redirect){
    return <Redirect to={redirect} />
  }
    console.log(checked)
     
    return (
    
        <Switch 
        onChange={handleChange} 
        className="toggler-button" 
        checked={checked}
        offColor={"#F50057"} />    
    );
}
