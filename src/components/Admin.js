import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("par");
    localStorage.removeItem("name");
    localStorage.removeItem("value");
    navigate("/loginmem");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin">
            Admin page
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
          <Link className="nav-link" aria-current="page" >Home</Link>
        </li> */}
              {/* <li className='nav-item'>
        <Link className="navbar-brand"  to='/admin'>Admin page</Link>
        </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/admin/trainersdetails">
                  Trainer Details
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/membersdetails">
                  Member Details
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/feedetails">
                  Fee Details
                </Link>
              </li>
            </ul>
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="main-content">
        <h1 className="animated-heading">Welcome to our Gym</h1>
        <p className="my-div">
          We offer a wide range of fitness equipment and classes to help you
          achieve your fitness goals.
        </p>
        <div className="my-div">
          <p>
            A gym is a place where people go to exercise and stay physically
            fit. It usually contains a variety of equipment such as treadmills,
            weightlifting machines, free weights, and stationary bikes. Gyms may
            also offer group fitness classes, personal training sessions, and
            other amenities such as showers and locker rooms. One of the main
            benefits of going to a gym is that it provides a structured
            environment for exercise, making it easier to stay motivated and
            consistent in your fitness routine. Gyms also offer a variety of
            equipment and classes to keep your workouts interesting and
            challenging.
          </p>
        </div>

        <br />
        <br />
        <div className="my-div">
          <p>
            Joining a gym can also be a great way to meet like-minded people who
            share your interest in fitness. Many gyms have a sense of community,
            with members encouraging and supporting each other in their fitness
            journeys. However, it's important to note that not all gyms are
            created equal. When choosing a gym, consider factors such as
            location, cost, cleanliness, equipment quality, and staff expertise.
            It's also important to find a gym that aligns with your fitness
            goals and preferences.
          </p>
        </div>

        <br />
        <br />
        <div className="my-div">
          <p>
            Gym or fitness centers are facilities that provide individuals with
            the opportunity to engage in various physical activities and
            exercises to improve their overall health and fitness levels. These
            facilities typically offer a range of equipment, such as weights,
            cardio machines, and other specialized equipment, as well as classes
            and personal training services to help individuals meet their
            fitness goals. Overall, a gym can be a great resource for staying
            active and healthy. Whether you're looking to lose weight, build
            muscle, or simply maintain your fitness level, a gym can provide the
            tools and support you need to reach your goals.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
