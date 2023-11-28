import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
//import { useNavigate } from 'react-router-dom';
import { useState } from "react";
const GoogleOauthTest = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(true);

  // const nav = useNavigate();

  //   registraton using google
  const registerUser = async (member) => {
    //FirstName:firstName,
    //       LastName:lastName,
    //       MobileNo:mobileNo,
    //       City:city,
    //       Experience:parseInt(experience),
    //       DateOfJoin:dateOfJoin,
    //       Salary:parseInt(salary),
    //       TrainingFees:parseInt(trainingFees),
    //       Email:email,

    const FirstName = member.firstName;
    console.log(member.firstName);
    const LastName = member.lastName;
    const MobileNo = member.mobileNo;
    const City = member.city;
    //const Experience= trainer.experience;
    const DateOfJoin = member.dateOfJoin;
    //const Salary = trainer.salary;
    const TrainerId = member.trainerId;
    //const Password = trainer.sub;
    const Email = member.email;
    const Password = member.sub;

    await axios
      .post("https://localhost:7114/api/MemberRegt/Register", {
        FirstName,
        LastName,
        MobileNo,
        City,
        DateOfJoin,
        TrainerId,
        Email,
        Password,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log(response.data, response.status);
          loginUser(member);
        } else if (response.status === 409) {
          console.log(response.data);
          navigate("/loginmem");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginUser = async (user) => {
    console.log("Inside");
    // localStorage.setItem('par',result);
    const Email = user.email;
    const Password = user.sub;
    //  const name = user.given_name;

    try {
      let item = { Email, Password };
      let result = await fetch(
        `https://localhost:7114/api/MemberRegt/login?email=${Email}&password=${Password}`,
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
      console.log(result.kiran);
      localStorage.setItem("par", result.kiran);
      localStorage.setItem("email", Email);
      localStorage.setItem("clientID", result.user.memberId);
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
        navigate("/member");
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
    const member = jwt_decode(response.credential);
    console.log("Authenticated!", member);

    // check for users whether they are in user table
    const check = await axios.post(
      `https://localhost:7114/api/MemberRegt/CheckEmailExist/${member.email}`
    );
    if (check.data) {
      loginUser(member);
    } else {
      registerUser(member);
    }
  };

  const handleFailure = (error) => {
    // Handle authentication failure
    console.error("Authentication failed:", error);
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="436138687790-8aveurf3sahofdco9gejt7m81hkffgvc.apps.googleusercontent.com">
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

export default GoogleOauthTest;
