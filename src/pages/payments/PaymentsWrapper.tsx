import React, { useState } from 'react';
import Paginator from '../../components/inventory/Paginator';
import PaymentViewModel from '../../components/payments/PaymentViewModel';
import {
  infoIcon,
  paymentFilterIcon,
  sortIcon,
} from '../../constants/imageConstants';

const PaymentsWrapper = () => {
  const [show, setShow] = useState(false);

  enum status {
    'Successful',
    'Outstanding',
    'Refunded',
  }
  const [transactionStatus, setTransactionStatus] = useState(status.Successful);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="tab-content col-md-10 p-0" id="nav-tabContent">
        <div
          className="tab-pane fade  show active"
          id="nav7"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <div className="orng-head oddrflx" onClick={handleShow}>
            <p>Payments</p>
          </div>

          <PaymentViewModel show={show} handleClose={handleClose} />
          <div className="col-md-12 whtbox">
            <div className="panel-box">
              <div className="deletes border-0 payments0">
                <div className="deletes-left payments1">
                  <div className="form-group row m-0">
                    <label htmlFor="staticEmail" className="col-form-label">
                      <img
                        src={paymentFilterIcon}
                        className="img-fluid"
                        alt="icon"
                      />{' '}
                    </label>
                    <div className="">
                      <select name="service" id="cars" className="form-control">
                        <option value="">Select</option>
                        <option value="">Books</option>
                        <option value="">Pooja Samagri</option>
                        <option value="">Gemstones</option>
                        <option value="">Yantras</option>
                        <option value="">Idols frames</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="payment-block">
                <div className="payment-block-content">
                  <h5>
                    Total Earned Amount <img src={infoIcon} alt="" />
                  </h5>
                  <h6>Rs. 84,574.00 </h6>
                </div>
                <div className="payment-block-content">
                  <h5>
                    Outstanding Amount{' '}
                    {/* <i className="fa fa-info-circle" aria-hidden="true"></i> */}
                    <img src={infoIcon} alt="" />
                  </h5>
                  <h6>Rs. 13,758.00 </h6>
                </div>
                <div className="payment-block-content">
                  <h5>
                    Amount Refunded <img src={infoIcon} alt="" />
                  </h5>
                  <h6>Rs. 6954.00 </h6>
                </div>
              </div>

              <div className="payment-success">
                <div
                  className="payment-success-content"
                  onClick={() => setTransactionStatus(status.Successful)}
                >
                  <h6
                    className={
                      transactionStatus === status.Successful ? 'active' : ''
                    }
                  >
                    Successful transactions{' '}
                  </h6>
                </div>
                <div
                  className="payment-success-content"
                  onClick={() => setTransactionStatus(status.Outstanding)}
                >
                  <h6
                    className={
                      transactionStatus === status.Outstanding ? 'active' : ''
                    }
                  >
                    Outstanding transactions{' '}
                  </h6>
                </div>
                <div
                  className="payment-success-content"
                  onClick={() => setTransactionStatus(status.Refunded)}
                >
                  <h6
                    className={
                      transactionStatus === status.Refunded ? 'active' : ''
                    }
                  >
                    Refunded transactions
                  </h6>
                </div>
              </div>

              <div className="deletes border-0">
                <div className="deletes-left inventoring1 payment11">
                  <div className="form-group row m-0">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Filter by:
                    </label>
                    <div className="">
                      <select name="service" id="cars" className="form-control">
                        <option value="">Select Duration</option>
                        <option value="">1 Day</option>
                        <option value="">2 Day</option>
                        <option value="">3 Day</option>
                        <option value="">4 Day</option>
                        <option value="">5 Day</option>
                      </select>
                    </div>
                    <input
                      type="date"
                      name=""
                      className="form-control"
                      placeholder="Start Date"
                    />
                    <input
                      type="date"
                      name=""
                      className="form-control"
                      placeholder="End Date"
                    />
                  </div>
                </div>
                <div className="deletes-right paymeeditbtn">
                  <input
                    type="button"
                    name=""
                    className="inventedit"
                    value="Reset"
                  />
                </div>
              </div>

              <div className="payment-download">
                <p>
                  <a href="">Download</a>
                </p>
              </div>

              <table className="table table-responsive table-striped table-hover table-bordered tbleorder">
                <tr>
                  <th>
                    Invoiced On <img src={sortIcon} className="img-fluid" />
                  </th>
                  <th>
                    Order ID <img src={sortIcon} className="img-fluid" />
                  </th>
                  <th>Transaction ID</th>
                  <th>
                    Order Amount (Rs.){' '}
                    <img src={sortIcon} className="img-fluid" />
                  </th>
                  <th>
                    My Earnings (Rs.){' '}
                    <img src={sortIcon} className="img-fluid" />
                  </th>
                  <th>Order Payment Mode</th>
                  <th>Invoice #</th>
                  <th>Action</th>
                </tr>

                {new Array(8).fill('_').map(() => {
                  return (
                    <tr>
                      <td>28-08-2022 |17.04 PM</td>
                      <td>0001</td>
                      <td>PP27901001</td>
                      <td>1200</td>
                      <td>1005</td>
                      <td>Prepaid</td>
                      <td>CG/08/22/00001</td>
                      <td
                        className="orgerns"
                        style={{ cursor: 'pointer' }}
                        onClick={handleShow}
                      >
                        View
                      </td>
                    </tr>
                  );
                })}
              </table>

              <Paginator />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentsWrapper;
