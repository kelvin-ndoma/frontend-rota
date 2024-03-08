import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Events from "./Events";
import Register from "./Register";
import Mark from "./Mark";
import All from './All';


const Admindashboard = ({ user }) => {
 

  return (
    <div>
      <h2>Welcome, {user.first_name}!</h2>
      <Events user={user} /> 
      <Mark user={user}/>
      <Register user={user} />
      <All user={user} />
    </div>
  );
};

export default Admindashboard;
