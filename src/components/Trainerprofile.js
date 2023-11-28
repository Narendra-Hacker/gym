import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function Trainerprofile() {
  const [trainer, setTrainer] = useState();

  useEffect(() => {
    const fetchTrainer = async () => {
      const id = new URLSearchParams(window.location.search).get("id");
      const response = await fetch(
        `https://localhost:7114/api/TrainerRegt/GetTrainer/${id}`
      );
      const data = await response.json();
      setTrainer(data);
    };

    fetchTrainer();
  }, []);

  const scheduleOptions = {
    1: "5 AM to 6 AM",
    2: "6 AM to 7 AM",
    3: "7 AM to 8 AM",
    4: "6 PM to 7 PM",
    5: "7 PM to 8 PM",
    6: "8 PM to 9 PM",
  };

  return (
    <div style={styles.container}>
      <div className="container mt-4" style={styles.cardContainer}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {trainer ? (
          <div>

          {/* // <div className="card bg-light mb-3" style={styles.card}>
          //   <div className="card-body">
          //     <h5 className="card-title"> */}
              {/* <h5><u> Name: </u>       {trainer.firstName} {trainer.lastName}
              </h5>
              <h5> <u>Mobile No:</u> {trainer.mobileNo} </h5> */}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Name: </strong> {trainer.firstName} {trainer.lastName}

                </li>
                <li className="list-group-item">
                  <strong>Mobile No:</strong> {trainer.mobileNo}
                </li>
                <li className="list-group-item">
                  <strong>Experience:</strong> {trainer.experience}
                </li>
                <li className="list-group-item">
                  <strong>Salary:</strong> {trainer.salary}
                </li>
                <li className="list-group-item">
                  <strong>Training Fee:</strong> {trainer.trainingFees}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {trainer.email}
                </li>
                <li className="list-group-item">
                  <strong>Schedule Time:</strong>{" "}
                  {scheduleOptions[trainer.scheduleId]}
                </li>
              </ul>
             {/* </div>
           </div> */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Outlet />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',    
    height: '100vh',
    backgroundColor: '#f4f4f4',
    //testAlign: 'center',
  },
  cardContainer: {
    maxWidth: '400px',
    textAlign:'center',
  },
};
