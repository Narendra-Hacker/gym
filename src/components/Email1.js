import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function EmailForm() {
  const [recipient, setRecipient] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("To", recipient);
    formData.append("Attachment", attachment);

    try {
      const response = await fetch("https://localhost:7114/api/sendEmail", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Email sent Successfully");
        toast.success("Email sent successfully!");
      } else {
        const errorMessage = await response.text();
        toast.error(`Email sending failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("An error occurred while sending the email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div>
    //   <h2>Send Email</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="recipient">Recipient's Email:</label>
    //       <input
    //         type="email"
    //         id="recipient"
    //         value={recipient}
    //         onChange={handleRecipientChange}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="attachment">Attachment:</label>
    //       <input
    //         type="file"
    //         id="attachment"
    //         onChange={handleAttachmentChange}
    //         accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
    //         required
    //       />
    //     </div>
    //     <button type="submit" disabled={isLoading}>
    //       {isLoading ? 'Sending...' : 'Send Email'}
    //     </button>
    //   </form>
    // </div>
    <>
      <button className="my-bt my-3" onClick={() => nav(-1)}>
        Back
      </button>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card">
          <div className="card-body">
            <div className="tab-content">
              <h2>Send Email</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label for="recipient" className="form-label">
                    Recipient's Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="recipient"
                    // value={recipient}
                    value={localStorage.getItem("userEmail") || ""}
                    onChange={handleRecipientChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="attachment" className="form-label">
                    Attachment:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="attachment"
                    onChange={handleAttachmentChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Email"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailForm;
