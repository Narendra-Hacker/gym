import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function TrainerAPI() {
  const [trainerId, setTrainerID] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobileNo, setMobileNo] = useState();
  //  const[city,setCity]=useState();
  const [experience, setExperience] = useState();
  //  const[dateOfJoin,setDateOfJoin]=useState();
  const [salary, setSalary] = useState();
  const [trainingFees, setTrainingFees] = useState();
  const [email, setEmail] = useState();
  const [trainers, settrainers] = useState([]);
  const [password, setPassword] = useState();
  const [scheduleId, setScheduleID] = useState();

  const navigate = useNavigate();
  const getToken =()=> localStorage.getItem('par');
  const token = getToken();
  console.log("JWT Token is : ", token);
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("par");
    localStorage.removeItem("name");
    localStorage.removeItem("value");
    navigate("/loginmem");
  };

  const LoadEdit = (id) => {
    navigate(`/traineredit/${id}`);
  };

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const token = getToken();
    const result = await axios.get(
      "https://localhost:7114/api/TrainerRegt/GetTrainer",{
        headers :{
          'Authorization' :`Bearer ${token}`,
          'Content-Type' :'application/json'
        },
      }
    );
    settrainers(result.data);
    console.log(result.data);
  }



  async function DeleteTrainer(trainerId) {
    try{
    await axios.delete(
      "https://localhost:7114/api/TrainerRegt/Delete/" + trainerId
    );
    // alert("Trainer deleted Successfully");
    

    setTrainerID("");
    setFirstName("");
    setLastName("");
    setMobileNo("");
    //setCity("");
    setExperience("");
    //setDateOfJoin("");
    setSalary("");
    setTrainingFees("");
    setEmail("");
    setScheduleID("");
    Load()
    }
    catch(error){
      alert(" You are not allowed to delete this trainer he/she is assigned to a member");

    }
  }

  const handleSearch = (event) => { setSearchTerm(event.target.value); };
  const [searchTerm, setSearchTerm] = useState("");


  const scheduleOptions = {
    1: "5 Am to 6 Am",
    2: "6 Am to 7 Am",
    3: "7 Am to 8 Am",
    4: "6 Pm to 7 Pm",
    5: "7 Pm to 8 Pm",
    6: "8 Pm to 9 Pm",
  };

  const filteredTrainers = trainers.filter((trainers) => trainers.firstName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="nav-link" aria-current="page" to="/admin">
            Admin page
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
              <li className="nav-item">
                <Link className="nav-link active" to="/admin/trainersdetails">
                  Trainer Details
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/membersdetails">
                  Member Details
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/feedetails">
                  Fee Details
                </Link>
              </li>
            </ul>
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </div>
        </div>
      </nav>
  
      <div className="container mt-4 container-form">
        <div className="card">
          <div className="card-body">
            <h1 className="form-header">Trainer Details</h1>

            <div className="text-center mb-3">
                  <div className="input-group">
                    <input type="text"
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={handleSearch} 
                      className="form-control form-control-sm" 
                      style={{ borderRadius: "10px 0 0 10px", width: "150px" }} />
                        <div className="input-group-append"> 
                          <span className="input-group-text bg-white" style={{ border: "none" }}> 
                            <FontAwesomeIcon icon={faSearch} />
                          </span>
                        </div> 
                  </div>
            </div>

  
            <div className="row">
              {filteredTrainers.map(function fn(trainer) {
                return (
                  <div className="col-md-4 mb-4" key={trainer.trainerId}>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          {trainer.firstName + " " + trainer.lastName}
                        </h5>
                        <p className="card-text">
                          <strong>Mobile No:</strong> {trainer.mobileNo}
                          <br />
                          <strong>Experience:</strong> {trainer.experience}
                          <br />
                          <strong>Schedule Time:</strong>{" "}
                          {scheduleOptions[trainer.scheduleId]}
                          <br />
                          <strong>Salary:</strong> {trainer.salary}
                          <br />
                          <strong>Training Fee:</strong> {trainer.trainingFees}
                          <br />
                          <strong>Email:</strong> {trainer.email}
                        </p>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => LoadEdit(trainer.trainerId)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => DeleteTrainer(trainer.trainerId)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
