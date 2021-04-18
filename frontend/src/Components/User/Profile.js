import React from 'react';
import styles from './CSS/Profile.module.css';
import Avatar from '@material-ui/core/Avatar';
import Navbar from '../Navigation/Navbar';
import AuthService from '../../ApiServices/services'
import Button from '@material-ui/core/Button';
import Travelling from './travelling';

function Profile(props){

    
    const [username,setuserId]=React.useState(props.match.params.username);
    const [user,setUser]=React.useState(null);
    const [name,setUserName]=React.useState(null);
    const [userbioo,setUserBio]=React.useState(null);
    const [profile_picture,setProfile]=React.useState('sa');
    const [friend,setFriend]=React.useState(null);


    React.useEffect( ()=>{
        AuthService.profile(username)
        .then(response => {
            console.log('Response:', response) 
        
                setUser(response.data.data);
        })
        .catch(error=>{console.log(error.response); 
           
            
        })
  
      }, []);
      
     

      let userName,destination,age,vehicle,myself=null;

      if(user!==null){
        userName=user.username;
        destination=user.destination;
        vehicle=user.vehicle;
        if(localStorage.getItem('username') == userName){
            myself=true;
        }
        age=user.age;  
    }
    const SendRequest=()=>{
        const form={}
        form['partner']=userName;
        AuthService.notification(form)
        .then(res=>{
            console.log(res);
            alert("friend request sent")
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    const Profile_picture=(
        profile_picture == null ?  <Avatar className={styles.avatar}/> : 
        <div className={styles.profile_picture}>
            <img src="/images/girlIcon.png" alt="profile picture" />
        </div>
    );

    return (
        <div className={styles.ProfileFont}>
        <Navbar/>
        {alert}
        <div className={styles.profileSection}>
            <div className={styles.profile}>
                <div className={styles.flex_col_center}>
                    {Profile_picture}
                </div>    

              <div className={styles.profile_personal}>
                <h5 className={styles.userName}>{username}</h5>
                <h5 className={styles.user_location}>{destination}</h5>
                <h5 className={styles.user_age}>{"age",age}</h5>
              </div>
              {friend === null ?
               <Button 
                    onClick={SendRequest}
                    disabled={myself ? true : false} 
                    variant="contained" 
                    color="secondary">Request saheli
                </Button>
                
                : <Button variant="contained" color="primary">Connected</Button>}
 
            </div>  
        </div>

        <div className={styles.AboutSection}>
            <div className={styles.bio}>

            
                <Travelling age={age} vehicle={vehicle} destination={destination}/>
            
            
            </div>
        </div>
    </div>
    );    
}

export default Profile;