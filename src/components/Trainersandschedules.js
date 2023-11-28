
import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainerCard = ({ trainer }) => {
  const scheduleOptions = {
    1: "5 Am to 6 Am",
    2: "6 Am to 7 Am",
    3: "7 Am to 8 Am",
    4: "6 Pm to 7 Pm",
    5: "7 Pm to 8 Pm",
    6: "8 Pm to 9 Pm",
  };

  const getScheduleTime = (scheduleId) => {
    return scheduleOptions[scheduleId] || "Not specified";
  };

  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      <div className="card-body">
        <h5 className="card-title">{trainer.firstName} {trainer.lastName}</h5>
        <p className="card-text">Experience: {trainer.experience}</p>
        <p className="card-text">Mobile No: {trainer.mobileNo}</p>
        <p className="card-text">Email ID: {trainer.email}</p>
      </div>
    </div>
  );
};

const MemberHome = () => {
  const [originalTrainers, setOriginalTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const scheduleOptions = {
    1: "5 Am to 6 Am",
    2: "6 Am to 7 Am",
    3: "7 Am to 8 Am",
    4: "6 Pm to 7 Pm",
    5: "7 Pm to 8 Pm",
    6: "8 Pm to 9 Pm",
  };

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get("https://localhost:7114/api/TrainerRegt/GetTrainer");
        setOriginalTrainers(response.data);
        setFilteredTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  useEffect(() => {
    // Filter trainers based on the selected time
    const updatedTrainers = originalTrainers.filter((trainer) => {
      const trainerTime = scheduleOptions[trainer.scheduleId] || "Not specified";
      return trainerTime.toLowerCase().includes(selectedTime.toLowerCase());
    });

    setFilteredTrainers(updatedTrainers);
  }, [selectedTime, originalTrainers]);

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}> Trainers and their Timings </h3>
      <br></br>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginLeft:'80px',marginRight: '10px', fontSize: '16px' }}>
          Select Time:
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', fontSize: '14px' }}
          >
            <option value="">All</option>
            {Object.entries(scheduleOptions).map(([id, time]) => (
              <option key={id} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="card-container" style={{justifyContent: "center", alignItems: "center",display: "flex", flexWrap: "wrap" }}>
        {filteredTrainers.map((trainer) => (
          <TrainerCard key={trainer.trainerId} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default MemberHome;
