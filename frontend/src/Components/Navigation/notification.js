import React from "react";
import AuthService from '../../ApiServices/services';
import useInterval from '@use-it/interval';
import './notification.css'


export default function Notificaiton(props){

    const [notification,setNotification]=React.useState(null);
    
    

    useInterval(()=>{

        AuthService.Get_notification()
        .then(res=>{
              setNotification(res.data)
              console.log(res)
        })
        .catch(err=>{
            console.log(err);
        })
        
    }, 10000);

    let noti = null;

    if(notification){
        noti=(notification.map((user,index)=>{
            console.log(user)
            return (<>
                    <p>{user.issuer} sent you request</p>
                    <div className="friend_request" >
                        <span onClick={()=>Accept_Request(user.issuer)} style={{marginRight:"10px",marginLeft:"10px"}}>Accept</span>
                         <span>Reject</span>
                    </div>
                </>
            )
        }))
    }
    const Accept_Request = (t)=>{
        const form={}
        
        form["partner"]=t;
        console.log(form)
        AuthService.Accept_request(form)
        .then(res=>{
            console.log(res)
            alert('request accepted')
      })
      .catch(err=>{
          console.log(err);
      })
    }


    return (
        <div className="notification">
        <div className="notification_block">
            {noti}
        </div>
    </div>
    );
}

