
import { AccountCircle, Report } from "@mui/icons-material";
import './Navbar.css'; 
import { IconButton } from "@mui/material";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src="/src/assets/logo_manager.png" alt="Logo" className="logo" />
        <div className="icon-buttons">
        <p>Welcome UserName</p>
          <IconButton>
            <AccountCircle />
          </IconButton>
          <IconButton>
            <Report />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
