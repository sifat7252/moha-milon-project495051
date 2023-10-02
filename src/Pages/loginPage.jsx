// import { Link } from "react-router-dom";



const loginPage = () => {

    // const handleLogin = e => {
    //     e.preventDefault();
    //     const email = e.target.Email.value;
    //     const password = e.target.Password.value;
    //     // console.log(email, password)
    // }

  return (
    <div>
      {/* <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
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
                    className="input input-bordered"
                    name="Email"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    name="Password"
                    required
                  />
                  <label className="label">
                    <Link className="label-text-alt link link-hover">
                      Forgot password?
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button
                    
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                </div>
              </form>
              <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                New Here ?
                <Link to="/register">
                  <button className=" btn-link font-medium text-pink-500 transition-colors hover:text-blue-700">
                    Register
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default loginPage;
