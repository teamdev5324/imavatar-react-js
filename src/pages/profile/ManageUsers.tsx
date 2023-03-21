import axios from 'axios';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ViewModel from '../../components/Model/ViewModel';
import ManageUserCard from '../../components/profile/ManageUserCard';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstant';
import { postReqParamheader } from '../../services/apiCall';
import { profileSelectors } from '../../store/profile';
import { encryptPassword } from '../authentication/helper/encryption';
export const ManageUsers = () => {
  const profileState = useSelector(profileSelectors.getProfileState);

  const [deleteModel, setDeleteModel] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({
    userType: '6',
    phoneNumber: '',
    email: '',
    active: 'true',
    firstName: '',
    role: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addUserHandler = () => {
    console.log('Hellow');

    let params = {
      userType: '6',
      phoneNumber: user.phoneNumber,
      email: user.email,
      active: 'true',
      role: user.role,
      firstName: user.firstName,
      userId: profileState.userId,
      powId: encryptPassword(profileState.user?.id.toString(), 'imavatar'),
    };

    console.log(params);

    postReqParamheader(API_URL_CONSTANTS.ADD_USER, params).then((response) => {
      console.log(response.data);
    });
  };

  // const addNewUserHandler = () => {
  //   axios.post
  // };
  const delteAccountModel = () => (
    <ViewModel show={deleteModel}>
      <div className="mid-content medcont2">
        <button type="button" className="close" data-dismiss="modal">
          &times;
        </button>
        <div className="col-md-12 p-0">
          <div className="feed-forms">
            <form>
              <div className="form-group row">
                <h6 className="ligals">Legal terms for deleting account</h6>
              </div>

              <div className="form-group row mb-4">
                <label htmlFor="staticEmail" className="col-sm-5">
                  Reason for deleting account
                </label>
                <div className="col-sm-5">
                  <select
                    name="service"
                    id="cars"
                    className="form-control ftos"
                  >
                    <option value="">Select</option>
                    <option value="">Operations Manage</option>
                    <option value="">Catalog Manager</option>
                    <option value="">Finance Manager</option>
                    <option value="">Partner Admin</option>
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 checkinj">
                  <input
                    id="checkbox"
                    type="checkbox"
                    // style="margin-right: 10px; width: 18px; height: 18px"
                    style={{
                      marginRight: '10px',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                  <label htmlFor="checkbox">
                    Are you sure you want delete the account ?
                  </label>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 checkinj">
                  <input
                    id="checkbox"
                    type="checkbox"
                    // style="margin-right: 10px; width: 18px; height: 18px"
                    style={{
                      marginRight: '10px',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                  <label htmlFor="checkbox">
                    I have read the terms and wish to continue with deletion of
                    the account
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-12 editers1">
          <input type="button" name="" className="edit5" value="Send Request" />
          <input type="button" name="" className="edit5" value="Not Now" />
        </div>
      </div>
    </ViewModel>
  );
  const addNewUserModel = () => (
    <ViewModel show={newUser}>
      <div className="mid-content medcont2">
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          onClick={() => setNewUser(false)}
        >
          &times;
        </button>
        <h3>Add New User</h3>

        <div className="col-md-12 p-0">
          <div className="feed-forms">
            <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-3 col-form-label"
                >
                  Role
                </label>
                <div className="col-sm-9">
                  <select
                    name="service"
                    id="cars"
                    className="form-control fts"
                    value={user.role}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setUser((prevState) => ({
                        ...prevState,
                        role: e.target.value,
                      }));
                    }}
                  >
                    <option value="">Select</option>
                    <option value="Operations Manage">Operations Manage</option>
                    <option value="Catalog Manager">Catalog Manager</option>
                    <option value="Finance Manager">Finance Manager</option>
                    <option value="Partner Admin">Partner Admin</option>
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-3 col-form-label"
                >
                  Name:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-3 col-form-label"
                >
                  Email:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-3 col-form-label"
                >
                  Mobile No:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <p className="gret">
                    Please ensure that the Email ID and Mobile entered are valid
                    and correct as the notifications will be sent to user for
                    authentication
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-12 editers1">
          <input
            type="button"
            name=""
            className="edit5"
            value="Save"
            onClick={addUserHandler}
          />
          <input
            type="button"
            name=""
            className="edit5"
            value="Cancel"
            onClick={() => setNewUser(false)}
          />
        </div>
      </div>
    </ViewModel>
  );
  const newModel = () => (
    <ViewModel show={false}>
      <div className="mid-content medcont2">
        <button type="button" className="close" data-dismiss="modal">
          &times;
        </button>
        <Table className="table table-responsive table-bordered">
          <tr>
            <th colSpan={2}>Label Details</th>
            {/* <th>Label Details</th> */}
          </tr>

          <tr>
            <td className="w-50 font-wght1">
              <p className="w-50">Product Title</p>
              <p className="w-50">6 Inch metal Ganpati Idol</p>
            </td>
            <td className="w-50"></td>
          </tr>

          <tr>
            <th className="w-50">Order Details</th>
            <th className="w-50">Buyer Details</th>
          </tr>

          <tr>
            <td className="w-50 font-wght">
              <p>Order Date</p>
              <p className="gritcls">28-06-2022</p>
              <p>Order ID</p>
              <p className="gritcls">#0001</p>
              <p>IMA SKU ID</p>
              <p className="gritcls">Poo77890</p>
              <p>Partner SKU ID</p>
              <p className="gritcls">60015</p>
              <p>Order Quantity</p>
              <p className="gritcls">2</p>
            </td>
            <td className="w-50 font-wght">
              <p className="gritcls w-100">Prashant Thakare</p>
              <p className="gritcls w-100">Mumbai</p>
              <p className="gritcls w-100">Maharashtra - 400001</p>
            </td>
          </tr>
        </Table>

        <table className="table table-responsive table-bordered">
          <tr>
            <th colSpan={3}>Invoice Details</th>
            {/* <th>Invoice Details</th> */}
          </tr>

          <tr>
            <td className="w-33 font-wght1">
              <p>Invoice Amount</p>
            </td>
            <td className="w-33 font-wght1">
              <p>Invoice Date</p>
            </td>
            <td className="w-33 font-wght1">
              <p>Grand Total</p>
            </td>
          </tr>

          <tr>
            <td className="w-33 font-wght1">
              <p className="gritcls">1200</p>
            </td>
            <td className="w-33 font-wght1">
              <p className="gritcls">28-06-2022</p>
            </td>
            <td className="w-33 font-wght1">
              <p className="gritcls">GG67556</p>
            </td>
          </tr>
        </table>

        <table className="table table-responsive table-bordered">
          <tr>
            <th>Packaging details for order</th>
          </tr>
          <tr>
            <th colSpan={5}>Packaging Details</th>
            {/* <th>Packaging Details</th> */}
          </tr>

          <tr>
            <td className="font-wght1">
              <p>Length ( cmc )</p>
            </td>
            <td className="font-wght1">
              <p>Breadth ( cmc )</p>
            </td>
            <td className="font-wght1">
              <p>Height ( cmc )</p>
            </td>
            <td className="font-wght1">
              <p>Weight ( kg )</p>
            </td>
            <td className="font-wght1">
              <p>Weight ( kg )</p>
            </td>
          </tr>

          <tr>
            <td className="font-wght1">
              <p className="gritcls">15</p>
            </td>
            <td className="font-wght1">
              <p className="gritcls">22</p>
            </td>
            <td className="font-wght1">
              <p className="gritcls">17</p>
            </td>
            <td className="font-wght1">
              <p className="gritcls">13</p>
            </td>
            <td className="font-wght1">
              <p className="gritcls">0.2</p>
            </td>
          </tr>
        </table>

        <div className="col-md-12 editers1 p-0">
          <input type="button" name="" className="edit5" value="Go Back" />
          <input
            type="button"
            name=""
            className="edit5"
            value="Download & Print"
          />
        </div>
      </div>
    </ViewModel>
  );
  return (
    <div className="panel_form">
      <div className="panel-new-head">
        <h3 className="">Manage Users </h3>
        <button
          type="button"
          className="addnew"
          data-toggle="modal"
          data-target="#myModal15"
          onClick={() => setNewUser(true)}
        >
          Add New User
        </button>
      </div>
      {delteAccountModel()}
      {addNewUserModel()}
      {newModel()}
      <ManageUserCard
        email="suraj.acharya@gmail.com"
        name="Suraj Acharya"
        phone="8790345278"
        role="Catalog Manager"
      />
      <ManageUserCard
        email="suraj.acharya@gmail.com"
        name="Suraj Acharya"
        phone="8790345278"
        role="Catalog Manager"
      />
      <ManageUserCard
        email="suraj.acharya@gmail.com"
        name="Suraj Acharya"
        phone="8790345278"
        role="Catalog Manager"
      />
      <ManageUserCard
        email="suraj.acharya@gmail.com"
        name="Suraj Acharya"
        phone="8790345278"
        role="Catalog Manager"
      />
      <ManageUserCard
        email="suraj.acharya@gmail.com"
        name="Suraj Acharya"
        phone="8790345278"
        role="Catalog Manager"
      />
    </div>
  );
};
