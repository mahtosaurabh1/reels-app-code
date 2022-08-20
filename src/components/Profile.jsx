import React, { useEffect, useState } from "react"
import "./profile.css"
import {useContext} from "react"
import {AuthContext} from "../context/AuthContext"
import {db} from "../firebase"
import {doc,getDoc} from "firebase/firestore"
import { Link } from "react-router-dom"

function Profile(){
    let cUser = useContext(AuthContext);
    let [loading,setLoading] = useState(true)
    let [user,setUser] = useState(null);
    useEffect(function fn(){
        (async function(){
            if(cUser){
                //read from dabase
                const docRef = doc(db,"users",cUser.uid);
                const userObj = await getDoc(docRef);
                console.log("Document Data: ",userObj.data())
                setUser(userObj.data());
                setLoading(false);
            }
        })()
    },[])

    return (
            <>
                {loading == true?<div>...Loading</div>:    
            <>
         <div className="pheader">
         <div
        className="profile-header">
            <li><Link to='/feed'><button>Feed</button></Link></li>
            <li>About Us</li>
            <li>Contact</li>
        </div>
         </div>
         <div className="main">
             <div className="pimg_container">
                 <img src="https://i.pinimg.com/736x/f3/10/0c/f3100c7d165dba833efa140bc7e9f73c.jpg" className="pimg" />
             </div>
             <div className="details">
                 <div className="content">user.name</div>
                 <div className="content">No of Posts: user.reelsIds.length </div>
                 <div className="content">user.email</div>
             </div>
            
         </div>
         <div className="footer">
                All Right are reserved
             </div>
         </>
         }
        </>
    )
}

export default Profile