
import {
  BrowserRouter as Router,
  Route,
  Routes,
  //Outlet
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './components/Registration';
// import Login from "./components/Login";
//import Home from "./components/Home";
import Trainer from "./components/Trainer";
import RegisterMember from "./components/RegisterMember";
import LoginMem from "./components/LoginMem";
import Member from "./components/Member";
// import AdminHome from "./components/AdminHome";
import Admin from "./components/Admin";
//import MainHeader from "./MainHeader";
import { TrainerAPI } from "./components/TrainerAPI";
import { MemberAPI } from "./components/MemberAPI";
import { FeeDetailsAPI } from "./components/FeeDetail";
import ViewReceipt from "./components/ViewReceipt";
import Receipt from "./components/sample";
import HomePage from "./components/HomePage";
import EmailForm from "./components/Email1";
import TrainerEdit from "./components/TrainerEdit";
import MemberEdit from "./components/MemberEdit";
import FeeCreate from "./components/FeeCreate";
import FeeEdit from "./components/FeeEdit";
import Trainerprofile from "./components/Trainerprofile";
import {TrainerHome}  from "./components/TrainerHome";
// import membercard from "./components/membercard";
import MembersAssigned from "./components/MembersAssigned";
import Assignwork from "./components/Assignwork";
import MemberProfile from "./components/MemberProfile";
import {MemberHome}  from "./components/MemberHome";
import Trainersandschedules from "./components/Trainersandschedules";
import MemberFees from "./components/MemberFees";
import MemberFeePayment from "./components/MemberFeePayment";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route index element={<Registration />} /> */}
          {/* <Route  exact path = "/" element={<MainHeader />}/> */}
          <Route exact path = "/admin" element={<Admin />}/>
          {/* <Route exact path="/adminhome" element={<AdminHome />} /> */}


          <Route exact path="/trainer" element={<Trainer />}>
          <Route path="trainerProfile" element={<Trainerprofile/>}/>
          <Route path="membersassigned/:trainerId" element={<MembersAssigned />}/> 
          <Route path="Assignwork/:trainerId" element={< Assignwork/>}/>         
          <Route index element={<TrainerHome/>}/>          
          </Route>
        
                  


          {
          /* <Route exact path="/member" element={<Member />} >  
          <Route path="memberProfile" element={<MemberProfile/>}/>                  
          <Route index element={<MemberHome/>}/>
          
          </Route> */}

          <Route exact path="/member" element={<Member />} >  
          <Route path="trainersandschedules" element={<Trainersandschedules/>}/>
          <Route path="memberProfile/:id" element={<MemberProfile/>}/>
          <Route path="memberFees/:memberId" element={<MemberFees/>}/>                  
          <Route index element={<MemberHome/>}/>
          
          </Route>

          <Route path="memberfeePayment/:feeId" element={<MemberFeePayment/>}/>

          




          {/* <Route
            path="/member/*"
            element={
              <Member>
                <Route index element={<MemberHome />} />
                <Route path="/memberProfile/:id" element={<MemberProfile />} />
              </Member>
            }
          /> */}

          {/* <Route
            path="/member/memberProfile/:id"
            element={<MemberProfile />}
          />         */}


          {/* <Route exact path="/login" element={<Login />} /> */}
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/registermember" element={<RegisterMember />} />
          <Route exact path="/loginmem" element={<LoginMem />} />
          <Route exact path ="/admin/trainersdetails" element={<TrainerAPI />} />
          <Route exact path="/admin/membersdetails" element={<MemberAPI />}/>
          <Route exact path="/admin/feedetails" element={<FeeDetailsAPI />} />
          <Route exact path="/pay/:id" element={<ViewReceipt />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/email1" element={<EmailForm />} />
          <Route exact path="/receipt/:id" element={<Receipt />} />
          <Route exact path="/traineredit/:trainerId" element={<TrainerEdit />} />
          <Route exact path="/memberedit/:memberId" element={<MemberEdit />} />
          <Route exact path="/feeCreate" element={<FeeCreate />} /> 
          <Route exact path="/feeEdit/:feeId" element={<FeeEdit />} />
          {/* <Route exact path="/membercard/:memberId" element={< memberCard />} /> */}
        
        {/* <Route path="/trainerProfile" element={<Trainerprofile/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
