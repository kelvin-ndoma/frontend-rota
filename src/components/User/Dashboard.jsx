import Myattendance from "./Myattendance";
import Userevents from "./Userevents";

const Dashboard = ({ user }) => {
  return (
    <div>
      <h2>Hello {user.first_name}</h2>
      {/* <Userevents user={user} /> */}
      <Myattendance user={user}/>
    </div>
  );
};

export default Dashboard;
