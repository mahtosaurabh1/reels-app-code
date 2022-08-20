import { useEffect, useState } from "react"
import {auth} from "../firebase"
import {signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import './login.css'
import {Link} from 'react-router-dom'
function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [user,setUser] = useState(null);
    const [loader,setLoader] = useState(false);
    const [error,setError] = useState("");

    const trackEmail = function(e){
        setEmail(e.target.value);
    }

    const trackPassword = function(e){
        setPassword(e.target.value);
    }

    const printDetails = async function(){
        // alert(email + " " + password)
        try{
            setLoader(true);
            let userCred = await signInWithEmailAndPassword(auth,email,password)
            setUser(userCred.user)
        }catch(err){
            setError(err.message);
            setTimeout(()=>{
                setError("")
            },2000)
        }
        setLoader(false);
    }
    
    const logOut = async function(){
        await signOut(auth);
        setUser(null);
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
            //   const uid = user.uid;
              setUser(user);
              // ...
            } else {
              // User is signed out
              // ...
              setUser(null);
            }
        })
    },[])

    return (
        <>
      <div className="logheader">
      <div className="login-header">
        <li>Home</li>
        <li>About Us</li>
        <li>Contact</li>
    </div>
      </div>
          <div className="mainbody">
          <img src="https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png" alt="" />
     <div className="login-cont">
        <h1 >Login User</h1>
     {
        error != "" ? <h1>Error is {error}</h1>:
             loader == true?<h1>...Loading</h1>:
                user != null ? <><h1>User is {user.uid}</h1> <button onClick={logOut}>Log out</button></>:           
             <>
              <div className="input-grp">
            <div>Email</div>
            <input type="email" onChange={trackEmail}  placeholder="email" />
        </div>
        <div className="input-grp">
            <div>password</div>
            <input type="password" onChange={trackPassword} placeholder="password" />
        </div>
         <div className="btn-cont">
         <button type="click" onClick={printDetails}>Login</button>
         <Link to='/signup'><button>Signup</button></Link>
         </div>

           </> 
            }
     </div>
          </div>

             
             
             <div className="footer-login">
                All Right are reserved
             </div>
        </>
    )
}

export default Login