import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const MemberEdit = () => {
  const { memberId } = useParams();
  const [trainers, setTrainers] = useState([]);

  const [trainerId, setTrainerID] = useState();

  const [selectedTime, setSelectedTime] = useState("");

  const [formData, setFormData] = useState({
    memberId: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    city: "",
    dateOfJoin: "",
    trainerId: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7114/api/MemberRegt/GetMember/${memberId}`
        );
        const data = response.data;     
        console.log('Fetched Data:', data); // Log the fetched data
 

        setFormData({
          memberId: data.memberId,
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNo: data.mobileNo,
          city: data.city,
          dateOfJoin: data.dateOfJoin,
          trainerId: data.trainerId,
          email: data.email,
          password: data.password,
        });


        // Access the Schedule property to retrieve schedule time
        const scheduleTime = data.trainer?.schedule?.FromTime; // Replace 'fromTime' with your actual property name
        console.log('Schedule Time:', scheduleTime); // Log the schedule time

        // Set the initial value of selectedTime
      setSelectedTime(scheduleTime || ''); // If scheduleTime is null, set an empty string

        
      } catch (error) {
        console.error(error);
      }
    }

    const fetchTrainers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7114/api/TrainerRegt/GetTrainer"
        );

        setTrainers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMember();
    fetchTrainers();
  }, [memberId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Hi");
      formData.trainerId = parseInt(formData.trainerId);
      const response = await axios.put(
        `https://localhost:7114/api/MemberRegt/Update/${memberId}`,
        formData
      );
      console.log("Saved successfully.");
      alert("Member updated successfully");
      //navigate("/membersdetails")
      navigate("/admin/membersdetails");
      // Handle success, e.g., show a success message or navigate to a different page.
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTrainers = async (e) => {
    console.log(e.target.value);
    console.log("Before update:", formData.trainerId); // Add this line
    const response = await axios.get(
      `https://localhost:7114/api/MemberRegt/Alltrainers/${e.target.value}`
    );
    
    

    // Check if there are trainers in the response
    if (response.data && response.data.length > 0) {
      console.log(response.data);
      var trainersSelect = document.getElementById("trainers");
      var element = "<option selected='selected'>Select Your Trainer</option>";
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i], "From for loop");
        var option = `<option value=${response.data[i].trainerId}>${
          response.data[i].firstName + " " + response.data[i].lastName
        }</option>`;
        element += option;
      }

      trainersSelect.innerHTML = element;

      // Set the trainerId in formData to the first available trainer (if any)
      setFormData((prevData) => ({
        ...prevData,
        trainerId: response.data[0].trainerId,
      }));

      console.log("After update:", formData.trainerId);
    } else {
      // Handle the case where no trainers are available for the selected time.
      console.log("No trainers available for the selected time.");
      // You might want to set a default value or show a message to the user.
    }
  };

  return (
    <div className="container mt-4 container-form">
      <div className="card">
        <div className="card-body">
          <h1 className="form-header">Member Edit</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Mobile No</label>
              <input
                type="text"
                className="form-control"
                id="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Date Of Join</label>
              <input
                type="date"
                className="form-control"
                id="dateOfJoin"
                value={formData.dateOfJoin}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Select your Timings</label>
              <select
                value={selectedTime}
                onChange={(e) => {
                  setSelectedTime(e.target.value); // Update the state
                  getTrainers(e); // Pass the event if needed
                }}
                className="form-control"
              >
                <option value="">Select your Time</option>
                <option value={1}>5 Am to 6 Am</option>
                <option value={2}>6 Am to 7 Am</option>
                <option value={3}>7 Am to 8 Am</option>
                <option value={4}>6 Pm to 7 Pm</option>
                <option value={5}>7 Pm to 8 Pm</option>
                <option value={6}>8 Pm to 9 Pm</option>
              </select>
            </div>

            <div className="form-group">
              <label>Trainer Name</label>
              <select
                id="trainers"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    trainerId: e.target.value,
                  }));
                }}
                className="form-control"
              >
                <option value="">Select Your Trainer</option>
                {/* Dynamically populated options will be added here */}
              </select>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                value={formData.password}
                onChange={handleChange}
                hidden
              />
            </div>
            <div>
              <button className="btn btn-submit btn-primary mx-2" type="submit">
                Update
              </button>
              <Link to="/admin/membersdetails">
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

export default MemberEdit;
