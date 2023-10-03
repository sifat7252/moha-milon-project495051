import { useContext } from "react";
import { AuthContext } from "./Provider/AuthProvider";



const Home = () => {

    const authInfo = useContext(AuthContext)
    console.log(authInfo);

    
    return (
        <div>
            <h2>this is our context :</h2>
        </div>
    );
};

export default Home;