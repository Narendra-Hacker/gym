import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const TrainerEdit = () => {
  const { trainerId } = useParams();

  const [formData, setFormData] = useState({
    trainerId: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    experience: "",
    salary: "",
    trainingFees: "",
    email: "",
    password: "",
    scheduleId: "",
  });

  const navigate = useNavigate();

  const getschedule = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    if (selectedOption) {
      const selectedValue = e.target.value;
      console.log(selectedValue); // Log the selected value
      setFormData((prevData) => ({
        ...prevData,
        scheduleId: selectedValue, // Update the formData with the selected schedule ID
      }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.scheduleId = parseInt(formData.scheduleId);

    axios
      .put(
        `https://localhost:7114/api/TrainerRegt/Update/${trainerId}`,
        formData
      )
      .then((res) => {
        console.log("Saved successfully.");
        alert("Trainer Updated Successfully");
        navigate("/admin/trainersdetails");
        // Navigate or perform any other actions as needed.
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7114/api/TrainerRegt/GetTrainer/${trainerId}`)
      .then((resp) => {
        const data = resp.data;
        setFormData({
          trainerId: data.trainerId,
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNo: data.mobileNo,
          experience: data.experience,
          salary: data.salary,
          trainingFees: data.trainingFees,
          email: data.email,
          password: data.password,
          scheduleId: data.scheduleId,
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [trainerId]);

  return (
    <div className="container mt-4 container-form">
      <div className="card">
        <div className="card-body">
          <h1 className="form-header">Trainer Edit</h1>
          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobileNo">Mobile No</label>
              <input
                type="text"
                className="form-control"
                id="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
              />
            </div>

            {/* Add more form fields here */}
            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <input
                type="number"
                className="form-control"
                id="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Select your Schedule</label>
              <select
                name="scheduleId"
                value={formData.scheduleId}
                onChange={getschedule}
                className="form-control custom-select" // Add custom-select class
              >
                <option value="">Select your Time</option>
                <option value={1}>5 Am to 6 Am</option>{" "}
                {/* Corrected time format */}
                <option value={2}>6 Am to 7 Am</option>
                <option value={3}>7 Am to 8 Am</option>
                <option value={4}>6 Pm to 7 Pm</option>
                <option value={5}>7 Pm to 8 Pm</option>
                <option value={6}>8 Pm to 9 Pm</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                className="form-control"
                id="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="trainingFees">Training Fees</label>
              <input
                type="text"
                className="form-control"
                id="trainingFees"
                value={formData.trainingFees}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Hidden Password Field */}
            <div>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handleChange}
                hidden
              />
            </div>

            <div>
              <button className="btn btn-submit btn-primary mx-2" type="submit">
                Update
              </button>
              <Link to="/admin/trainersdetails">
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
  // ... Rest of your component code ...
};

export default TrainerEdit;
