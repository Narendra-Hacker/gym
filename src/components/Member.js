import React from "react";
import { useState, useEffect } from "react";
import { Link, Route, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Member() {
  const [member, setmembers] = useState([]);
  const [billData, setBillData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [feeData, setFeeData] = useState();
  const [schedule, setSchedule] = useState([]);
  //const params = useParams();
  const [trainerData, setTrainerData] = useState(null);
  const [scheduleTiming, setScheduleTiming] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    //feeDetail();
  }, []);

  const fetchData = async () => {
    var email = localStorage.getItem("email");
    const response = await fetch(
      `https://localhost:7114/api/MemberRegt/GetData?email=${email}`
    );
    const jsonData = await response.json();
    //getTrainer(jsonData.trainerId);
    setmembers(jsonData);
    //console.log(jsonData);
  };

  // const getTrainer = async (id) => {
  //   const response = await axios.get(
  //     `https://localhost:7114/api/TrainerRegt/GetTrainer/${id}`
  //   );
  //   const trainerData = response.data;
  //   // Now, you can access trainerData.firstName and trainerData.lastName to display the trainer's name
  //   //console.log(trainerData);
  //   setTrainerData(trainerData);
  //   // console.log(response.data);
  //   fetchSchdule(response.data.scheduleId);
  // };

  // const fetchSchdule = async (id) => {
  //   const result = await axios.get(
  //     `https://localhost:7114/api/TrainerRegt/Schedule/${id}`
  //   );
  //   setSchedule(result.data);
  //   // console.log(result.data);
  //   // console.log(result.data.id);
  //   const scheduleData = result.data;
  //   //console.log(scheduleData);
  //   //console.log(scheduleData.id);
  //   const scheduleTiming = scheduleOptions[scheduleData.id];

  //   //console.log(scheduleTiming);
  //   setScheduleTiming(scheduleTiming);
  // };

  // const getfeeId = async () => {
  //   var memid = localStorage.getItem("clientID");
  //   var response = await axios.get(
  //     `https://localhost:7114/api/FeeDetails/getfeeid/${memid}`
  //   );
  //   // setFeeData(response.data);
  //   //  console.log(response.data.feeId)
  //   return response.data.feeId;
  // };

  // const bill = async () => {
  //   var feeId = await getfeeId();
  //   navigate(`/receipt/${feeId}`);
  // };

  // const feeDetail = async () => {
  //   var memid = localStorage.getItem("clientID");
  //   var response = await axios.get(
  //     `https://localhost:7114/api/FeeDetails/getfeeid/${memid}`
  //   );
  //   setFeeData(response.data);
  //   //console.log(response.data);
  //   // fetchSchdule(response.data.scheduleId)
  // };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("par");
    localStorage.removeItem("name");
    localStorage.removeItem("clientID");
    localStorage.removeItem("value");
    navigate("/loginmem");
  };

  // var p = localStorage.getItem("name");

  // const scheduleOptions = {
  //   1: "5 Am to 6 Am",
  //   2: "6 Am to 7 Am",
  //   3: "7 Am to 8 Am",
  //   4: "6 Pm to 7 Pm",
  //   5: "7 Pm to 8 Pm",
  //   6: "8 Pm to 9 Pm",
  // };

  return (
    <div className="md-3" style={{ backgroundColor: "#f4f4f4", height:'100vh'}}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/member">
            Home
          </Link> 
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <li className="nav-item" aria-current="page">
                <Link className="navbar-brand" to={`memberProfile/${member.memberId}`}> Profile</Link>
              </li>

              <li className="nav-item" aria-current="page">
                <Link className="navbar-brand" to={`trainersandschedules`}>Trainers</Link>
              </li>

              <li className="nav-item" aria-current="page">
                <Link className="navbar-brand" to={`memberFees/${member.memberId}`}> Fee Details</Link>
              </li>              

            </ul>
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <br></br>

      <Outlet/>
    </div>
  );
}

export default Member;
