import React from 'react';
import Events from "./Events";
import Mark from "./Mark";
// import All from './All';

const Admindashboard = ({ user }) => {
  return (
    <div>
      <h2>Welcome, {user.first_name}!</h2>
      <Events user={user} /> 
      <Mark user={user}/>
      {/* <All user={user} /> */}
    </div>
  );
};

export default Admindashboard;
