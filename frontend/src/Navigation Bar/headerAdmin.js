import { Link } from "react-router-dom"
import  '.././App.css'
export const NavBarAdmin = () => {
  const handleLout = ()=>{
    localStorage.removeItem("token");
  }
return (
    <div className="navbarCustom">
      <button className="Logout" onClick={handleLout}>
        <Link className="btn btn-light btn-outline-primary LogoutLink" to="/">logout
         <span>
          <i className="fa-sharp fa-solid fa-right-from-bracket"  style={{ fontSize: "17px" }}>
          </i>
         </span>
        </Link>
      </button>
       <nav className="navbar  navbar-expand-sm navbar-dark bg-light text-uppercase " 
       style={{backgroundImage:"radial-gradient( circle 654px at 4% 28%, rgba(68, 56, 62, 0.86) 10%, rgba(15, 6, 11, 0.86)"}}>
        <div className="container-fluid " >
            <ul className="navbar-nav ms-5 mt-2">
              <li className="nav-item">
                <Link className="btn btn-light btn-outline-primary" to="/companies">Companies</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-light btn-outline-primary" to="/employees">Employees</Link>
               </li>
               <li className="nav-item">
               <Link className="btn btn-light btn-outline-primary" to="/historyreport">History Report</Link>
              </li>
               <li className="nav-item">
                <Link className="btn btn-light btn-outline-primary" to="/editProfile">Edit Profile</Link>
               </li>
            </ul>
          </div>
      </nav>
        <h1 style={{textAlign:"center"}}>Employees Management System</h1>
    </div>
)
}