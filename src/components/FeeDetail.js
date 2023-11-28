import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function FeeDetailsAPI1() {
  const [fees, setfees] = useState([]);

  // const FetchFees = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://localhost:7114/api/FeeDetails/GetFeeDetails"
  //     );
  //     const jsonData = await response.json();
  //     setfees(jsonData);
  //     console.log(jsonData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // useEffect(() => {
  //   FetchFees();
  // }, []);

 

  return fees.map((fee) => {
    return (
      <>
        <br />
        <table border="1" align="center">
          <tr>
            <th>Fee Id</th>
            <th>Member Id</th>
            <th>Subscription</th>
            <th>Total fee</th>
            <th>Amount Paid</th>
            <th>Fee Due</th>
            <th>Status</th>
          </tr>

          <tr>
            <td>{fee.feeId}</td>
            <td>{fee.memberId}</td>
            <td>{fee.subscription}</td>
            <td> {fee.totalFees}</td>
            <td>{fee.amountPaid}</td>
            <td>{fee.feeDue}</td>

            <td>{fee.status}</td>
          </tr>
        </table>
      </>
    );
  });
}

export function FeeDetailsAPI() {
  const [memberId, setMemberID] = useState();
  const [subscription, setSubscription] = useState();
  // const[totalFees,setTotalFees]=useState();
  const [amountPaid, setAmountPaid] = useState();
  // const[feeDue,setFeeDue]=useState();
  // const[status,setStatus]=useState();
  const [feeId, setFeeId] = useState();
  const [feeDetails, setFeeDetails] = useState([]);
  const [members, setmembers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => await Load())();
    async function fetchMembers() {
      try {
        const response = await axios.get(
          "https://localhost:7114/api/MemberRegt/GetMember"
        );
        setmembers(response.data); // Update the state with the fetched members
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }
    fetchMembers();
  }, []);

  const register = () => {
    navigate("/feeCreate");
  };

  const LoadEdit = (id) => {
    navigate(`/feeEdit/${id}`);
  };

  // const handleMemberChange = (e) => {
  //   // Update the selectedMemberId state when the user selects a member
  //   setMemberID(e.target.value);
  // };

  // const navigate = useNavigate();
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
      "https://localhost:7114/api/FeeDetails/GetFeeDetails"
    );
    setFeeDetails(result.data);
    console.log(result.data);
  }

  //  async function save(event) {

  //     localStorage.setItem("MemberId",memberId);
  //     localStorage.setItem("FeeID",feeId);

  //     event.preventDefault();
  //     // axios.post("https://localhost:7114/api/TrainerRegt/Register",{
  //     // FirstName:firstName,
  //     // LastName:lastName,
  //     // MobileNo:mobileNo,
  //     // City:city,
  //     // Experience:parseInt(experience),
  //     // DateOfJoin:dateOfJoin,
  //     // Salary:parseInt(salary),
  //     // TrainingFees:parseInt(trainingFees),
  //     // Email:email})
  //     // .then(res=>{
  //     //   if(res.status===201){
  //     //     alert("registered")
  //     //   }

  //     // })
  //     // .catch(err=>{
  //     //   alert(err,"error");
  //     // })
  //     try {

  //       await axios.post("https://localhost:7114/api/FeeDetails/Register", {
  //       MemberId:parseInt(memberId),
  //       Subscription:parseInt(subscription),

  //       AmountPaid:parseInt(amountPaid),

  //       });
  //       alert("Fee Registration Successfully");
  //           setMemberID("");
  //           setSubscription("");

  //           setAmountPaid("");

  //           setFeeId("");

  //       Load();

  //     } catch (err) {
  //       alert(err);
  //     }
  //    }

  // async function editfee(fee) {
  //   setFeeId(fee.feeId);
  //   setSubscription(fee.subscription);

  //   setAmountPaid(fee.amountPaid);

  //   setMemberID(fee.memberId);

  // }

  async function DeleteFee(feeId) {
    await axios.delete("https://localhost:7114/api/FeeDetails/Delete/" + feeId);
    alert("Fee deleted Successfully");
    setMemberID("");
    setSubscription("");

    setAmountPaid("");

    setFeeId("");
    Load();
  }

  // async function update(event) {

  //     event.preventDefault();
  //     try {

  //   await axios.put("https://localhost:7114/api/FeeDetails/Update/",
  //   {
  //     MemberId:parseInt(memberId),
  //       Subscription:parseInt(subscription),
  //       FeeId : parseInt(feeId),
  //       AmountPaid:parseInt(amountPaid),
  // }

  //       );
  //       alert("Fee Updated Successfully");
  //       setMemberID("");
  //       setSubscription("");

  //       setAmountPaid("");

  //       setFeeId("");
  //       Load();
  //     } catch (error) {
  //       console.error(error.response.data);
  //       alert("Error in Updating");
  //     }
  //   }

  const change = (id) => {
    // let path = "ViewReceipt"
    navigate(`/pay/${id}`);
  };

  const handleSearch = (event) => { setSearchTerm(event.target.value); };
  const [searchTerm, setSearchTerm] = useState("");


  const filteredFees = members.filter((members) => members.firstName.toLowerCase().includes(searchTerm.toLowerCase()));

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
                <Link className="nav-link" to="/admin/membersdetails">
                  Member Details
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/admin/feedetails">
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

      
  
      <br></br>
      <div className="container mt-4 container-form">
        <div className="card">
          <div className="card-body">
            <h1 className="form-header">Fee Details</h1>
            <div>

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




              <button
                className="btn btn-success mt-4 mx-2 my-2"
                onClick={register}
              >
                (+)Register
              </button>
              <br></br>
              <br></br>             

              
            </div>
  
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {feeDetails &&
                feeDetails.map(function fn(fee) {
                  const member = members.find(
                    (member) => member.memberId === fee.memberId
                  );
  
                  return (
                    <div className="col mb-4" key={fee.feeId}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">
                            {member
                              ? `${member.firstName} ${member.lastName}`
                              : "Unknown Member"}
                          </h5>
                          <p className="card-text">
                            <strong>Subscription:</strong> {fee.subscription}
                            <br />
                            <strong>Total Fee:</strong> {fee.totalFees}
                            <br />
                            <strong>Amount Paid:</strong> {fee.amountPaid}
                            <br />
                            <strong>Fee Due:</strong> {fee.feeDue}
                            <br />
                            <strong>Status:</strong> {fee.status}
                          </p>
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() => LoadEdit(fee.feeId)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => DeleteFee(fee.feeId)}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => change(fee.feeId)}
                            >
                              Download
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
