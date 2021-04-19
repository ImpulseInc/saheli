import React from 'react';
import { MapContainer, TileLayer, Tooltip,Marker,Popup,useMapEvents, Rectangle,Circle,Polygon} from 'react-leaflet';
import  './dashboard.css';
import AddMarker from './AddMarker';
import Navbar from '../Navigation/Navbar';
import  NativeSelects from './filters';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Content from './toolContent';
import Key from './key';
import AuthService from '../../ApiServices/services';
import useInterval from '@use-it/interval';
import * as L from "leaflet";

export default function Dashboard(){ 

    //  Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {}
  });

  const blueIcon = new LeafIcon({
      iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
    }),
    greenIcon = new LeafIcon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
    }),
    redIcon = new LeafIcon({
        iconUrl:
          "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    })


    const [users,setUser] =React.useState(null);
   
    let place=null;
   

    useInterval(()=>{
        let data = {}
        if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition(function(position) {
                data["lon"]=100;           
                data["lat"]=30;                
                AuthService.location(data)
                .then(res=>{
                   console.log(res)
                   // undefined for some reason
                })
                .catch(err=>{
                    console.log(err.response);
                })
            
              });
        }
        
    }, 1000000);

    useInterval(()=>{

        AuthService.nearme()
        .then(res=>{
              setUser(res.data.data)
              console.log(res)
             
              
        })
        .catch(err=>{
            console.log(err.response);
        })
        
    }, 11000);

   
     if(users == null){
        place =null 
     } 
     else {
       // selfHandler([users[0][2][1],users[0][2][1]])/
       console.log(users)

         place =(
            users[0].map((x,index)=>{
             if(users[1].length !== index){
                console.log(index) 
           
               const log=x[2][0];
               const lat=x[2][1]
            
               if(users[1][index].emergengy){
                   console.log("emergency")
                return(
                    <Marker position={[lat,log]} 
                    icon={redIcon }
                    
                    key={index}>
                        <Popup
                            direction="bottom" 
                            offset={[-10, 20]} 
                            opacity={1}>
    
                            <Content 
                                name={x[0]} 
                                distance={x[1]}
                                destination={users[1][index].destination} 
                                location={users[1][index].vehicle}/>
    
                        </Popup>   
                        <Circle
                            center={[lat,log]}                    
                            pathOptions={{ fillColor: 'blue' }}
                            radius={users[1][index].prefer}>
                            <Tooltip>{x[0]}</Tooltip>
                        </Circle>
                    </Marker>   
                    )
               }
               else{
                return(
                <Marker position={[lat,log]} 
                icon={index==0 ? blueIcon :greenIcon }
                
                key={index}>
                    <Popup
                        direction="bottom" 
                        offset={[-10, 20]} 
                        opacity={1}>

                        <Content 
                            name={x[0]} 
                            distance={x[1]}
                            destination={users[1][index].destination} 
                            location={users[1][index].vehicle}/>

                    </Popup>   
                    <Circle
                        center={[lat,log]}                    
                        pathOptions={{ fillColor: 'blue' }}
                        radius={users[1][index].prefer}>
                        <Tooltip>{x[0]}</Tooltip>
                    </Circle>
                </Marker>   
                )
            }}})
         )
     }

      return (
         <> 
            <Navbar/>
            <div className="dashboard">
              <div className="dashboard_map">
                    <MapContainer
                    center={{ lat: 28.472539271419883, lng: 77.20691219155837 }}
                    zoom={10}
                    scrollWheelZoom={false}
                    className="map"
                    >
             

                
                    {place }

                    <AddMarker/>
                    
                   {/* // <Polygon pathOptions={{ color: 'purple' }} positions={multiPolygon}></Polygon> */}
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                {/* <Rectangle bounds={rectangle} pathOptions={{ color: 'black' }}>
                    
                </Rectangle> */}
                    </MapContainer>
                    <Key/>

                </div>
                <NativeSelects/>
            </div>
        </>
     );
    
  }