import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GoogleOauthTes from "./GoogleLogin";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import GoogleOauthTest from "./GLogin";
function Login() {
  const navigate = useNavigate();
  const [Email, setemail] = useState("");
  const [Password, setpassword] = useState("");
  const [PwtVisibility, setPwtVisibility] = useState(false);

  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [errorMsg, seterrorMsg] = useState("");
  const [errorMsg1, seterrorMsg1] = useState("");
  const [user, setUser] = useState(true);
  const [executeEffect, setExecuteEffect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);

  // const toggleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  

  const handleShow = () => setShow(true);

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const encodedpassword = encodeURIComponent(Password);
  var P = parseInt(localStorage.getItem("value"));
  //console.log(P);

  // const getuser =(e)=>
  //     {
  //       console.log(e.target.value) ;
  //         localStorage.setItem("value",e.target.value);
  //       setUser(e.target.value);
  //     }

  useEffect(() => {
    if (executeEffect) {
      // Call getuser before login
      getuser();
      login();
      validate();

      // Reset the state to prevent re-execution on subsequent renders
      setExecuteEffect(false);
    }
  }, [executeEffect]);

  const handleBoth = () => {
    // Set the state to true when the button is clicked
    setExecuteEffect(true);
  };

  async function getuser() {
    try {
      let item2 = { Email, Password };
      let result1 = await fetch(
        `https://localhost:7114/api/TrainerRegt/GetName?email=${Email}&password=${encodedpassword}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item2),
        }
      );
      result1 = await result1.json();
      //console.log(result1);
      localStorage.setItem("value", 1);
      //localStorage.setItem("par",2);
      var p = localStorage.getItem("value");
      // console.log(p);
    } catch (error) {
      console.error("Error checking email and password existence:", error);
    }

    // The rest of your code...
  }

  async function login() {
    localStorage.setItem("email", Email);
    localStorage.setItem("password", Password);
    //console.log(Email);
    //console.log(Password);
    var email1 = localStorage.getItem("email");
    var password1 = localStorage.getItem("password");

    var p = localStorage.getItem("value");
    //console.log(p);

    // if( p === 1 )
    // {
    //     setUser(true);
    // }
    // else{
    //   setUser(false);
    // }

    if (p == 1) {
      if (
        (email1 === "admin@gmail.com" && password1 === "admin") ||
        (email1 === "gnarendra@gmail.com" && password1 === "narendra")
      ) {
        console.log("Moving to admin");
        navigate("/admin");
      } else {
        console.warn({ Email, Password });
        try {
          let item = { Email, Password };
          let result = await fetch(
            `https://localhost:7114/api/TrainerRegt/login?email=${Email}&password=${encodedpassword}`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(item),
            }
          );
          result = await result.json();
          //console.log(result);
          localStorage.setItem("par", result);


          let item2 = { Email, Password };
          let result1 = await fetch(
            `https://localhost:7114/api/TrainerRegt/GetName?email=${Email}&password=${encodedpassword}`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(item2),
            }
          );
          result1 = await result1.json();
          //console.log(result1);
          localStorage.setItem("name", result1);
          //console.log(`Global name is ${result1}`);

          var res = localStorage.getItem("par");
          //console.log(res)
          if (res !== "Unauthorized") {
            setisLoggedIn(true);
            //console.log(result)
            navigate("/trainer");
            //console.log(res);
          } else {
            console.log("User not found");
            setisLoggedIn(false);
            //alert("User not found");
          }
        } catch (error) {
          console.log(error);
        }

        try {
          if (Email === "") {
            setisLoggedIn(true);
            seterrorMsg("Please Enter An Email");

            return false;
          }
          seterrorMsg("");
          return true;
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (
        (email1 === "admin@gmail.com" && password1 === "admin") ||
        (email1 === "gnarendra@gmail.com" && password1 === "narendra")
      ) {
        console.log("Moving to admin");
        navigate("/admin");
      } else {
        console.warn({ Email, Password });
        try {
          let item = { Email, Password };
          let result = await fetch(
            `https://localhost:7114/api/MemberRegt/login?email=${Email}&password=${encodedpassword}`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(item),
            }
          );
          result = await result.json();
          console.log(result);
          localStorage.setItem("par", result.kiran);
          localStorage.setItem("clientID", result.user.memberId);
          let item2 = { Email, Password };
          let result1 = await fetch(
            `https://localhost:7114/api/MemberRegt/GetName?email=${Email}&password=${encodedpassword}`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(item2),
            }
          );
          result1 = await result1.json();
          console.log(result1);
          localStorage.setItem("name", result1);
          console.log(`Global name is ${result1}`);

          var res = localStorage.getItem("par");
          console.log(res);
          if (res === "Authorized") {
            setisLoggedIn(true);
            console.log(result);
            navigate("/member");
          } else {
            console.log("User not found");
            setisLoggedIn(false);
            alert("User not found");
          }
        } catch (error) {
          console.log(error);
        }

        try {
          if (Email === "") {
            setisLoggedIn(true);
            seterrorMsg("Please Enter An Email");

            return false;
          }
          seterrorMsg("");
          return true;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  // if(.)
  // {
  //    navigate('/Home');
  // }
  // else{
  //   alert(`Invalid Login`);
  // }
  // async function login() {
  // axios.post('https://localhost:7114/api/TrainerRegt/login', { Email, Password })
  //   .then((response) => {
  //     navigate('/trainer');
  //     localStorage.setItem('IsLoggedIn', true);
  //     localStorage.setItem('UserDetails', JSON.stringify(response));
  //     localStorage.setItem('email',Email);
  //     console.log("login page");
  //   })
  //   .catch((err) => { alert('Invalid Login') })
  //     navigate("/register");
  // }
  function validate() {
    try {
      if (Password === "") {
        setisLoggedIn(true);
        seterrorMsg1("Please Enter A Password");
        return false;
      }
      seterrorMsg1("");
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login-container">
      <div className="left-half"></div>
      <div className="right-half">
        <div className="login-form">
          <h1>Login Page</h1>
          <input
            type="text"
            value={Email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="email"
            className="form-control"
          />
          {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : ""}
          <br></br>
          <input
            type={PwtVisibility ? "text" : "password"}
            value={Password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="password"
            className="form-control"
          />
          {errorMsg1 ? <p style={{ color: "red" }}>{errorMsg1}</p> : ""}
          <br></br>
          <div className="form-check mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              name="roomAvailable"
              onChange={() => {
                setPwtVisibility(!PwtVisibility);
              }}
              checked={PwtVisibility}
            />
            <label className="form-check-label">Show Password</label>
            <br></br>
          </div>
          <br></br>
          <button
            type="button"
            onClick={handleBoth}
            className="form-control btn btn-primary"
          >
            Login
          </button>
          {isLoggedIn ? (
            ""
          ) : (
            <div>
              <br></br>
            <p style={{ fontWeight: "bold",color:"red" }}>Email or Password is Incorrect</p>
            </div>
          )}
          {/* <p style={{ color: "black" }}>
                      Dont have an account? <a href="/register"> Signup </a>
                    </p> */}
          <center>or</center>
          <span>Don't have an account? </span>{" "}
          <Link className="signup-text" onClick={handleShow}>
            {" "}
            Signup
          </Link>
          <Modal show={show} onHide={handleClose} style={modalStyle}>
            <Modal.Header closeButton>
              <Modal.Title>Choose your SignUp option:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="button-container">
                <Link to="/registermember">
                  <Button variant="primary" onClick={handleClose}>
                    Signup as a Member
                  </Button>
                </Link>

                <div className="button-space"></div>

                <Link to="/register">
                  <Button variant="primary" onClick={handleClose}>
                    Signup as a Trainer
                  </Button>
                </Link>
              </div>
            </Modal.Body>
          </Modal>
          <br></br>
          <br></br>
          {/* <GoogleOauthTes><GoogleButton /></GoogleOauthTes> */}
          <GoogleOauthTest></GoogleOauthTest>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
