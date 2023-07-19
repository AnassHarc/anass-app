import { useEffect, useState } from "react";
import { NavBarEmployee } from "../../Navigation Bar/headerEmployee";
import axios from "axios";
import moment from "moment";
import { API_URL } from "../../API_URL/api_url";
import { useLocation } from "react-router-dom";


export const EmployeesInfo = ()=>{
  let location = useLocation();
    useEffect(() => {
        getuserinfo();
      },[location]);
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
           getEmployees();
           } 
           catch(err){
               alert(err.response);
           }
        };

      const [employee, setEmployee] = useState([]);
      const getEmployees = () => {
            //getuserinfo();
        //fetching employee information
        axios.get(API_URL.EMPLOYEE,
          {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          }
          ).then((res) => {
            const empBycmp = res.data.filter(p => p.companyName === user.companyName);
          setEmployee(empBycmp);
        });
      };
      

    return (
        <div className="navbarCustom">
         <NavBarEmployee />
         <h2 style={{textAlign:"center"}}>Employees Information</h2>
        <table className="table table-hover table-sm text-center">
        <thead className="bg-info">
          <tr>
            <th>profile photo</th>
            <th>Employee Name</th>
            <th>Birth Day</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Adress</th>
            <th>Company Name</th>
            <th>Role</th>
            <th>Date of Joining</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((emp) => (
            <tr key={emp._id}>
              <td data-title="Profile photo"><img className="rounded-circle profileImage" src={ (!emp.PhotoFileName || emp.PhotoFileName=== undefined) ? "http://localhost:5000/profile/avatar.jpg" : `http://localhost:5000/profile/`+emp.PhotoFileName } alt=""/></td>
              <td data-title="Employee Name">{emp.firstname}  {emp.lastname}</td>
              <td data-title="Birth Day">{moment(emp.birthday).format("YYYY MM DD")}</td>
              <td data-title="Phone">{emp.phone}</td>
              <td data-title="Email">{emp.email}</td>
              <td data-title="Adress">{emp.adress}</td>
              <td data-title="Company Name">{emp.companyName}</td>
              <td data-title="Role">{emp.role}</td>
              <td data-title="Date Of Joining">{moment(emp.Date_of_Joining).format("YYYY MM DD")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}