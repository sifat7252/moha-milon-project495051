// import app, { auth } from "../Firebase/firebase.config.js";
import { Link } from "react-router-dom";
import { GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRef, useState } from "react";
import auth from "../Firebase/firebase.config";
// import { loginPage } from "../Pages/loginpage";

const LoginDaisy = () => {

    const [user, setUser] = useState(null);
    
    const [isGoogleBtnHidden, setGoogleBtnIsHidden] = useState(true);
    const [isGithubBtnHidden, setGithubBtnIsHidden] = useState(true);
    const [isEmailBtnHidden, setEmailBtnIsHidden] = useState(true);
    const [showPasswordIcon, setShowPasswordIcon] = useState(false);
    const [logInError, setLogInError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const emailRef = useRef(null);

// ::   FORM LOG IN AND GETTING INPUT DATA   ::

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password)

    //::: RESET THE LOGIN ERROR AND SUCCESS MASSAGE STATES :::
    setLogInError("");
    setSuccessMessage("")

    //   :: LOGIN USER WITH EMAIL AND PASSWORD  ::


    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
        const user = result.user;
        console.log(user);
        if(result.user.emailVerified){
            
            setSuccessMessage('User Login Successfully')
        }
        else {
            alert('Please verify your email before LogIn ')
        }
    })
    .catch(error=>{
        console.log(error)
        setLogInError(error.message)
    })

  };

  //   ::: FORGET PASSWORD EVENT HANDLER :::

const handleForgetPassword = () => {
    // console.log('forget button clicked')
    const email = emailRef.current.value;
    // console.log(email)
    if(!email){
        // setLogInError(error.message)
        console.log('Please provide email', emailRef.current.value)
        return;
    }
    else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
        console.log('please provide a valid email')
        return;
    }

    //  ::: SEND VERIFICATION EMAIL FOR RESETTING PASSWORD ::::
    sendPasswordResetEmail(auth, email)
    .then(()=>{
        alert('Please check Your Email')
    })
    .catch( error =>{
        console.log(error)
    })
}
  

//   ::  TOGGLE BUTTON HANDLER ::
const googleButton = () => {
    setGoogleBtnIsHidden(!isGoogleBtnHidden)
}
const githubButton = () => {
setGithubBtnIsHidden(!isGithubBtnHidden)
}
const emailButton = () => {
    setEmailBtnIsHidden(!isEmailBtnHidden)
}






// ::   AUTHENTICATION PROVIDERS   ::
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

// :: GOOGLE LOGIN BUTTON EVENT HANDLER ::

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedGoogleUser = result.user;
        console.log(loggedGoogleUser);
        setUser(loggedGoogleUser)
      })
      .catch((error) => {
        console.log(error);
      });
  };

//   ::  GITHUB LOG IN EVENT HANDLER ::
const handleGithubLogin = () => {
    signInWithPopup (auth, githubProvider)
    .then( result => {
        const loggedGithhubUser = result.user;
        console.log(loggedGithhubUser);
        setUser(loggedGithhubUser)
    })
    .catch(error => {
        console.log(error)
    })
}

//   ::   SIGN OUT BUTTON HANDLER ::

  const handleSignOut = () => {
    signOut(auth)
    .then(result => {
        setUser(null)
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })
  };




  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="flex mx-auto flex-row  gap-3">
                    <button onClick={googleButton} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline ">Google Login</button>
                    <button onClick={githubButton} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline">Github Login</button>
                    <button onClick={emailButton} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline">Email Login</button>
                </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleLogin}>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    ref={emailRef} 
                    className="input input-bordered"
                    name="email"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                 <div className="relative">
                 <input
                    type={ showPasswordIcon ? "text" : "password"}
                    placeholder="password"
                    className="input input-bordered w-full"
                    name="password"
                    required
                  />
                  <span onClick={()=> setShowPasswordIcon(!showPasswordIcon)} className="absolute top-4 right-2">{showPasswordIcon ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
                 </div>
                  <label className="label">
                    <Link onClick={handleForgetPassword} className="label-text-alt link link-hover">
                      Forgot password?
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                    {
                        user ?  <button onClick={handleSignOut} className="btn btn-primary">Sign Out</button> :
                        <>
                        <button onClick={handleGoogleLogin} id="toggle-btn1" className={isGoogleBtnHidden ? 'hidden-button' : 'visible-button'}
        style={{ display: isGoogleBtnHidden ? 'none' : 'block' }}>Google Login</button>
                  <button onClick={handleGithubLogin} id="toggle-btn2" className={isGithubBtnHidden ? 'hidden-button' : 'visible-button'}
        style={{ display: isGithubBtnHidden ? 'none' : 'block' }}>Github Login</button>
                  <button  id="toggle-btn3" className={isEmailBtnHidden ? 'hidden-button' : 'visible-button'}
        style={{ display: isEmailBtnHidden ? 'none' : 'block' }}>Email Login</button>
                        </>                  
                  
                    }
                 
                </div>
              </form>
              <br />
              <div>
                    {logInError && <p className="font-semibold text-xl text-center text-red-600">{logInError}</p>}
                    {successMessage && <p className="font-semibold text-xl text-center text-green-600">{successMessage}</p>}
                  </div>
              <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                New Here ?
                <Link to="/registerdaisy">
                  <button className=" btn-link font-medium text-pink-500 transition-colors hover:text-blue-700">
                    Register
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDaisy;
