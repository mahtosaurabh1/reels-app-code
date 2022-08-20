import {useState} from "react"
import {auth,db} from "../firebase"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {setDoc,doc} from "firebase/firestore"
import './signup.css'
import { Link } from "react-router-dom"
function Signup(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const[loader,setLoader] = useState(false);
    const[error,setError] = useState("");
    const[user,setUser] = useState("");
    
    async function processSignup(){
        try{
            setLoader(true);
            let userCred = await createUserWithEmailAndPassword(auth,email,password)
            await setDoc(doc(db, "users", userCred.user.uid), {
                email,
                name,
                reelsIds:[],
                profileImgUrl:"",
                userId:userCred.user.uid
              });
            setUser(userCred.user);
        }catch(error){
            setError(error.message);
            setTimeout(()=>{
                setError("")
            },2000)
        }
        setLoader(false);
    }

    return(<>

<div className="supheader">
<div className="signup-header">
        <li>Home</li>
        <li>About Us</li>
        <li>Contact</li>
    </div>
</div>
   
    <div className="signupmain">
       <div className="signup-content">
       <div className="createacnt">Create Account</div>
    {error!=""?<h1>Error is {error}</h1>:
        loader == true?<h1>...Loading</h1>:
            user!=""?<h1>Sign up User is {user.uid}</h1>:
        <>
        <div className="input-grp">
            <div>Email</div>
        <input type="email" onChange={(e)=>{setEmail(e.target.value)}}  value={email} placeholder="email"></input>
        </div>
        <div className="input-grp">
            <div>password</div>
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value ={password} placeholder="password"></input>
        </div>
        <div className="input-grp">
            <div>Full Name</div>
        <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder="Full Name"></input>
        </div>
         <div className="btn-cont">
         <button type="click" onClick={processSignup}>Sign up</button>
         <Link to='./login'><button>Login</button></Link>
         </div>
        </>
    }
    </div>
       </div>
       <div className="footer">
                All Right are reserved
             </div>
        </>
    )
}

export default Signup