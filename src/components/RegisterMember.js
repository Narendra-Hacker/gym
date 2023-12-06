import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterMember() {
  const [memberId, setMemberID] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [city, setCity] = useState();
  const [dateOfJoin, setDateOfJoin] = useState();
  const [trainerId, setTrainerID] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateInputs = () => {
    // Phone number validation
    if (mobileNo.length !== 10) {
      setError("Phone number must be 10 digits");
      return false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and include a mix of uppercase letters, lowercase letters, and numbers."
      );
      return false;
    }

    // Email validation
    if (!email.includes("@")) {
      setError("Invalid email address");
      return false;
    }

    // Clear previous errors if any
    setError("");
    return true;
  };

  const getTrainers = async (e) => {
    console.log(e.target.value);
    const response = await axios.get(
      `https://localhost:7114/api/MemberRegt/Alltrainers/${e.target.value}`
    );

    console.log(response.data);
    var trainers = document.getElementById("trainers");
    var element = "<option selected='selected'>Select Your Trainer</option>";
    for (let i = 0; i < response.data.length; i++) {
      console.log(response.data[i], "From for loop");
      var option = `<option value=${response.data[i].trainerId}>${
        response.data[i].firstName + " " + response.data[i].lastName
      }</option>`;
      element += option;
    }
    trainers.innerHTML = element;
  };

  async function save(event) {
    event.preventDefault();

    try{
    // Validate inputs before making the API call
    if (!validateInputs()) {
      return;
    }
  }
  catch{
    console.log("Enter all the fileds");
  }

    try {
      await axios.post("https://localhost:7114/api/MemberRegt/Register", {
        FirstName: firstName,
        LastName: lastName,
        MobileNo: mobileNo,
        City: city,
        DateOfJoin: dateOfJoin,
        TrainerId: parseInt(trainerId),
        Email: email,
        Password: password,
      });
      alert("Member Registration Successfully");
      // ... (unchanged)
      setMemberID("");
      setFirstName("");
      setLastName("");
      setMobileNo("");
      setCity("");

      setDateOfJoin("");
      setTrainerID("");

      setEmail("");

      navigate("/loginmem");
    } catch (err) {
      alert("Please Check the Details you Entered");
    }
  }

  return (
    <>
      <div className="container mt-0 container-form" style={{ width: "500px" }}>
        <div className="card">
          <div className="card-body">
            <h2 className="form-header">Member Registration</h2>

            <form>
              {/* ... (unchanged) */}

              <div className="mb-0">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="memberId"
                    hidden
                    value={memberId}
                    onChange={(event) => {
                      setMemberID(event.target.value);
                    }}
                  />

                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                  />
                </div>
              

              
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNo"
                  value={mobileNo}
                  onChange={(event) => {
                    setMobileNo(event.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    value={city}
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Date Of Join</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfJoin"
                    value={dateOfJoin}
                    onChange={(event) => {
                      setDateOfJoin(event.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Select your Timings</label>
                  <select
                    onChange={(e) => getTrainers(e)}
                    className="form-control"
                  >
                    <option selected="selected">Select your Time</option>
                    <option value={1}>5 Am to 6 Am</option>
                    <option value={2}>6 Am to 7 Am</option>
                    <option value={3}>7 Am to 8 Am</option>
                    <option value={4}>6 Pm to 7 Pm</option>
                    <option value={5}>7 Pm to 8 Pm</option>
                    <option value={6}>8 Pm to 9 Pm</option>
                  </select>
                </div>

                {/* <p style={{color:'red'}}> Note: You will be assigned a trainer by the admin according the time slot you select. For details contact Admin</p> */}

                <div className="form-group">
                  <label>Trainer Name</label>
                  <select
                    id="trainers"
                    className="form-control"
                    onChange={(event) => {
                      setTrainerID(event.target.value);
                    }}
                  ></select>
                </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>

              {/* Display error message in red */}
              {error && <p style={{ color: "red" }}>{error}</p>}

              <div>
                <button className="btn btn-primary mt-4 mx-2" onClick={save}>
                  Register
                </button>
                <button className="btn btn-primary mt-4 mx-2" onClick={() => navigate("/loginmem")}>
                  Already a user
                </button>
              </div>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterMember;
