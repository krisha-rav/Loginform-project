import{ useState } from 'react'
import '../CSS/Login.css'
import { NavLink } from "react-router-dom";
import background from '../images/background.jpg'


const Login = () => {

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  //post
  const handleLogin = async (e)=> {
    e.preventDefault();

    try{
      const response= await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({
            email,
            password,
          }),
        }

      );
      const data = await response.json();
      if(response.ok){
         sessionStorage.setItem("token", data.token);
        alert("Login Successfull");
        console.log(data);
      }else{
        alert(data.message || "Invalid username or password");
      }
    }
    catch(error){
      console.error("Error:", error);
      alert("Something went wrong");
    }

  }


  return (
    <div className="login-page">

      <div className="login-card">
        <div className="login-image">

          <img   src={background} alt="Img Not Found"/>
         
          <div className="image-content">
            <div className="logo"> Welcome Back 👋 </div>
          </div>
        </div>

        <div className="login-form">
          <div className="form-content">

            <h1> User Login. </h1>

       <form onSubmit={handleLogin}>
            <div className="input">
              <label htmlFor="username"> Email </label>
              <input type="text"  id="username" placeholder="Enter your username" value={email} onChange={(e) => setEmail(e.target.value)}/> 
            </div>

            <div className="input">
              <label htmlFor="password"> Password </label>
              <input  type="password"  id="password"  placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="options">
              <label className="remember">
                <input type="checkbox" />  Remember me  </label>
             <NavLink to="/forgot-password"> Forgot password? </NavLink>
            </div>

            <button className="login-btn"> Login <span>→</span>  </button>

       </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login