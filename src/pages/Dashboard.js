import { useState, useCallback } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const { user: currentUser } = useSelector((state) => {
    return state.authReducer;
  });

  const onLogOut = useCallback(async () => {
    await dispatch(logout(currentUser.token));
    navigate("/login");
  }, [currentUser.token, dispatch, navigate]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <ul className="d-flex justify-content-end">
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle nav caret>
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  class="rounded-circle"
                  height="25"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </DropdownToggle>
              <DropdownMenu className="mt-1">
                <DropdownItem onClick={() => onLogOut()}>Log out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col w-75 vh-100 m-auto text-start d-flex flex-column justify-content-center align-items-center">
          <div className="w-100">
            <h4>Welcome to Demo App</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
