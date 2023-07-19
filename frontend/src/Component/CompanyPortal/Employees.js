import { useEffect, useReducer, useState } from "react";
import { NavBarAdmin } from "../../Navigation Bar/headerAdmin";
import axios from "axios";
import moment from "moment";
import { API_URL } from "../../API_URL/api_url";


const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_EMPLOYEE":
        return {
          ...state,
          firstname:action.payload.firstname,
          employeeId: action.payload.employeeId,
          lastname:action.payload.lastname,
          companyName: action.payload.companyName,
          adress:action.payload.adress,
          birthday:action.payload.birthday,
          phone:action.payload.phone,
          email:action.payload.email,
          password:action.payload.password,
          PhotoFileName: action.payload.PhotoFileName,
          Date_of_Joining:action.payload.Date_of_Joining,
          createdById: action.payload.createdById,
          role:action.payload.role,
          status:action.payload.status
        };
      case "MODAL_TITLE_ADD_EMPLOYEE":
        return {
          ...state,
          modalTitle: "Add Employee",
          employeeId: 0,
        };
  
      case "MODAL_TITLE_EDIT_EMPLOYEE":
        return {
          ...state,
          modalTitle: "Update Employee",
          employeeId: action.payload.employeeId,
          firstname:action.payload.firstname,
          lastname:action.payload.lastname,
          companyName: action.payload.companyName,
          adress:action.payload.adress,
          birthday:action.payload.birthday,
          phone:action.payload.phone,
          email:action.payload.email,
          password:action.payload.password,
          PhotoFileName: action.payload.PhotoFileName,
          Date_of_Joining:action.payload.Date_of_Joining,
          createdById: action.payload.createdById,
          role:action.payload.role,
          status:action.payload.status
        };
      default:
        return;
    }
  };

  export const EmployeesPage = () => {

    useEffect(() => {
        getuserinfo();
        getEmployees();
        getCompanies();
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
      const [company, setCompany] = useState([]);
      const getCompanies = () => {
        //fetching companies information
        axios.get(API_URL.COMPANY,
          {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          }
          ).then((res) => {
          setCompany(res.data);
        });
      };

      const [state, dispatch] = useReducer(reducer, {
        modalTitle: "",
        employeeId: 0,
        firstname:"",
        lastname:"",
        companyName: "",
        adress:"",
        birthday:"",
        phone:"",
        email:"",
        password:"",
        photoPath: API_URL.photosPath,
        Date_of_Joining: "",
        createdById: user._id,
        role:"",
        status:""
      });
      const addClick = () => {
        dispatch({
          type: "MODAL_TITLE_ADD_EMPLOYEE",
          payload: {
            modalTitle: state.modalTitle,
            employeeId: state.employeeId,
            firstname:"",
            lastname:"",
            companyName: "",
            adress:"",
            birthday:"",
            phone:"",
            email:"",
            password:"",
            PhotoFileName:"",
            Date_of_Joining: "",
            createdById: user._id,
            role:"",
            status:""
          },
        });
      };
      const editClick = (emp) => {
        dispatch({
          type: "MODAL_TITLE_EDIT_EMPLOYEE",
          payload: {
            modalTitle: state.modalTitle,
            employeeId: emp.employeeId,
            firstname: emp.firstname,
            lastname: emp.lastname,
            companyName: emp.companyName,
            adress:emp.adress,
            birthday:moment(emp.birthday).format("YYYY MM DD"),
            phone:emp.phone,
            email:emp.email,
            password:emp.password,
            PhotoFileName: emp.PhotoFileName,
            Date_of_Joining: emp.Date_of_Joining,
            role: emp.role,
            status:emp.status
          },
        });
      };

        //    add employement
  const handleCreate = () => {
    
    const formData = new FormData();
    formData.append('firstname', state.firstname);
    formData.append('lastname', state.lastname);
    formData.append('companyName', state.companyName);
    formData.append('adress', state.adress);
    formData.append('birthday', state.birthday);
    formData.append('phone', state.phone);
    formData.append('email', state.email);
    formData.append('password', state.password);
    formData.append('PhotoFileName', state.PhotoFileName);
    formData.append('Date_of_Joining', state.Date_of_Joining);
    formData.append('role', state.role);
    formData.append('createdById', user._id);
    formData.append('status', "waiting");
    axios.post(API_URL.ADDEMPLOYEE, formData,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
       'x-auth-token': localStorage.getItem('token')
        }
      })
      .then((res) => {
        console.log("RESPONSE :", res);
        alert("The Employee is successfully added!");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          alert(`Error while Creating Employee: ${err.response.data.message}`);
        } else if (err.request) {
          alert("Error sending request. Please try again later.");
        } else {
          alert("Unknown error. Please try again later.");
        }
      });
  };

  const imageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios
      .post(API_URL.PROFILEPHOTO, formData)
      .then((res) => {
        // console.log(res);
        dispatch({
          type: "ADD_EMPLOYEE",
          payload: {
            ...state,
            PhotoFileName: res.data.fileName,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error while uploading image");
      });
  };
  
  const handleUpdate = (id) => {
        const emp =  employee.find((mp) =>      
                    mp.employeeId === id
                    );
          if (emp){
        (axios.put(`${API_URL.EDITEMPLOYEE}${emp._id}`, {
            firstname: state.firstname,
            lastname: state.lastname,
            companyName: state.companyName,
            adress:state.adress,
            birthday:state.birthday,
            phone:state.phone,
            email:state.email,
            password:state.password,
            PhotoFileName: state.PhotoFileName,
            Date_of_Joining: moment(state.Date_of_Joining).format("YYYY MM DD"),
            employeeId: state.employeeId,
            role: state.role
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
              alert("You are Succeccfully Update Employee!");
              window.location.reload();
            },
            (err) =>
              alert(`Error while Updating the Employee! ,please try again ${err.response.data.message}`)
          ))
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete Employee?")) {
      axios.delete(`${API_URL.DELETEEMPLOYEE}${id}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      }
      ).then(
        (res) => {
          alert("You are Successfully Delete Employee !");
          window.location.reload();
        },
        (err) => alert(`Error While Deleting Employee,try again! ${err.response.data.message}`)
      );
    }
  };

  return(
    <div className="table-responsive navbarCustom">
      <NavBarAdmin />
      <h2 style={{textAlign:"center"}}>Employees Page</h2>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => addClick()}
      >
        Add Employee
      </button>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((emp) => (
            <tr key={emp._id}>
              <td data-title="Profile photo"><img className="rounded-circle profileImage" src={ (!emp.PhotoFileName || emp.PhotoFileName=== undefined) ? "http://localhost:5000/profile/avatar.jpg" : state.photoPath+emp.PhotoFileName } alt=""/></td>
              <td data-title="Employee Name">{emp.firstname}  {emp.lastname}</td>
              <td data-title="Birth Day">{moment(emp.birthday).format("YYYY MM DD")}</td>
              <td data-title="Phone">{emp.phone}</td>
              <td data-title="Email">{emp.email}</td>
              <td data-title="Adress">{emp.adress}</td>
              <td data-title="Company Name">{emp.companyName}</td>
              <td data-title="Role">{emp.role}</td>
              <td data-title="Date Of Joining">{moment(emp.Date_of_Joining).format("YYYY MM DD")}</td>
              <td data-title="Action">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(emp)}
                  className="btn btn-sm shadow-lg rounded-pill text-decoration-none"
                >
                  <span>
                    <i
                      className="fa-sharp fa-solid fa-pen-to-square"
                      style={{ fontSize: "10px" }}
                    ></i>
                  </span>
                </button>
                <button
                  className="btn btn-sm shadow-lg  rounded-pill ms-2"
                  onClick={() => handleDelete(emp._id)}
                >
                  <span>
                    <i
                      className="fa-sharp fa-solid fa-trash"
                      style={{ fontSize: "12px" }}
                    ></i>
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h4 className="modal-title">{state.modalTitle}</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            firstname: e.target.value,
                          } || "",
                        })
                      }
                    value={state.firstname}/>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            lastname: e.target.value,
                          } || "",
                        })
                      }
                    value={state.lastname}/>
                  </div>
                
                  <div className="input-group mb-3">
                    <span className="input-group-text">Birth Day:</span>
                    <input
                      type="date"
                      className="form-control"
                      value={moment(state.birthday).format("yyyy-MM-DD")}
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE" ,
                          payload: {
                            ...state,
                            birthday: e.target.value,
                          } || "",
                        })
                      }
                    />
                  </div>

                <div className="input-group mb-3" >
                 <span className="input-group-text">Phone</span>
                  <input
                    type="number"
                    className="form-control"
                    value={state.phone}
                    onChange={(e)=>dispatch({
                      type:"ADD_EMPLOYEE",
                      payload:{
                       ...state,
                       phone:e.target.value
                      } || ""
                    })}
                   />
                  </div>

                <div className="input-group mb-3" >
                 <span className="input-group-text">Email</span>
                  <input
                    type="text"
                    className="form-control"
                    value={state.email}
                    onChange={(e)=>dispatch({
                      type:"ADD_EMPLOYEE",
                      payload:{
                       ...state,
                       email:e.target.value
                      } || ""
                    })}
                   />
                  </div>

                <div className="input-group mb-3" >
                 <span className="input-group-text">Adress</span>
                  <input
                    type="text"
                    className="form-control"
                    value={state.adress}
                    onChange={(e)=>dispatch({
                      type:"ADD_EMPLOYEE",
                      payload:{
                       ...state,
                       adress:e.target.value
                      } || ""
                    })}
                   />
                  </div>

                <div className="input-group mb-3" hidden={state.modalTitle==="Update Employee"} >
                 <span className="input-group-text">Password</span>
                  <input
                    type="text"
                    className="form-control"
                    value={state.password}
                    onChange={(e)=>dispatch({
                      type:"ADD_EMPLOYEE",
                      payload:{
                       ...state,
                       password:e.target.value
                      } || ""
                    })}
                   />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Company Name:</span>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            companyName: e.target.value,
                          },
                        }) || ""
                      }
                      value={state.companyName}
                    >
                      {company.map((cmp) => (
                        <option key={cmp._id}>{cmp.companyName}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Role:</span>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            role: e.target.value,
                          },
                        }) || ""
                      }
                      value={state.role}
                    >
                        <option value={"admin"}>Admin</option>
                        <option value={"employee"}>Employee</option>
                    </select>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Date of Joining:</span>
                    <input
                      type="date"
                      className="form-control"
                      value={moment(state.Date_of_Joining).format("yyyy-MM-DD")}
                      onChange={(e) =>
                        dispatch({
                          type: "ADD_EMPLOYEE",
                          payload: {
                            ...state,
                            Date_of_Joining: e.target.value,
                          },
                        }) || ""
                      }
                    />
                  </div>

                </div>
                <div className="p-2 w-50 bd-highlight">
                  <img
                    width="250px"
                    height="250px"
                    alt=""
                    src={`${state.photoPath}${state.PhotoFileName}`}
                  />
                  <input className="m-2" type="file" onChange={imageUpload}/>
                </div>
              </div>
              {/* button to update Employee  */}
              {state.employeeId!== 0 ? (
                <button
                  type="button"
                  className=" btn btn-primary float-start"
                  onClick={() => handleUpdate(state.employeeId)}
                >
                  {" "}
                  Update
                </button>
              ) : null}
              {/* button to create new Employee  */}
              {state.employeeId === 0 ? (
                <button
                  type="button"
                  className=" btn btn-primary float-start"
                  onClick={handleCreate}
                >
                  {" "}
                  Create
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  };