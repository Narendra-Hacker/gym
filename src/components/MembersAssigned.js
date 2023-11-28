import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";

export default function MembersAssigned(){
    const { trainerId } = useParams();
    const [Clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const result = await axios.get(`https://localhost:7114/api/MemberRegt/GetMember`);
                const clientsData = result.data;
                const filteredClients = clientsData.filter(client => client.trainerId === parseInt(trainerId));
                setClients(filteredClients);
                console.log(filteredClients, "memberdata");
            } catch (error) {
                console.error('Axios Error:', error.message);
            }
        };

        fetchClient();
    }, [trainerId]);

    return (
        <div style={{ backgroundColor: "#f4f4f4", height:"100vh" }}>
            <br></br>
            <h3 style={{ textAlign: 'center', margin: '0 auto' }}> <u>These are the Members Assigned to you : </u></h3>
            <br></br>
            <div className="md-3" style={{ backgroundColor: "#f4f4f4"}}>
                <div>           
                    {Clients.length !== 0 ? (
                        <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
                            {Clients.map(client => (
                                <div className="col" key={client.memberId} style={{ maxWidth: '500px' }}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{client.firstName} {client.lastName}</h5>
                                            <p className="card-text">
                                                <strong>Mobile No:</strong> {client.mobileNo}
                                            </p>
                                            <p className="card-text">
                                                <strong>Email:</strong> {client.email}
                                            </p>
                                            {/* <Link to={`Assignwork/${client.trainerId}`}>
                                                <button className="btn btn-primary">Assign Work</button>
                                            </Link> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1 className="text-center">You have not been Assigned any Member yet</h1>
                    )}
                    <Outlet/>
                </div>
            </div>
        </div>     
    );
}
