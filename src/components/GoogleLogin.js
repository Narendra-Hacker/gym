import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import GoogleButton from "react-google-button";
//import { useNavigate } from 'react-router-dom';
import { useState } from "react";
const GoogleOauthTes = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(true);
 
  // const nav = useNavigate();

  //   registraton using google
  const registerUser = (trainer) => {
    //FirstName:firstName,
    //       LastName:lastName,
    //       MobileNo:mobileNo,
    //       City:city,
    //       Experience:parseInt(experience),
    //       DateOfJoin:dateOfJoin,
    //       Salary:parseInt(salary),
    //       TrainingFees:parseInt(trainingFees),
    //       Email:email,

    const FirstName = trainer.firstName;
    const LastName = trainer.lastName;
    const MobileNo = trainer.mobileNo;
    const City = trainer.city;
    const Experience = trainer.experience;
    const DateOfJoin = trainer.dateOfJoin;
    const Salary = trainer.salary;
    const TrainingFees = trainer.trainingFees;
    const Password = trainer.sub;
    const Email = trainer.email;
    const ScheduleId = trainer.scheduleId;

    axios
      .post("https://localhost:7114/api/TrainerRegt/Register", {
        FirstName,
        LastName,
        MobileNo,
        City,
        Experience,
        DateOfJoin,
        Salary,
        TrainingFees,
        Email,
        Password,
        ScheduleId,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data, response.status);
          loginUser(trainer);
        } else if (response.status === 409) {
          console.log(response.data);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginUser = async (user) => {
    const Email = user.email;
    const Password = user.sub;
    try {
      let item = { Email, Password };
      let result = await fetch(
        `https://localhost:7114/api/TrainerRegt/login?email=${Email}&password=${Password}`,
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
      localStorage.setItem("par", result);
      localStorage.setItem("email", Email);
      // let item2 = { Email, Password }
      // let result1 = await fetch(`https://localhost:7114/api/TrainerRegt/GetName?email=${Email}&password=${Password}`, {
      //   method: "POST",
      //   headers: {
      //     "Accept": "application/json",
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(item2)
      // });
      // result1 = await result1.json();
      // console.log(result1);
      // localStorage.setItem('name',result1);
      // console.log(`Global name is ${result1}`);

      var res = localStorage.getItem("par");
      //console.log(res)
      if (res === "Authorized") {
        setisLoggedIn(true);
        //console.log(result)
        navigate("/trainer");
      } else {
        console.log("User not found");
        setisLoggedIn(false);
        alert("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuccess = async (response) => {
    // Handle successful authentication
    const trainer = jwt_decode(response.credential);
    console.log("Authenticated!", trainer);

    // check for users whether they are in user table
    const check = await axios.post(
      `https://localhost:7114/api/TrainerRegt/CheckEmailExist/${trainer.email}`
    );
    if (check.data) {
      loginUser(trainer);
    } else {
      registerUser(trainer);
    }
  };

  const handleFailure = (error) => {
    // Handle authentication failure
    console.error("Authentication failed:", error);
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="4361687790-8aveurf3sahofdco9gejt7m81hkffgvc.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            // console.log(credentialResponse);
            handleSuccess(credentialResponse);
          }}
          onError={() => {
            // console.log('Login Failed');
            handleFailure();
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleOauthTes;
