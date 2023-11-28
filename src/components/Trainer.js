import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

// import gymPicture from './trainerprofile.png';

function Trainer() {
  const [trainer, setTrainer] = useState([]);
  // const [Clients, setClients] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // fetchclient();
  }, []);

  const fetchData = async () => {
    var email = localStorage.getItem("email");
    const response = await fetch(
      `https://localhost:7114/api/TrainerRegt/GetData?email=${email}`
    );
    const jsonData = await response.json();
    setTrainer(jsonData);
    console.log(jsonData);
    // fetchclient(jsonData.trainerId);
    fetchSchdule(jsonData.scheduleId);
  };

  const fetchSchdule = async (id) => {
    const result = await axios.get(
      `https://localhost:7114/api/TrainerRegt/Schedule/${id}`
    );
    setSchedule(result.data);
    console.log(result.data);
  };

  // const fetchclient = async (trainerId) => {
  //   const result = await axios.get(
  //     "https://localhost:7114/api/MemberRegt/GetMember"
  //   );
  //   const clientsdata = result.data;
  //   var a1 = [];
  //   for (let index = 0; index < clientsdata.length; index++) {
  //     if (clientsdata[index].trainerId == trainerId) {
  //       a1.push(clientsdata[index]);
  //     }
  //   }
  //   setClients(a1);

  //   console.log(a1, "memberdata");
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
  // // localStorage.setItem('id',trainer.id); 

  
  return (
    <div className="md-3" style={{ backgroundColor: "#f4f4f4" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/trainer">
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
                    {/* <li className="nav-item">
                      <Link className="nav-link" to="/trainer">Trainer  Details</Link>
                    </li> */}
                    {/* <li className="nav-item" aria-current="page">
                      <Link className="nav-link active"> Welcome {p} </Link>
                    </li> */}
              <li className="nav-item" aria-current="page">
                <Link className="navbar-brand" to={`trainerProfile?id=${trainer.trainerId}`}> Profile</Link>
              </li>
              <li className="nav-item" aria-current="page">
                <Link className="navbar-brand" to={`membersassigned/${trainer.trainerId}`}>MemberAssigned</Link>
              </li>
              <li className="nav-item" aria-current="page">
                <Link className="navbar-brand" to={`Assignwork/${trainer.trainerId}`}>Assignwork</Link>
              </li>

            </ul>
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </div>
        </div>
      </nav>
  

            {/* <div className="container mt-5">
            <div className="d-flex justify-content-center align-items-center h-100">
              
            </div>       
              
            </div> */}
      <Outlet/>
    </div>
  );
  
}

export default Trainer;
