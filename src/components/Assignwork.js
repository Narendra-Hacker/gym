// AssignWorkPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';

const AssignWorkPage = () => {
  const { trainerId } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [assignments, setAssignments] = useState([{ exercise: '', time: '' }]);
  const [numDays, setNumDays] = useState(1);

  useEffect(() => {
    // Fetch data for trainer, members, and exercises
    const fetchData = async () => {
      try {
        const [trainerResponse, membersResponse, exercisesResponse] = await Promise.all([
          axios.get(`https://localhost:7114/api/TrainerRegt/GetTrainer/${trainerId}`), // Replace 1 with trainerId
          axios.get(`https://localhost:7114/api/MemberRegt/GetMembersByTrainer/${trainerId}`), // Replace 1 with trainerId
          axios.get('https://localhost:7114/api/ExerciseTypes'),
        ]);
  
        setTrainer(trainerResponse.data);
        setMembers(Array.isArray(membersResponse.data) ? membersResponse.data : []);
        setExercises(exercisesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchData();
  }, []);
  
 
  const handleAssignWork = async () => {
    try {
      // Ensure trainer data and selected member are available before proceeding
      if (!trainer || !selectedMember) {
        console.error('Trainer or selected member data not available.');
        return;
      }
  
      // Prepare the message for all assigned exercises
      const message = assignments
        .map((assignment, index) => `Day ${index + 1}: Do "${assignment.exercise}" Exercises for ${assignment.time} minutes each`)
        .join('\n');
  
      // Send a single email with information about all assigned exercises for each day
      const emailParams = {
        to_email: selectedMember.email,
        from_name: `${trainer.firstName} ${trainer.lastName}`,
        from_email: `${trainer.email}`,
        phone:`${trainer.mobileNo}`,
        subject: 'Work Assignment',
        message: `Hello ${selectedMember.firstName} ${selectedMember.lastName},\n\n Please find your Training Scheule here,\n\n${message}`,
      };
  
      console.log(emailParams);
  
      // Replace with your Email.js service_id, template_id, and user_id
      const emailJsParams = {
        service_id: 'service_ry27xqe',
        template_id: 'template_sogmqay',
        user_id: 'P-yl-eGQ-mdEebw6W',
      };
  
      // Send email using Email.js
      await emailjs.send(emailJsParams.service_id, emailJsParams.template_id, emailParams, emailJsParams.user_id);

      alert("Email is sent successfully");
  
      // Fetch the latest list of members after assignment
      const membersResponse = await axios.get(`https://localhost:7114/api/MemberRegt/GetMembersByTrainer/${trainerId}`);
      setMembers(Array.isArray(membersResponse.data) ? membersResponse.data : []);
  
      // Reset selected member, assignments, and number of days
      setSelectedMember(null);
      setAssignments([{ exercise: '', time: '' }]);
      setNumDays(1);
  
      // Update the selectedMember state directly
      setSelectedMember(null);
  
    } catch (error) {
      console.error('Error assigning work:', error.message);
      alert("Failed to send an Email");
    }
  };
  
  
  const handleExerciseChange = (value, index) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment, i) => (i === index ? { ...assignment, exercise: value } : assignment))
    );
  };

  const handleTimeChange = (value, index) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment, i) => (i === index ? { ...assignment, time: value } : assignment))
    );
  };

  const addDay = () => {
    setAssignments((prevAssignments) => [...prevAssignments, { exercise: '', time: '' }]);
    setNumDays(numDays + 1);
  };

  const removeDay = () => {
    if (numDays > 1) {
      setAssignments((prevAssignments) => prevAssignments.slice(0, -1));
      setNumDays(numDays - 1);
    }
  };

  return (
    <div className="container mt-5" style={{ height: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h2 className="text-center mb-4">Assign Work to Members</h2>

          <div className="form-group">
            <label> Member Name:</label>
            <select
              className="form-control"
              value={selectedMember ? JSON.stringify(selectedMember) : ''}
              onChange={(e) => setSelectedMember(JSON.parse(e.target.value))}
            >
              <option value="">Select Member</option>
              {members.map((member) => (
                <option key={member.id} value={JSON.stringify(member)}>
                  {member.firstName} {member.lastName}
                </option>
              ))}
            </select>
          </div>
          <br></br>

          {assignments.map((assignment, index) => (
            <div key={index}>
              <div className="form-group">
                <label> Exercises for Day {index + 1}:</label>
                <select
                  className="form-control"
                  value={assignment.exercise}
                  onChange={(e) => handleExerciseChange(e.target.value, index)}
                >
                  <option value="">Select Exercise</option>
                  {exercises.map((exercise) => (
                    <option key={exercise.exerciseId} value={exercise.exerciseName}>
                      {exercise.exerciseName}
                    </option>
                  ))}
                </select>
              </div>
              

              <div className="form-group">
                <label>Enter Time for each Exercise(minutes):</label>
                <input
                  type="text"
                  className="form-control"
                  value={assignment.time}
                  onChange={(e) => handleTimeChange(e.target.value, index)}
                />
              </div>
            </div>
          ))}
      

            <div className="text-center mt-3">
              <button style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white' }} className="btn btn-secondary" onClick={addDay}>
                Add Day
              </button>
              <button style={{ backgroundColor: 'blue', color: 'white' }} className="btn btn-secondary" onClick={removeDay}>
                Remove Day
              </button>
            </div>

          <div className="text-center">
            <br></br>
            <button style={{ marginRight: '10px', backgroundColor: 'green', color: 'white' }} className="btn btn-primary" onClick={handleAssignWork}>
              Assign Work
            </button>
          </div>




        </div>
      </div>
    </div>
  );
};

export default AssignWorkPage;
