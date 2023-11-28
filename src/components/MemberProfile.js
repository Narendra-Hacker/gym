import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";

function MemberProfile() {
  const { id } = useParams();
  console.log("ID from useParams:", id);
  const [member, setMember] = useState(null);
  const [trainerData, setTrainerData] = useState(null);
  const [scheduleTiming, setScheduleTiming] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching member data");
  
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7114/api/MemberRegt/GetMember/${id}`
        );
        const memberData = response.data;
        console.log("Member Data:", memberData);
  
        setMember(memberData);
  
        if (memberData.trainerId) {
          const trainerResponse = await axios.get(
            `https://localhost:7114/api/TrainerRegt/GetTrainer/${memberData.trainerId}`
          );
          const trainerData = trainerResponse.data;
          setTrainerData(trainerData);
  
          if (trainerData.scheduleId) {
            const scheduleResponse = await axios.get(
              `https://localhost:7114/api/TrainerRegt/Schedule/${trainerData.scheduleId}`
            );
            const scheduleData = scheduleResponse.data;
            const scheduleTiming = scheduleOptions[scheduleData.id];
            setScheduleTiming(scheduleTiming);
          } else {
            setError("Trainer schedule not available");
          }
        } else {
          setError("Trainer data not available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      }
    };
  
    fetchData();
  }, [id]);
  

  const scheduleOptions = {
    1: "5 Am to 6 Am",
    2: "6 Am to 7 Am",
    3: "7 Am to 8 Am",
    4: "6 Pm to 7 Pm",
    5: "7 Pm to 8 Pm",
    6: "8 Pm to 9 Pm",
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!member || !trainerData) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <div className="container mt-4" style={styles.cardContainer}>              
          
          <h3><u> Member Profile</u></h3>          
          <div>
          <ul className="list-group list-group-flush">
                <li className="list-group-item">
                <strong> Name:</strong> {member.firstName} {member.lastName}

                </li>
                <li className="list-group-item">
                <strong>Mobile No:</strong> {member.mobileNo}
                </li>
                <li className="list-group-item">
                  <strong>City:</strong> {member.city}
                </li>
                <li className="list-group-item">
                  <strong>Date Of Join:</strong>{" "}
                  {member.dateOfJoin
                    ? new Date(member.dateOfJoin).toLocaleDateString("en-GB")
                    : "Date not available"}
                </li>               
                <li className="list-group-item">
                  <strong>Email:</strong> {member.email}
                </li>
                <li className="list-group-item">
                  <strong>Timing:</strong>{" "}
                  {scheduleOptions[trainerData.scheduleId] ||
                    "Schedule not available"}
                </li>
                <br></br>

                <h4> <u>Trainer Details: </u></h4>
                <li className="list-group-item">
                    <strong>Trainer Name:</strong>{" "}
                  {`${trainerData.firstName} ${trainerData.lastName}`}
                </li> 
                <li className="list-group-item">
                    <strong> Experience: </strong>{" "}
                  {`${trainerData.experience}`} Years
                </li>
                <li className="list-group-item">
                    <strong> Mobile No. : </strong>{" "}
                  {`${trainerData.mobileNo}`} Years
                </li>
                <li className="list-group-item">
                    <strong> Eamil Id :</strong>{" "}
                  {`${trainerData.email}`} Years
                </li>
              </ul>

              {/* <p> Name of the Trainer: {trainerData.firstName}</p> */}
           
          </div>          
        

      <Outlet />
    </div>
    </div>
  );
}

export default MemberProfile;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',    
    height: '87vh',
    backgroundColor: '#f4f4f4',
    //testAlign: 'center',
  },
  cardContainer: {
    maxWidth: '400px',
    textAlign:'center',
  },
};
