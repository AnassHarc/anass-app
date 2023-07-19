# Employee Management System
This is a web application for managing employees and Compnaies using the MERN stack (MongoDB, Express, React, Node.js) and Authentication and Authorization with JWT(jsonwebtoken)
# Features
- administrator space and employee space
- administrator features :
    - Add new Company
    - Delete existing Company
    - Update existing Company
    - Create new employees with profile photo and select there role ( admin or employee)
    - View employee details
    - Update employee details
    - Delete employees
    - send invitation via Email from administrator to join the app
- employee features :
    - Update profile
    - see information of employees of the same company
    - see information of company

# Prerequisites
- Node.js 
- MongoDB 

# Installation
- Clone the repository:
git clone "https://github.com/AnassHarc/anass-app"
- Install dependencies:
`npm install`
- Create a `.env` file and add your MongoDB connection URI:
     touch `.env`
    echo `MONGODB_URI`= <your-mongodb-uri>" "  `.env`

     Start the backend:
`npm run start`

  Start the frontend:
`npm run start`

# Screenshots
<strong>Home page</strong>
  <img src="Backend/public/images/HomePage.png" alt="">

<strong> Registeration page</strong>
 <img src="Backend/public/images/register.png" alt="">

<strong>Login page</strong>
  <img src="Backend/public/images/login.png" alt="">

<strong>Companies</strong>
  <img src="Backend/public/images/addCompany.png" alt="">
  <img src="Backend/public/images/companiestabel.png" alt="">
  <img src="Backend/public/images/editCompany.png" alt="">

<strong>Employees</strong>
 <img src="Backend/public/images/addemployee.png" alt="">
 <img src="Backend/public/images/editEmployee.png" alt="">
 <img src="Backend/public/images/employeestable.png" alt="">

<strong>Edit admin Profil</strong>
<img src="Backend/public/images/editprofiladmin.png" alt="">

<strong>History Repport</strong>
 <img src="Backend/public/images/historyreportTable.png" alt="">

<strong>Employee profil</strong>
 <img src="Backend/public/images/editprofilemployee.png" alt="">

<strong>Employee info</strong>
 <img src="Backend/public/images/employeesinfo.png" alt="">

<strong>Company info</strong>
 <img src="Backend/public/images/companyInfo.png" alt="">