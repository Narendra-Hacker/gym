import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const FeeEdit = () => {
  const { feeId } = useParams();
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    feeId: "",
    memberId: "",
    subscription: "",
    amountPaid: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.memberId = parseInt(formData.memberId);

    axios
      .put(`https://localhost:7114/api/FeeDetails/Update/${feeId}`, formData)
      .then((res) => {
        console.log("Saved successfully.");
        alert("Fee Updated Successfully");
        navigate("/admin/feedetails");
        // Navigate or perform any other actions as needed.
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get(
          "https://localhost:7114/api/MemberRegt/GetMember"
        );
        setMembers(response.data); // Update the state with the fetched members
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }
    fetchMembers();
    axios
      .get(`https://localhost:7114/api/FeeDetails/GetFeeDetails/${feeId}`)
      .then((resp) => {
        const data = resp.data;

        setFormData({
          feeId: data.feeId,
          memberId: data.memberId,
          subscription: data.subscription,
          amountPaid: data.amountPaid,
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [feeId]);

  // Find the selected member based on formData.memberId
  const selectedMember = members.find(
    (member) => member.memberId === formData.memberId
  );

  return (
    <div className="container mt-4 container-form">
      <div className="card">
        <div className="card-body">
          <h1 className="form-header">Fee Edit</h1>
          <form onSubmit={handleSubmit}>
            {/* Display the selected member's name */}
            <div className="form-group">
              <label> Member Name:</label>
              <span className="form-control">
                {selectedMember
                  ? `${selectedMember.firstName} ${selectedMember.lastName}`
                  : ""}
              </span>
            </div>

            <div className="form-group">
              <label>Subscription</label>
              <input
                type="number"
                className="form-control"
                id="subscription"
                value={formData.subscription}
                onChange={(e) =>
                  setFormData({ ...formData, subscription: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Amount Paid</label>
              <input
                type="text"
                className="form-control"
                id="amountPaid"
                value={formData.amountPaid}
                onChange={(e) =>
                  setFormData({ ...formData, amountPaid: e.target.value })
                }
              />
            </div>

            <div>
              <button className="btn btn-submit btn-primary mx-2" type="submit">
                Update
              </button>
              <Link to="/admin/feedetails">
                <button className="btn btn-back btn-margin btn-danger">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeeEdit;
