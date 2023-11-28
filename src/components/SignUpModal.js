import React from "react";

function SignUpModal({ isOpen, onClose, navigate }) {
  console.log("Joo");
  const handleTrainerClick = () => {
    console.log("Jol");
    // Use the navigate function to navigate to the Trainer registration route
    navigate("/trainer-registration");
    onClose();
  };

  const handleMemberClick = () => {
    // Use the navigate function to navigate to the Member registration route
    navigate("/member-registration");
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <p>How do you want to register?</p>
          <button onClick={handleTrainerClick}>Trainer</button>
          <button onClick={handleMemberClick}>Member</button>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    )
  );
}

export default SignUpModal;
