import React from 'react';
import { invtImage, sortIcon } from '../../constants/imageConstants';
import Paginator from '../../components/inventory/Paginator';

const InventoryInactive = () => {
  return <>
    <div className="deletes border-0 inventoring0">
      <div className="deletes-left inventoring1">
        <div className="form-group row m-0">
          <label htmlFor="staticEmail" className="col-form-label">Filter by:</label>
          <div className="">
            <select name="service" id="cars" className="form-control" >
              <option value="">Select Category</option>
              <option value="">Books</option>
              <option value="">Pooja Samagri</option>
              <option value="">Gemstones</option>
              <option value="">Yantras</option>
              <option value="">Idols frames</option>
            </select>
          </div>
          <input type="button" name="" className="inventedit" value="Apply" />
          <input type="button" name="" className="inventedit" value="Reset" />
        </div>
      </div>
    </div>

    <table className="table table-responsive table-striped table-hover table-bordered tbleorder">
      <tr>
        <th>Category <img src={sortIcon} className="img-fluid" /></th>
        <th>IMA <span> SKU ID </span></th>
        <th>Partner <span> SKU ID </span></th>
        <th>Image</th>
        <th>HSN <span> Code </span></th>
        <th>Product <span> Name </span></th>
        <th>On-hand <span> Quantity </span> <img src={sortIcon} className="img-fluid" /></th>
        <th>In-Transit <span> Quantity </span> <img src={sortIcon} className="img-fluid" /></th>
        <th>On-Hand <span>Unit Cost </span></th>
        <th>Your Selling <span> Price</span> <img src={sortIcon} className="img-fluid" /></th>
        <th>Restock <span> Level</span></th>
        <th>Action</th>
        <th>Status</th>

      </tr>

      {new Array(10).fill("_").map(() => {
        return <tr>

          <td>Pooja Samagri</td>
          <td>Poo1XY66</td>
          <td>ABC123</td>
          <td>
            <img src={invtImage} className="img-fluid" />
          </td>
          <td>667546</td>
          <td>Agarbati</td>
          <td>102</td>
          <td>16</td>
          <td>200</td>
          <td>150</td>
          <td>40</td>
          <td className="bluedit"><a href=""> Edit </a></td>
          <td>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </td>
        </tr>
      })}
    </table>

    <Paginator />
  </>

}

export default  InventoryInactive