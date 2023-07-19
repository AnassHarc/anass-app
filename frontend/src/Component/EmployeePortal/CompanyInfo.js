import { useEffect, useState } from "react";
import { NavBarEmployee } from "../../Navigation Bar/headerEmployee";
import axios from "axios";
import { API_URL } from "../../API_URL/api_url";
import { useLocation } from "react-router-dom";

export const CompanyInfo = () => {
  let location = useLocation();
    useEffect(()=>{
      getuserinfo();
      }, [location]);
    
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
            getcompanies();
           } 
           catch(err){
               alert(err.response);
           }
        };
    const [company, setCompany] = useState([]);
      const getcompanies=()=>{
        //recieve data of companies
        axios.get(API_URL.COMPANY,{
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        }).then((res) => {
            const cmpById = res.data.filter(p => p.companyName === user.companyName );
          setCompany(cmpById);
          });
        };

    return (
        <div className="navbarCustom">
        <NavBarEmployee />
         <h2 style={{textAlign:"center"}}>Company Information</h2>
        <table className="table table-hover table-sm text-center">
        <thead className="bg-info">
          <tr>
            <th>company Name</th>
            <th>company Adress</th>
            <th>company Phone</th>
            <th>company Website</th>
          </tr>
        </thead>
        <tbody>
          {company.map((cmp) => (
            <tr key={cmp._id}>
              <td data-title="Name">{cmp.companyName}</td>
              <td data-title="Adress">{cmp.companyAdress}</td>
              <td data-title="Phone">{cmp.companyPhone}</td>
              <td data-title="Web Site">{cmp.companyWebsite}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )
}