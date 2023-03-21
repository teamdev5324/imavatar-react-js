import React from 'react';
import Paginator from '../../components/inventory/Paginator';
import { sortIcon } from '../../constants/imageConstants';

const Delivered = () => {
  return (
    <>
      <table className="table table-responsive table-striped table-hover table-bordered tbleorder">
        <tr>
          <th>
            Order <span> ID </span>
            <img src={sortIcon} className="img-fluid" alt="icon" />
          </th>
          <th>
            IMA <span>SKU ID </span>
            <img src={sortIcon} className="img-fluid" alt="icon" />
          </th>
          <th>
            Partner <span> SKU ID </span>
            <img src={sortIcon} className="img-fluid" alt="icon" />
          </th>
          <th>
            Order <span> Date </span>
            <img src={sortIcon} className="img-fluid" alt="icon" />
          </th>
          <th>
            Product <span> Title </span>
            <img src={sortIcon} className="img-fluid" alt="icon" />
          </th>
          <th>
            Order <span> Quantity </span>
            <img src={sortIcon} className="img-fluid" alt="icon" />
          </th>
          <th>
            Order <span> Amount </span>
            <img src={sortIcon} className="img-fluid" alt="icon" />
          </th>
          <th>
            Expected <span> Delivery Date</span>
            <img src={sortIcon} className="img-fluid" alt="icon" />
          </th>
          <th>
            Buyer <span> Details</span>
          </th>
          <th>
            Tracking <span> ID </span>
          </th>
          <th>
            Dispatch <span>Date Time</span>
            <img src={sortIcon} className="img-fluid" alt="icon" />
          </th>
        </tr>

        {new Array(10).fill('_').map((d, i) => (
          <tr>
            <td>#000{i + 1} </td>
            <td>P0077890 </td>
            <td> 60015</td>
            <td>28-06-2022 </td>
            <td>6 Inch Metal Ganesha idol </td>
            <td>2.00 </td>
            <td>Rs. 1200 </td>
            <td>03-07-2022 </td>
            <td>Prashant Thakare Mumbai, MH </td>
            <td>SR10012 </td>
            <td>29-06-2022 18:00 PM </td>
          </tr>
        ))}
      </table>
      <Paginator />
    </>
  );
};

export default Delivered;
