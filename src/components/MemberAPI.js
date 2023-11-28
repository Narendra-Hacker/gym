import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
 
export function MemberAPI() {
  const [memberId, setMemberID] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [city, setCity] = useState();
  const [dateOfJoin, setDateOfJoin] = useState();
  const [trainerId, setTrainerID] = useState();
  const [email, setEmail] = useState();
  const [members, setmembers] = useState([]);
  // const [password, setPassword] = useState();
 
  const [trainers, setTrainers] = useState([]);
 
  // const [schedule,setSchedule]= useState([]);
  const [schedules, setSchedules] = useState([]);
  useEffect(() => {
    (async () => await Load())();
    axios
      .get("https://localhost:7114/api/TrainerRegt/GetTrainer")
      .then((response) => {
        console.log(response.data);
        setTrainers(response.data);
      });
    (async () => {
      const scheduleData = await fetchScheduleData();
      setSchedules(scheduleData);
    })();
  }, []);
 
  const fetchScheduleData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7114/api/TrainerRegt/GetSchedule"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching schedule data:", error);
      return [];
    }
  };
 
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
 
  const LoadEdit = (id) => {
    navigate(`/memberedit/${id}`);
  };
 
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("par");
    localStorage.removeItem("name");
    localStorage.removeItem("value");
    navigate("/loginmem");
  };
  async function Load() {
    const result = await axios.get(
      "https://localhost:7114/api/MemberRegt/GetMember"
    );
    setmembers(result.data);
    console.log(result.data);
  }
 
  async function DeleteMember(memberId) {
    try{
    await axios.delete(
      "https://localhost:7114/api/MemberRegt/Delete/" + memberId
    );
    alert("Member deleted Successfully");
    setMemberID("");
    setFirstName("");
    setLastName("");
    setMobileNo("");
    setCity("");
 
    setDateOfJoin("");
    setTrainerID("");
 
    setEmail("");
    Load();
    }
    catch(error){
      alert(" The member has some pending fees. Please refer his/her fee details.")
    }
  }
  const filteredMembers = members.filter((members) => members.firstName.toLowerCase().includes(searchTerm.toLowerCase()));
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
                <Link className="nav-link" to="/admin/trainersdetails">
                  Trainer Details
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/admin/membersdetails">
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
            <h1 className="form-header">Member Details</h1>
 
 
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
              {filteredMembers.map(function fn(member) {
                const trainer = trainers.find(
                  (trainer) => trainer.trainerId === member.trainerId
                );
 
                const scheduleId = trainer
                  ? trainer.scheduleId
                  : "No Schedule";                
 
                return (
 
                  <div className="col-md-4 mb-4" key={member.memberId}>
 
 
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          {member.firstName + " " + member.lastName}
                        </h5>
                        <p className="card-text">
                          <strong>Mobile No:</strong> {member.mobileNo}
                          <br />
                          City: {member.city}
                          <br />
                          <strong>Date Of Join:</strong>{" "}
                          {member.dateOfJoin
                            ? new Date(member.dateOfJoin).toLocaleDateString(
                              "en-GB"
                            )
                            : "Date not available"}
                          <br />
                          <strong>Trainer Name:</strong>{" "}
                          {trainer
                            ? `${trainer.firstName} ${trainer.lastName}`
                            : "Unknown Trainer"}
                          <br />
                          <strong>Schedule Time:</strong>{" "}
                          {scheduleOptions[scheduleId]}
                          <br />
                          Email: {member.email}
                        </p>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => LoadEdit(member.memberId)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => DeleteMember(member.memberId)}
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