import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const FeeCreate = () => {
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

  const handleMemberChange = (e) => {
    // Update the selectedMemberId state when the user selects a member
    setMemberID(e.target.value);
  };

  useEffect(() => {
    (async () => await Load())();
    fetchMembers();
  }, [feeDetails]); // Add feeDetails as a dependency to re-fetch members when fees are updated
  
  async function fetchMembers() {
    try {
      const response = await axios.get(
        "https://localhost:7114/api/MemberRegt/GetMember"
      );
  
      // Ensure feeDetails is an array before using some method
      const filteredMembers = Array.isArray(feeDetails)
        ? response.data.filter(
            (member) =>
              !feeDetails.some((fee) => fee.memberId === member.memberId)
          )
        : response.data;
  
      setmembers(filteredMembers);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  }
 
  

  async function Load() {
    const result = await axios.get(
      "https://localhost:7114/api/FeeDetails/GetFeeDetails"
    );
    setFeeDetails(result.data);
    console.log(result.data);
  }

  async function save(event) {
    localStorage.setItem("MemberId", memberId);
    localStorage.setItem("FeeID", feeId);

    event.preventDefault();

    try {
      await axios.post("https://localhost:7114/api/FeeDetails/Register", {
        MemberId: parseInt(memberId),
        Subscription: parseInt(subscription),

        AmountPaid: parseInt(amountPaid),
      });
      alert("Fee Registration Successfully");
      navigate("/admin/feedetails");

      setMemberID("");
      setSubscription("");

      setAmountPaid("");

      setFeeId("");

      Load();
    } catch (err) {
      alert(err);
    }
  }
  
  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="container mt-4 container-form">
        <div className="card">
          <div className="card-body">
            <h1 className="form-header">Fee Create</h1>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="feeId"
                  hidden
                  value={feeId}
                  onChange={(event) => {
                    setFeeId(event.target.value);
                  }}
                />

                {/* <label>Member Id</label>
              <input
                type="text"
                className="form-control"
                id="memberId"
              
                value={memberId}
                onChange={(event) => 
                  setMemberID(event.target.value)
                  
                }
                
              
              /> */}

                <div className="form-group">
                  <label>Select a Member</label>
                  <select
                    onChange={handleMemberChange}
                    className="form-control"
                  >
                    <option selected="selected">Select a Member</option>
                    {members.map((member) => (
                      <option key={member.memberId} value={member.memberId}>
                        {member.firstName} {member.lastName}
                      </option>
                    ))}
                  </select>
                  {/* Display the selected member ID for testing purposes */}
                  {/* <p>Selected Member ID: {memberId}</p> */}
                </div>
              </div>

              <div className="form-group">
                <label>subscription</label>
                <input
                  type="number"
                  className="form-control"
                  id="subscription"
                  value={subscription}
                  onChange={(event) => {
                    setSubscription(event.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Amount Paid</label>
                <input
                  type="text"
                  className="form-control"
                  id="amountPaid"
                  value={amountPaid}
                  onChange={(event) => {
                    setAmountPaid(event.target.value);
                  }}
                />
              </div>

              <div>
                <button className="btn btn-success mt-4 mx-2" onClick={save}>
                  Register
                </button>
                <Link to="/admin/feedetails">
                  <button className="btn btn-danger mt-4 mx-2">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default FeeCreate;
