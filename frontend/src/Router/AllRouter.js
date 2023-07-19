import {createBrowserRouter,RouterProvider } from 'react-router-dom';
import {CompaniesPage} from '../Component/CompanyPortal/Companies';
import { HomePage } from '../Component/HomePage';
import { EmployeesPage } from '../Component/CompanyPortal/Employees';
import { HistoryReport } from '../Component/CompanyPortal/HistoryReport';
import { EditProfile } from '../Component/CompanyPortal/EditProfile';
import { EditEmployeeProfile } from '../Component/EmployeePortal/EditEmployeeProfile';
import { EmployeesInfo } from '../Component/EmployeePortal/EmployeesInfo';
import { CompanyInfo } from '../Component/EmployeePortal/CompanyInfo';

export const AllRouter =()=> {
    const router = createBrowserRouter([
        {
            path:'/',
            element:<HomePage />
        },

        {
            path:'/companies',
            element:
            localStorage.getItem('token') && <CompaniesPage />
        },

        {
            path:'/employees',
            element:
            localStorage.getItem('token') && <EmployeesPage />
        },

        {
            path:'/editProfile',
            element:
            localStorage.getItem('token') && <EditProfile />
        },

        {
            path:'/historyreport',
            element:
            localStorage.getItem('token') && <HistoryReport />
        },

        {
            path:'/editEmployeeProfile',
            element:
            localStorage.getItem('token') && <EditEmployeeProfile />
        },

        {
            path:'/employeesInfo',
            element:
            localStorage.getItem('token') && <EmployeesInfo />
        },

        {
            path:'/companyInfo',
            element:
            localStorage.getItem('token') && <CompanyInfo />
        },



      ])
      return  <RouterProvider router={router} />
      }