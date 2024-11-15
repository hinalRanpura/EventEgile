import { Fragment, useState } from 'react';
import "./Header.css"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import DashboardIcon from "@material-ui/icons/Dashboard"
import ListAltIcon from "@material-ui/icons/Event"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Backdrop from "@material-ui/core/Backdrop"
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import { logout } from "../../../actions/userAction"
import { useDispatch } from 'react-redux';
import CartIcon from "@material-ui/icons/EventAvailableSharp"
function UserOptions({ user }) {

  const alert = useAlert();

  const history = useHistory();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: "Your Events", func: events },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <CartIcon />, name: "Selected Events", func: cart },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },

  ]

  if (user.role === 'admin') {
    options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: adminDashboard })
  }

  if (user.role === 'manager') {
    options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: managerDashboard })
  }

  function adminDashboard() {
    history.push("/admin/dashboard");
  }

  function managerDashboard() {
    history.push("/manager/dashboard");
  }

  function cart() {
    history.push("/select/my");
  }
  
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  function events() {
    history.push("/events");
  }

  function account() {
    history.push("/account");
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex: "10"}}/>
      <SpeedDial
        ariaLabel='Speeddial tool kit'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        style={{zIndex:"11"}}
        className='speedDial'
        icon={
          <img
            className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url : require("../../../assets/Profile.png")}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
        ))}
      </SpeedDial>
    </Fragment>
  )
};

export default UserOptions;
