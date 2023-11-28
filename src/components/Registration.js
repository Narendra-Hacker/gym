import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Registration() {
  const navigate = useNavigate();
  const [trainerId, setTrainerID] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [city, setCity] = useState();
  const [experience, setExperience] = useState();
  const [dateOfJoin, setDateOfJoin] = useState();
  const [salary, setSalary] = useState();
  const [trainingFees, setTrainingFees] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [scheduleId, setScheduleID] = useState();
  // const[trainers,settrainers] = useState([]);

  //    useEffect(() => {
  //     (async () => await Load())();
  //   }, []);

  const getschedule = (e) => {
    console.log(e.target.value);
    setScheduleID(e.target.value);
  };

  function Validate2() {
    try {
      const mobileregex = /^[0-9]{10}$/;
 
      if (!mobileregex.test(mobileNo)) {
        seterrorMsg1('Please enter a valid Mobile Number');
        return false;
      }
      seterrorMsg1('');
      return true;
    } catch (error) {
      console.log(error);
    }
  }


  function Validate5() {
    try {
      if (mobileNo === '0000000000') {
        seterrorMsg4('Please Enter a valid Number');
        return false;
      }
      seterrorMsg4('');
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  const [errorMsg1, seterrorMsg1] = useState('');
  const [errorMsg4, seterrorMsg4] = useState('');
  
  async function save(event) {
    event.preventDefault();
    try {
      //  localStorage.setItem('firstname', firstName);

      
      await axios.post("https://localhost:7114/api/TrainerRegt/Register", {
        FirstName: firstName,
        LastName: lastName,
        MobileNo: mobileNo,
        // City:city,
        Experience: parseInt(experience),
        // DateOfJoin:dateOfJoin,
        ScheduleId: parseInt(scheduleId),
        //Salary: parseInt(salary),
        //TrainingFees: parseInt(trainingFees),
        Email: email,
        Password: password,

      
      }
      
    );
      alert("Trainer Registred Successfully");
      Validate5();
      setTrainerID("");
      setFirstName("");
      setLastName("");
      setMobileNo("");
      //setCity("");
      setExperience("");
      //setDateOfJoin("");
      setScheduleID("");
      setSalary("");
      setTrainingFees("");
      setEmail("");
      setPassword("");

      //Load();
      navigate("/loginmem");
    } catch (err) {
      alert("Please Check the Details you Entered");
    }
  }

  return ( 
    <>
      <div className="container mt-2 container-form" style={{width:'400px'}}>
  <div className="card">
    <div className="card-body">
      <h2 className="form-header">Trainer Registration</h2>
      <form>
        <div className="mb-6">
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              id="trainerId"
              hidden
              value={trainerId}
              onChange={(event) => {
                setTrainerID(event.target.value);
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

          <div className="form-group mb-2">
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

          <div className="form-group mb-2">
            <label>Mobile No</label>
            <input
              type="text"
              className="form-control"
              id="mobileNo"
              value={mobileNo}
              onChange={(event) => {
                setMobileNo(event.target.value);
              }}
            />
            {errorMsg1 ? <p style={{ color: 'red' }}>{errorMsg1}</p> : ''}
            {errorMsg4 ? <p style={{ color: 'red' }}>{errorMsg4}</p> : ''}
          </div>

          <div className="form-group mb-2">
            <label>Experience</label>
            <input
              type="number"
              className="form-control"
              id="experience"
              value={experience}
              onChange={(event) => {
                setExperience(event.target.value);
              }}
            />
          </div>

          <div className="form-group mb-2">
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

          <div className="form-group mb-2">
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

          <div>
            <button className="btn btn-primary mt-2 mx-2" onClick={save}>
              Register
            </button>
            <button className="btn btn-primary mt-2 mx-2" onClick={()=>navigate('/loginmem')}>
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

export default Registration;
