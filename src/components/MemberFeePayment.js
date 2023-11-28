import React,{ useState,useEffect } from "react";
import { Outlet, useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from 'emailjs-com';
import 'bootstrap/dist/css/bootstrap.min.css';


const MemberFeePayment = () => {

    const { feeId } = useParams();
    //console.log("ID from useParams:", feeId);
    const [feeData, setFeeData] = useState(null);
    const navigate = useNavigate();
    const [member, setMember] = useState([]);
    const [error, setError] = useState(null);

    //const [memId,setMemId]=useState(0)

    useEffect(() => {
      const fetchFeeDetails = async () => {
        try {
          // Use memberId instead of memid here
          const response = await axios.get(`https://localhost:7114/api/FeeDetails/GetFeeDetails/${feeId}`);
          const feesData = response.data;

          setFeeData(feesData);
          console.log(response.data);

          // Check if feeData is not null before accessing memberId
          //console.log("member Id :", feesData?.memberId);

          if (feesData.memberId) {
            const response = await axios.get(
              `https://localhost:7114/api/MemberRegt/GetMember/${feesData.memberId}`
            );
            const memberData = response.data;
            setMember(memberData);
            console.log("Member Data:", memberData);
          }
          else {
            setError("Member Details Not Fetching Properly");
          }

        } catch (error) {
          console.error("Error fetching fee details:", error);
          setError("Error fetching data. Please try again.");
        }
      };
  
      fetchFeeDetails();        
  }, [feeId]);

    const paymentOptions = {
        1: "Google Pay",
        2: "Phone Pay",
        3: "Paytm",
        4: "Amazon Pay",
        5: "YONO SBI",        
    };

    const [selectedOption, setSelectedOption] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [amountPaid, setAmountPaid] = useState('');

    const handleSubmit = () => {
        // Validate the form (you can add more validation as needed)
        if (!selectedOption || !transactionId || !amountPaid) {
          alert('Please fill in all fields.');
          return;
        }
    
        // Process the form data (you can send it to a server, etc.)
        console.log('Selected Option:', paymentOptions[selectedOption]);
        console.log('Transaction ID:', transactionId);
        console.log('Amount Paid:', amountPaid);
    
        // You can add more logic here, such as sending the data to a server using AJAX, etc.

        // Send email using email.js
        sendEmail();
        alert("Fees Details are sent to the admin they will be updated shortly");

        // Reset the form fields
        resetForm();
        navigate(-1);
      };

      const sendEmail = () => {
        const templateParams = {
          member_name:`${member.firstName} ${member.lastName}`,
          phone_no : `${member.mobileNo}`,
          email_Id:`${member.email}`,
          paymentOption: paymentOptions[selectedOption],
          transactionId,
          amountPaid,
        };
    
        emailjs.send(
          'service_ry27xqe', // replace with your service ID
          'template_c4wiv41', // replace with your template ID
          templateParams,
          'P-yl-eGQ-mdEebw6W' // replace with your user ID
        )
          .then((response) => {
            console.log('Email sent successfully:', response);            
            // You can add more logic here after sending the email
          })
          .catch((error) => {
            console.error('Error sending email:', error);
          });
      };

      const resetForm = () => {
        setSelectedOption('');
        setTransactionId('');
        setAmountPaid('');
      };   
    

    return(
        <div>             

    <div style={styles.container}>
    
      <div className="container mt-4" style={styles.cardContainer}>  
      <h2> "Welcome to the payment page {member.firstName} {member.lastName}" </h2>
      <br></br>

      {/* <h4> Name : <u> {member.firstName} {member.lastName} </u></h4> */}


      <h4><u> Fee Details </u> </h4>
      <br></br>

      {feeData ? (
        <div>
        <ul className="list-group list-group-flush">
              
              <li className="list-group-item">
              <strong>Total Fee: </strong> {feeData.totalFees}
              </li>
              <li className="list-group-item">
                <strong>Amount Paid: </strong> {feeData.amountPaid}
              </li>
              <li className="list-group-item">
                <strong>Fee Due: </strong> {feeData.feeDue}
              </li>            
              
            </ul>         
        </div>
                
      ) : (
        <h1>You have not been assigned any fee yet</h1>
      )}     

    <div className="container mt-5">
        <h2 className="mb-4"><u>Payment Form </u></h2>
        <form className="row g-3">
            <div className="col-md-5">
            <label htmlFor="paymentOption" className="form-label">
                Payment Method:
            </label>
            </div>
            <div className="col-md-7">
            <select
                id="paymentOption"
                name="paymentOption"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="form-select"
            >
                <option value="" disabled>
                Select an option
                </option>
                {Object.keys(paymentOptions).map((key) => (
                <option key={key} value={key}>
                    {paymentOptions[key]}
                </option>
                ))}
            </select>
            </div>

            <div className="col-md-5">
            <label htmlFor="transactionId" className="form-label">
                Transaction ID:
            </label>
            </div>
            <div className="col-md-7">
            <input
                type="text"
                id="transactionId"
                name="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="form-control"
                required
            />
            </div>

            <div className="col-md-5">
            <label htmlFor="amountPaid" className="form-label">
                Amount Paid:
            </label>
            </div>
            <div className="col-md-7">
            <input
                type="number"
                id="amountPaid"
                name="amountPaid"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                className="form-control"
                required
            />
            </div>

            <div className="col-md-9 offset-md-3">
            <button type="button" className="btn btn-primary mx-2" onClick={handleSubmit}>
                Submit
            </button>
            <button type="button" className="btn btn-secondary mx-2" onClick={()=>navigate(-1)}>
                Cancel Payment
            </button>
            </div>
        </form>
        </div>

      
    </div>
    </div>    
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
      maxWidth: '630px',
      textAlign:'center',
    },
  };

export default MemberFeePayment;

