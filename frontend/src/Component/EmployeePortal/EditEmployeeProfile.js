import { useEffect, useState } from "react";
import { NavBarEmployee } from "../../Navigation Bar/headerEmployee";
import axios from "axios";
import moment from "moment";
import { API_URL } from "../../API_URL/api_url";

export const EditEmployeeProfile = () => {
   
    useEffect(() => {
        getuserinfo();
      }, []);

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
        
          const handleUpdate = () => {  
            (axios.put(`${API_URL.EDITEMPLOYEE}${user._id}`, {
                firstname: user.firstname,
                lastname: user.lastname,
                adress:user.adress,
                birthday:user.birthday,
                phone:user.phone,
                email:user.email,
                password:user.password,
                PhotoFileName: user.PhotoFileName,
                Date_of_Joining: moment(user.Date_of_Joining).format("yyyy-MM-dd"),
              },
              {
                headers: {
                  'x-auth-token': localStorage.getItem('token')
                }
              }
              )
              .then(
                (res) => {
                  alert("You are Succeccfully Update Your Profil!");
                  window.location.reload();
                },
                (err) =>
                  alert(`Error while Updating Your Profil! ,please try again ${err.response.data.message}`)
              ))
      };
      
      const imageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios
      .post(API_URL.PROFILEPHOTO, formData)
      .then((res) => {
        // console.log(res);
        setUser({ PhotoFileName: res.data.fileName});
      })
      .catch((err) => {
        console.error(err);
        alert("Error while uploading image");
      });
  };


    return(
      <div className="navbarCustom">
         <NavBarEmployee />
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h3 className="modal-title" >Edit Profile</h3>
            </div>
            <div className="modal-body">
              {/* photo  */}
              <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 w-50 bd-highlight">
                
                  <div className="input-group mb-3">
                    <span className="input-group-text">Employee Name:</span>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      onChange={(e) =>{setUser({ firstname: e.target.value})}}
                      value={user.firstname}/>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      onChange={(e) =>{setUser({ lastname: e.target.value})}}
                      value={user.lastname}/>
                  </div>
                
                  <div className="input-group mb-3">
                    <span className="input-group-text">Birth Day:</span>
                    <input
                      type="date"
                      className="form-control"
                      value={moment(user.birthday).format("yyyy-MM-DD")}
                      onChange={(e) =>{setUser({ birthday: e.target.value})}}
                    />
                  </div>

                <div className="input-group mb-3" >
                 <span className="input-group-text">Phone</span>
                  <input
                    type="number"
                    className="form-control"
                    value={user.phone}
                    onChange={(e) =>{setUser({ phone: e.target.value})}}
                   />
                  </div>

                <div className="input-group mb-3" >
                 <span className="input-group-text">Email</span>
                  <input
                    type="text"
                    className="form-control"
                    value={user.email}
                    onChange={(e) =>{setUser({ email: e.target.value})}}
                   />
                  </div>

                <div className="input-group mb-3" >
                 <span className="input-group-text">Adress</span>
                  <input
                    type="text"
                    className="form-control"
                    value={user.adress}
                    onChange={(e) =>{setUser({ adress: e.target.value})}}
                   />
                  </div>

                <div className="input-group mb-3" >
                 <span className="input-group-text">Password</span>
                  <input
                    type="text"
                    className="form-control"
                    value={user.password} 
                    onChange={(e) =>{setUser({ password: e.target.value})}}
                   />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Company Name:</span>
                    <input
                      className="form-control"
                      value={user.companyName}
                    >
                    </input>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Role:</span>
                    <div className="form-control">
                        {user.role}
                    </div>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Date of Joining:</span>
                    <input
                      type="date"
                      className="form-control"
                      value={moment(user.Date_of_Joining).format("yyyy-MM-DD")}
                      onChange={(e) =>{setUser({ Date_of_Joining: e.target.value})}}
                    />
                  </div>

                </div>
                <div className="p-2 w-50 bd-highlight">
                  <img
                    width="250px"
                    height="250px"
                    alt=""
                    src={`http://localhost:5000/profile/${user.PhotoFileName}`}
                  />
                  <input className="m-2" type="file" onChange={imageUpload}/>
                </div>
              </div>
              {/* button to update Employee  */}
              {user.employeeId!== 0 ? (
                <button
                  type="button"
                  className=" btn btn-primary float-start"
                  onClick={() => handleUpdate()}
                >
                  {" "}
                  Update
                </button>
              ) : null}
            </div>
          </div>
        </div>
     </div>
    )

}