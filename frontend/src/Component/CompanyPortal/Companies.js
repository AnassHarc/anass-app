import { useEffect, useReducer, useState } from "react";
import { NavBarAdmin } from "../../Navigation Bar/headerAdmin";
import axios from "axios";
import { API_URL } from "../../API_URL/api_url";
import { useLocation } from "react-router-dom";



const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_COMPANY":
        return {
          ...state,
          companycreatedById:action.payload.companycreatedById,
          companyId: action.payload.companyId,
          companyName: action.payload.companyName,
          companyAdress: action.payload.companyAdress,
          companyPhone: action.payload.companyPhone,
          companyWebsite: action.payload.companyWebsite,

        };
      case "MODAL_TITLE_ADD_COMPANY":
        return {
          ...state,
          modalTitle: "Add Company",
          companyId:0
        };
    
      case "MODAL_TITLE_EDIT_COMPANY":
        return {
          ...state,
          modalTitle: "Update Company",
          companycreatedById:action.payload.companycreatedById,
          companyId: action.payload.companyId,
          companyName: action.payload.companyName,
          companyAdress: action.payload.companyAdress,
          companyPhone: action.payload.companyPhone,
          companyWebsite: action.payload.companyWebsite,
        };
      default :return  
    }
  };


  export const CompaniesPage = () => {
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
            const cmpById = res.data.filter(p => p.companycreatedById === user._id || p.companycreatedById===user.createdById );
          setCompany(cmpById);
          });
        };
      
        const [state, dispatch] = useReducer(reducer, {
            modalTitle: "",
            companyName: "",
            companyAdress:"",
            companyPhone:"",
            companyWebsite: "",
            companycreatedById:user._id,
            companyId:0,
          });
        const addClick=()=>{
            dispatch({
             type:'MODAL_TITLE_ADD_COMPANY',
             payload:{
               ...state,
                 modalTitle:state.modalTitle,
                 companyId:state.companyId,
                 companycreatedById:user._id,
                 companyName:"",
                 companyAdress:"",
                 companyPhone:"",
                 companyWebsite: "",
             }
            })
    };
        const editClick=(cmp)=>{
            dispatch({
             type:'MODAL_TITLE_EDIT_COMPANY',
             payload:{
              ...state,
                 modalTitle:state.modalTitle,
                 companycreatedById:user._id,
                 companyId:cmp.companyId,
                 companyName:cmp.companyName,
                 companyAdress:cmp.companyAdress,
                 companyPhone:cmp.companyPhone,
                 companyWebsite:cmp.companyWebsite,
             }
            })
    };
    //    add Company 
        const handleCreate=()=>{
            axios.post(API_URL.ADDCOMPANY,{
                companyId:state.companyId,
                companycreatedById:user._id,
                companyName:state.companyName,
                companyAdress:state.companyAdress,
                companyPhone:state.companyPhone,
                companyWebsite:state.companyWebsite
                },
                {
                headers: {
                'x-auth-token': localStorage.getItem('token')
                }
                }
            ).then((res)=>{
                alert("The Company is successfully added!")
            window.location.reload();
            },(err)=>alert(`Error while Creating Company ${err.response.data.message}`))
   };
   //update Company
        const handleUpdate = (id) => {
               const cp =  company.find((cmp) =>      
                    cmp.companyId === id
                    );
                    if(cp){
                    axios
                    .put(`${API_URL.EDITCOMPANY}${cp._id}`, {
                        companyId:state.companyId,
                        companycreatedById:user._id,
                        companyName:state.companyName,
                        companyAdress:state.companyAdress,
                        companyPhone:state.companyPhone,
                        companyWebsite:state.companyWebsite,
                    },{
                        headers: {
                        'x-auth-token': localStorage.getItem('token')
                        }
                    }
                    )
                    .then(
                        (res) => {
                        alert("Company updated successfully!");
                        window.location.reload();
                        },
                        (err) => {
                        alert(`Error while updating the Company, please try again ${err.response.data.message}`);
                        }
                    )
                }
        };
    //delete Company
        const handleDelete = (id) => {
            if(window.confirm('Are you Sure you want to delete this Company ?')){
                axios
                .delete(`${API_URL.DELETECOMPANY}${id}`,{
                    headers: {
                    'x-auth-token': localStorage.getItem('token')
                    }
                })
                .then(
                    (res) => {
                    alert("Company deleted successfully!");
                    window.location.reload();
                    },
                    (err) => {
                    alert(`Error while deleting the Company, maybe incorrect id ! ${err.response.data.message}`);
                    }
                    );
                }
            };
    return (
        <div className="table-responsive navbarCustom">
          <NavBarAdmin />
          <h2 style={{textAlign:"center"}}>Companies Page</h2>
          {/* button to open modal window */}
          <button 
          type="button" 
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={()=>addClick()}>
            Add Company
          </button>
          
          <table className="table table-hover table-sm text-center">
            <thead className="bg-info">
              <tr>
                <th>company Name</th>
                <th>company Adress</th>
                <th>company Phone</th>
                <th>company Website</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {company.map((cmp) => (
                <tr key={cmp._id}>
                  <td data-title="Name">{cmp.companyName}</td>
                  <td data-title="Adress">{cmp.companyAdress}</td>
                  <td data-title="Phone">{cmp.companyPhone}</td>
                  <td data-title="Web Site">{cmp.companyWebsite}</td>
                  <td data-title="Action">
                    <button
                     data-bs-toggle="modal"
                     data-bs-target="#exampleModal"
                     onClick={()=>editClick(cmp)}
                      className="btn btn-sm shadow-lg rounded-pill text-decoration-none"
                    >
                      <span>
                        <i className="fa-sharp fa-solid fa-pen-to-square"
                          style={{ fontSize: "10px" }}></i>
                      </span>
                    </button>
                    <button className="btn btn-sm shadow-lg  rounded-pill ms-2"
                    onClick={()=>handleDelete(cmp._id)}>
                      <span>
                        <i  className="fa-sharp fa-solid fa-trash"
                          style={{ fontSize: "12px" }}></i>
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
                    aria-label="Close">
                  </button>
                </div>
                <div className="modal-body">

                  <div className="input-group mb-3">
                  <span className="input-group-text">company Name:</span>
                  <input 
                  type="text" 
                  className="form-control" 
                  value={state.companyName}
                  onChange={(e)=>dispatch({
                    type:'ADD_COMPANY',
                    payload:{
                      ...state,
                        companyName:e.target.value,
                    } || ""
                  })}/>
                  </div>

                  <div className="input-group mb-3">
                  <span className="input-group-text">company Adress:</span>
                  <input 
                  type="text" 
                  className="form-control" 
                  value={state.companyAdress}
                  onChange={(e)=>dispatch({
                    type:'ADD_COMPANY',
                    payload:{
                      ...state,
                        companyAdress:e.target.value,
                    } || ""
                  })}/>
                  </div>

                  <div className="input-group mb-3">
                  <span className="input-group-text">company Phone:</span>
                  <input 
                  type="number" 
                  className="form-control" 
                  value={state.companyPhone}
                  onChange={(e)=>dispatch({
                    type:'ADD_COMPANY',
                    payload:{
                      ...state,
                        companyPhone:e.target.value,
                    } || ""
                  })}/>
                  </div>

                  <div className="input-group mb-3">
                  <span className="input-group-text">company Website:</span>
                  <input 
                  type="text" 
                  className="form-control" 
                  value={state.companyWebsite}
                  onChange={(e)=>dispatch({
                    type:'ADD_COMPANY',
                    payload:{
                      ...state,
                        companyWebsite:e.target.value,
                    } || ""
                  })}/>
                  </div>

                    {/* button to update company  */}
    
                  {state.companyId!==0?
                <button type="button" className=" btn btn-primary float-start"
                  onClick={()=>handleUpdate(state.companyId)} 
                  > Update</button>
                     :null
                    }
                  {/* button to create new company  */}
                  {state.companyId===0?
                  <button type="button" className=" btn btn-primary float-start" 
                   onClick={handleCreate}> Create</button>
                     :null
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
};
