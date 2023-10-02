import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../Firebase/firebase.config";
import swal from "sweetalert";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";

const RegisterDaisy = () => {
  const [registerError, setRegisterError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, password);

    // :: RESET ERROR AND SUCCUSS  ::
    setRegisterError("");
    setSuccessMessage("");

    // :: CONDITION FOR PASSWORD LENGTH , UPPERCASE-LOWERCASE , AND CHECKED TICKED ::::

    if (password.length < 6) {
      setRegisterError("Password should be At least 6 character");
      return;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) {
      setRegisterError("Password Should at least one Uppercase, lowercase and number");
      return;
    } else if (!accepted) {
      setRegisterError("You must be checked out term and policies");
      return;
    }

    // :: CREATING NEW USER WITH EMAIL AND PASSWORD ::

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccessMessage("User created successfully");
        swal("User created successfully", successMessage, "success");

        // ::: PROFILE UPDATE :::
        updateProfile(result.user, {
            displayName: name,
            // photoURL: use hardcoded           
        })
        .then(()=>{
            alert('Profile Updated')
        })
        .catch()

        // :::: SEND A VERIFICATION EMAIL ON REGISTERED EMAIL :::
        sendEmailVerification(result.user)
        .then( ()=> {
            alert('please check your email and verify your account')
        })
        .catch(error =>{
            alert('Something is wrong', error.message)
        })
      })
      .catch((error) => {
        console.log(error.message);
        setRegisterError(error.message);

        swal("Opps !!! ", registerError, "error");
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register Now !</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered w-full"
                    name="name"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
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
                    type={showPasswordIcon ? "text" : "password" }
                    placeholder="password"
                    className="input input-bordered w-full"
                    name="password"
                    required
                  />
                  <span onClick={ () => setShowPasswordIcon(!showPasswordIcon)} className="absolute top-4 right-2">{showPasswordIcon ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
                  </div>
                  <br />
                  
                  <div className="mb-2">
                    <input type="checkbox" name="terms" id="terms" />
                    <label className="ml-2" htmlFor="terms">
                      Accept our <a href="">Terms and Conditions</a>
                    </label>
                  </div>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Register</button>
                </div>
              </form>
              <div>
                    {registerError && <p className="font-semibold text-xl text-center text-red-600">{registerError}</p>}
                    {successMessage && <p className="font-semibold text-xl text-center text-green-600">{successMessage}</p>}
                  </div>
                  <br />
              <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                Already have an account?
                <Link to="/logindaisy">
                  <button
                    className="btn-link font-medium text-pink-500 transition-colors hover:text-blue-700"
                    href="#"
                  >
                    Log In
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

export default RegisterDaisy;
