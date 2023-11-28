import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
//import Layout from "./Layout";
import { useReactToPrint } from "react-to-print";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Receipt = () => {
  // const navigate = useNavigate();

  const params = useParams();
  const [billData, setBillData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const contentRef = useRef(null);
  const nav = useNavigate();

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  // const printReceipt =()=>{
  //     var elementToPrint = document.querySelector(".content").cloneNode(true);

  //     // Create a new window for printing
  //     var printWindow = window.open('','_blank');
  //     printWindow.document.open();
  //   //  printWindow.document.write('<html><head><title>Print</title></head><body></html>');

  //     // Append the cloned element to the new window
  //     printWindow.document.write(elementToPrint.innerHTML);
  //     printWindow.document.write('<html><head><title>Print</title></head><body></html>');
  //     printWindow.document.close();

  //     // Wait for content to be loaded before printing
  //     printWindow.onload = function() {
  //         printWindow.print();
  //         printWindow.close();
  //     };
  // }

  const printReceipt = useReactToPrint({
    content: () => contentRef.current,
  });

  const bill = async () => {
    var memReceiptData;
    const receiptData = await axios
      .get(`https://localhost:7114/api/FeeDetails/getReceipt/${params.id}`)
      .then(async (res) => {
        setBillData(res.data);
        console.log(res.data);

        memReceiptData = await axios
          .get(
            `https://localhost:7114/api/MemberRegt/GetMember/${res.data.memberId}`
          )
          .then((res2) => {
            setMemberData(res2.data);
            console.log(res2.data);
            printAndSendMail(res.data, res2.data);
            localStorage.setItem("userEmail", res2.data.email);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generatePDF = () => {
    const input = contentRef.current;
    // console.log(input);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      // Convert PDF content to a Blob
      const blob = pdf.output("blob");

      // Send the Blob to a server endpoint
      sendPdfToServer(blob);
    });
  };

  const sendPdfToServer = async (pdfBlob) => {
    var p = localStorage.getItem("userEmail");
    // Create a FormData object to send the Blob
    const formData = new FormData();
    formData.append("to", p);
    //console.log({memberData.email});
    formData.append("attachment", pdfBlob, "invoice.pdf"); // 'pdfFile' is the form field name

    // Send the Blob to the server
    await axios
      .post("https://localhost:7114/api/sendEmail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("PDF sent to the server:", response.data);
        console.log(p);
        alert("Email has been sent successfully");
      })
      .catch((error) => {
        console.error("Error sending PDF:", error);
      });
  };
  const printAndSendMail = (one, two) => {
    console.log(one, two, "in new func");
  };
  useEffect(() => {
    const allFunc = async () => {
      bill();
      // console.log("bill()",data);
    };
    allFunc();
  }, []);

  // console.log(params.id);
  return (
    // <Layout>
    <>
      {/* <div style={{ paddingLeft: "110px" }}>
        <button className="btn btn-primary my-4" onClick={() => nav(-1)}>
          Back
        </button>
      </div> */}

      {/* console.log({billData.totalFees}) */}
      {billData && memberData ? (
        <div>
          <div className="container mt-4 container-form">
            <div className="card">
              <div className="card-body"></div>
              <div
                className="container content my-3 mt-5"
                ref={contentRef}
                style={{ marginBottom: "100px",marginTop:"0px" }}
              >
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card" >
                      <div className="card-body" >
                        <div className="invoice-title">
                          <h4 className="float-end font-size-15">
                            Invoice{" "}
                            <span className="badge bg-success font-size-12 ms-2">
                              Paid
                            </span>
                          </h4>
                          <div className="mb-4">
                            <h2 className="mb-1 text-muted">
                              Kiran_Fitness_Club
                            </h2>
                          </div>
                          <div className="text-muted">
                            <p className="mb-1">Srikakulam,AP,532440</p>
                            <p className="mb-1">
                              <i className="uil uil-envelope-alt me-1"></i>{" "}
                              kiranfitness@gmail.com
                            </p>
                            <p>
                              <i className="uil uil-phone me-1"></i> 9182169738
                            </p>
                          </div>
                        </div>

                        <hr className="my-4"></hr>

                        <div className="row">
                          <div className="col-sm-6">
                            <div className="text-muted">
                              <h5 className="font-size-16 mb-3">Billed To:</h5>
                              <h5 className="font-size-15 mb-2">
                                {memberData.firstName +
                                  " " +
                                  memberData.lastName}
                              </h5>
                              {/* <p className="mb-1">4068 Post Avenue Newfolden, MN 56738</p> */}
                              <p className="mb-1">{memberData.email}</p>
                              <p>{memberData.mobileNo}</p>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="text-muted text-sm-end">
                              {/* <div>
                                                    <h5 className="font-size-15 mb-1">Invoice No:</h5>
                                                    <p>#DZ0112</p>
                                                </div> */}
                              <div className="mt-4">
                                <h5 className="font-size-15 mb-1">
                                  Invoice Date:
                                </h5>
                                <h5>
                                  {" "}
                                  <p>{date}</p>{" "}
                                </h5>
                              </div>
                              <div className="mt-4">
                                <h5 className="font-size-15 mb-1">Member ID</h5>
                                <h5>
                                  {" "}
                                  <p>#{billData.memberId}</p>
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="py-2">
                          <h5 className="font-size-15">Order Summary</h5>

                          <div className="table-responsive">
                            <table className="table align-middle table-nowrap table-centered mb-0">
                              <thead>
                                <tr>
                                  <th style={{ width: "70px" }}>No.</th>
                                  <th>Item</th>
                                  <th>Total Fees</th>
                                  <th>Amount Paid </th>
                                  <th
                                    className="text-end"
                                    style={{ width: "120px" }}
                                  >
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">01</th>
                                  <td>
                                    <div>
                                      <h5 className="text-truncate font-size-14 mb-1">
                                        Gym Fee
                                      </h5>
                                      {/* <p className="text-muted mb-0">income</p> */}
                                    </div>
                                  </td>
                                  <td>₹ {billData.totalFees}</td>
                                  <td>{billData.amountPaid}</td>
                                  <td className="text-end">
                                    ₹ {billData.totalFees - billData.amountPaid}
                                  </td>
                                </tr>
                                {/* <tr>
                                                        <th scope="row">02</th>
                                                        <td>
                                                            <div>
                                                                <h5 className="text-truncate font-size-14 mb-1">Stainless Steel S010</h5>
                                                                <p className="text-muted mb-0">Watch, Gold</p>
                                                            </div>
                                                        </td>
                                                        <td>$ 245.50</td>
                                                        <td>2</td>
                                                        <td className="text-end">$491.00</td>
                                                    </tr> */}
                                <tr>
                                  <th
                                    scope="row"
                                    colSpan="4"
                                    className="text-end"
                                  >
                                    Sub Total
                                  </th>
                                  <td className="text-end">
                                    ₹ {billData.totalFees - billData.amountPaid}
                                  </td>
                                </tr>

                                {/* <tr>
                                                        <th scope="row" colSpan="4" className="border-0 text-end">
                                                            Tax</th>
                                                        <td className="border-0 text-end">$12.00</td>
                                                    </tr> */}
                                <tr>
                                  <th
                                    scope="row"
                                    colSpan="4"
                                    className="border-0 text-end"
                                  >
                                    PendingTotal
                                  </th>
                                  <td className="border-0 text-end">
                                    <h4 className="m-0 fw-semibold">
                                      ₹{" "}
                                      {billData.totalFees - billData.amountPaid}
                                    </h4>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="d-print-none mt-4">
                            <div className="float-end">
                              <button className="btn btn-success me-1">
                                <i className="fa fa-print"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ paddingLeft: "110px" }}>
            <button className="btn btn-primary my-3" onClick={printReceipt} style={{marginRight:"20px"}}>
              Print
            </button>
            {/* <button onClick={()=>{generatePDF();}} id="printButton" className="btn btn-primary my-3 mx-2">
                        RECEIVE VIA EMAIL
                    </button> */}


            <button className="btn btn-primary my-4" onClick={() => nav(-1)} >
              Cancel
            </button>
          </div>

          <div style={{ paddingLeft: "110px" }}>
        
      </div>

        </div>
      ) : (
        <p
          style={{
            marginLeft: "400px",
            marginTop: "100px",
            color: "black",
            fontSize: "30px",
            fontWeight: "600",
          }}
        >
          Loading...
        </p>
      )}

      {/* </Layout> */}
    </>
  );
};

export default Receipt;
