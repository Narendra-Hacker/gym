import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

const FeeDetails = () => {
  const { memberId } = useParams();
  const [feeData, setFeeData] = useState(null);
  const navigate = useNavigate();

  const fetchFeeDetails = async () => {
    try {
      const response = await axios.get(`https://localhost:7114/api/FeeDetails/getfeeid/${memberId}`);
      setFeeData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching fee details:", error);
    }
  };

  const getfeeId = async () => {
    var memid = localStorage.getItem("clientID");
    var response = await axios.get(
      `https://localhost:7114/api/FeeDetails/getfeeid/${memid}`
    );
    // setFeeData(response.data);
    // console.log(response.data.feeId)
    return response.data.feeId;
  };

  const handlePayment = async (token) => {
    try {
      // You can send the token to your server and handle the payment there
      // For the demo, let's assume the server responds with a success message
      const response = await axios.post(
        "https://your-server.com/api/process-payment",
        {
          tokenId: token.id,
          memberId,
          amountDue: feeData.feeDue,
        }
      );

      console.log("Payment successful:", response.data);

      // Refresh fee details after successful payment
      fetchFeeDetails();

      // Trigger download after successful payment
      downloadReceipt();
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const downloadReceipt = () => {
    // Simulate a download action
    // Replace this with your actual logic for downloading the receipt
    console.log("Downloading receipt...");
  };

  const redirectToReceipt = async () => {
    var feeId = await getfeeId();
    navigate(`/receipt/${feeId}`);
  };


  useEffect(() => {
    fetchFeeDetails();
  }, [memberId]);

  return (
    <div>
      <div style={styles.container}>
        <div className="container mt-4" style={styles.cardContainer}>
          <h3><u> Fee Details </u> </h3>
          <br></br>

          {feeData ? (
            <div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong> Subscription: </strong> {feeData.subscription} Months
                </li>
                <li className="list-group-item">
                  <strong>Total Fee: </strong> {feeData.totalFees}
                </li>
                <li className="list-group-item">
                  <strong>Amount Paid: </strong> {feeData.amountPaid}
                </li>
                <li className="list-group-item">
                  <strong>Fee Due: </strong> {feeData.feeDue}
                </li>
                <li className="list-group-item">
                  <strong>Status: </strong> {feeData.status}
                </li>
              </ul>
            </div>
          ) : (
            <h1>You have not been assigned any fee yet</h1>
          )}

          <br></br>

          {feeData ? (
            <div>
              <StripeCheckout
                token={handlePayment}
                stripeKey="public key"
                amount={feeData.feeDue * 100} // Amount in cents
                name="Membership Fee"
              >
                <button className="btn btn-primary mx-2">Pay Now</button>
              </StripeCheckout>

              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={redirectToReceipt}
              >
                Download Receipt
              </button>
            </div>
          ) : (
            <p></p>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FeeDetails;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    //testAlign: 'center',
  },
  cardContainer: {
    maxWidth: "400px",
    textAlign: "center",
  },
};
