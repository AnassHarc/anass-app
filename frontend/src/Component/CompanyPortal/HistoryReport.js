import { useEffect, useState } from "react";
import { NavBarAdmin } from "../../Navigation Bar/headerAdmin";
import axios from "axios";
import moment from "moment";
import { API_URL } from "../../API_URL/api_url";


export const HistoryReport = () => {
    useEffect(() => {
       // getuserinfo();
        getEmployees();
      }, []);
      /*
      const [user, setUser] = useState({});
      const getuserinfo = async ()=>{
        //recieve data user
           try{
           const result = await  axios.get(API_URL.USER,{
               headers: {
               'x-auth-token': localStorage.getItem('token')
               }
           });
           const resdata = result.data
           setUser(resdata);
           } 
           catch(err){
               alert(err.response);
           }
        };
        */
    
      const [employee, setEmployee] = useState([]);
      const getEmployees = () => {
        //fetching employee information
          axios.get(API_URL.EMPLOYEE,
            {
              headers: {
                'x-auth-token': localStorage.getItem('token')
              }
            }
            ).then((res) => {
            setEmployee(res.data);
          });
        };
        const approveClick = (id)=>{
          (axios.put(`${API_URL.EDITEMPLOYEE}${id}`, {
            status:"confirmed"
          },
          {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          }
          )
          .then(
            (res) => {
              console.log("Response :", res);
              alert("You are Succeccfully Update the status Employee!");
              window.location.reload();
            },
            (err) =>
              alert(`Error while Updating the the status Employee! ,please try again ${err.response.data.message}`)
          ))
        };
        const cancelClick = (id)=>{
          (axios.put(`${API_URL.EDITEMPLOYEE}${id}`, {
            status:"canceled"
          },
          {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          }
          )
          .then(
            (res) => {
              console.log("Response :", res);
              alert("You are Succeccfully Update the status Employee!");
              window.location.reload();
            },
            (err) =>
              alert(`Error while Updating the the status Employee! ,please try again ${err.response.data.message}`)
          ))
        }

        return(
            <div className="table-responsive navbarCustom">
             <NavBarAdmin />
             <h2 style={{textAlign:"center"}}>History Report</h2>
            <table className="table table-hover table-sm text-center">
        <thead className="bg-info">
          <tr>
            <th>profile photo</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Company Name</th>
            <th>Role</th>
            <th>Date of Joining</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((emp) => (
            <tr key={emp._id}>
              <td data-title="Profile photo"><img className="rounded-circle profileImage" src={emp.PhotoFileName? `http://localhost:5000/profile/`+emp.PhotoFileName: "http://localhost:5000/profile/avatar.jpg"  } alt=""/></td>
              <td data-title="Employee Name">{emp.firstname}  {emp.lastname}</td> 
              <td data-title="Email">{emp.email}</td>
              <td data-title="Company Name">{emp.companyName}</td>
              <td data-title="Role">{emp.role}</td>
              <td data-title="Date Of Joining">{moment(emp.Date_of_Joining).format("YYYY MM DD")}</td>
              <td data-title="Created At">{moment(emp.createdAt).format("YYYY MM DD hh:mm")}</td>
              <td data-title="Updated At">{moment(emp.updatedAt).format("YYYY MM DD hh:mm")}</td>
              <td data-title="Role">{emp.status}</td>
              <td data-title="Action">
                <button 
                  onClick={() => approveClick(emp._id)}
                  hidden={emp.status==="confirmed"}
                  className="btn btn-sm shadow-lg rounded-pill "
                  style={{background : "green", color: "white"}}
                  >
                    Approve
                </button>
                <button 
                  onClick={() => cancelClick(emp._id)}
                  hidden={emp.status==="confirmed" || emp.status==="canceled"}
                  className="btn btn-sm shadow-lg rounded-pill "
                  style={{background : "red", color: "white"}}
                  >
                    Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )
}