import axios from "axios";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../API_URL/api_url";

const reducer = (state, action) => {
    switch (action.type) {
      case "INPUT":
        return {
          ...state,
          firstname:action.payload.firstname,
          lastname:action.payload.lastname,
          adress:action.payload.adress,
          birthday:action.payload.birthday,
          phone:action.payload.phone,
          email:action.payload.email,
          password:action.payload.password
        };
      case "REGISTER":
        return {
          ...state,
          modalTitle: "Register",
          userID:0
        };
      case "LOGIN":
        return {
          ...state,
          modalTitle: "Login",
          userID:""
        };
      default:
        return state;
    }
  };
 
  export const HomePage = () => {
  const navigate=useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    modalTitle: "",
    email:"",
    password: "",
    userID:0,
    token: "",
  });
  const registerClick = () => {
    dispatch({
      type: "REGISTER",
      payload: {
        ...state,
      },
    });
  };
  const loginClick = () => {
    dispatch({
      type: "LOGIN",
      payload: {
        ...state,
      },
    });
  };
  const handleRegister = async (e)=>{
    e.preventDefault();
try {
  const response = await axios.post(API_URL.REGISTER1,
    {
      email:state.email,
      password:state.password,
      firstname:state.firstname,
      lastname:state.lastname,
      adress:state.adress,
      birthday:state.birthday,
      phone:state.phone,
    });
    localStorage.setItem('token',response.data.token)
    alert('You are Successfully registered')
    
    navigate('/companies')  
    
    window.location.reload();
} catch (err) {
  alert("Error While register  please provide correct email and password ! this email is alredy used "||err.response.data);
  }
}

 const handleLogin =async (e)=>{
    e.preventDefault();
   try{
  const result = await axios.post(API_URL.LOGIN,
      {
        email:state.email,
        password:state.password
      })
     console.log("Response :", result.data.foundUser );
     localStorage.setItem('token',result.data.token);
     alert('You are logged in successfully!');
     if(result.data.foundUser.role === "admin"){
     navigate('/companies');
    }else if(result.data.foundUser.role === "employee"){
      navigate('/editEmployeeProfile');
    }
     window.location.reload();
     
   } 
   catch(err){
    alert("Error While login please provide correct email and password ! "||err.response.data);
   }
  }
  return (
    <div className="homepage">
      <h1 style={{color:"royalBlue"}}>Welcome to Employees Management App</h1>
      <h2 style={{color:"skyBlue"}}>By Anass Harchaoui</h2>
      <div className="modal" tabIndex="-1" id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h3 className="modal-title">{state.modalTitle}</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

            <div className="input-group mb-3" hidden={state.modalTitle === "Login"}>
                 <span className="input-group-text">First Name</span>
                  <input
                    type="text"
                    className="form-control"
                    value={state.firstname}
                    onChange={(e)=>dispatch({
                      type:'INPUT',
                      payload:{
                       ...state,
                       firstname:e.target.value
                      } || ""
               })}
                   />
              </div>

              <div className="input-group mb-3" hidden={state.modalTitle === "Login"}>
                 <span className="input-group-text">Last Name</span>
                  <input
                    type="text"
                    className="form-control"
                    value={state.lastname}
                    onChange={(e)=>dispatch({
                      type:'INPUT',
                      payload:{
                       ...state,
                       lastname:e.target.value
                      } || ""
               })}
                   />
              </div>
              
              <div className="input-group mb-3" hidden={state.modalTitle === "Login"}>
                 <span className="input-group-text">Adress</span>
                  <input
                    type="text"
                    className="form-control"
                    value={state.adress}
                    onChange={(e)=>dispatch({
                      type:'INPUT',
                      payload:{
                       ...state,
                       adress:e.target.value
                      } || ""
               })}
                   />
              </div>

              <div className="input-group mb-3" hidden={ state.modalTitle === "Login"}>
                 <span className="input-group-text">Phone</span>
                  <input
                    type="number"
                    className="form-control"
                    value={state.phone}
                    onChange={(e)=>dispatch({
                      type:'INPUT',
                      payload:{
                       ...state,
                       phone:e.target.value
                      } || ""
               })}
                   />
              </div>

              <div className="input-group mb-3" hidden={state.modalTitle === "Login"}>
                 <span className="input-group-text">Birth Day</span>
                  <input
                    type="date"
                    className="form-control"
                    value={state.birthday}
                    onChange={(e)=>dispatch({
                      type:'INPUT',
                      payload:{
                       ...state,
                       birthday:e.target.value
                      } || ""
               })}
                   />
              </div>

              <div className="input-group mb-3">
                 <span className="input-group-text">Email</span>
                  <input
                    type="email"
                    className="form-control"
                    value={state.email}
                    onChange={(e)=>dispatch({
                      type:'INPUT',
                      payload:{
                       ...state,
                       email:e.target.value
                      } || ""
               })}
                   />
              </div>
            <div className="input-group mb-3">
               <span className="input-group-text">Password</span> 
                  <input
                    type="password"
                    className="form-control"
                    value={state.password}
                    onChange={(e)=>dispatch({
                           type:'INPUT',
                           payload:{
                            ...state,
                            password:e.target.value
                           } || ""
                    })}
                  />
            </div>
            </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
               {state.userID===0?
               <button 
                     type="button" 
                     className="btn btn-primary" 
                     onClick={handleRegister}
                     >
                  {state.modalTitle}
                </button>
                :null} 
                 {state.userID!==0?
               <button 
                     type="button" 
                     className="btn btn-primary" 
                     onClick={handleLogin}
                     >
                  {state.modalTitle}
                </button>
                :null} 
              </div>
          </div>
        </div>
      </div>
    <div className="viewformargin">
      <button
        type="button"
        className="btn btn-primary m-2 float-center"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => registerClick()}
      >
        Register
      </button>
      <button
        type="button"
        className="btn btn-primary m-2 float-center"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => loginClick()}
      >
        Login
      </button>
    </div>
    </div>
  );
};

