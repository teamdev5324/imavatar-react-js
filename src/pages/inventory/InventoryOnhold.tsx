import React from 'react';
import { invtImage, sortIcon } from '../../constants/imageConstants';
import Paginator from '../../components/inventory/Paginator';

const InventoryOnhold = () => {
  return (
    <>

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
          <th>Sr. No.</th>
          <th>Category <img src={sortIcon} className="img-fluid" /></th>
          <th>Product <span> Name </span></th>
          <th>Image</th>
          <th>HSN <span> Code </span></th>
          <th>Partner <span> SKU ID </span></th>
          <th>On-hand <span> Quantity </span> <img src={sortIcon} className="img-fluid" /></th>
          <th>On-Hand <span>Unit Cost </span></th>
          <th>Your Selling <span> Price</span> <img src={sortIcon} className="img-fluid" /></th>
          <th>Restock <span> Level</span></th>
          <th>Action</th>
          <th>On-hold Reason</th>

        </tr>

        {new Array(10).fill("_").map(() => {
          return <tr>

            <td> #0001</td>
            <td>Pooja Samagri</td>
            <td>Agarbati</td>
            <td><img src={invtImage} className="img-fluid" /></td>
            <td>667546</td>
            <td>ABC123</td>
            <td>102</td>
            <td> 200.00</td>
            <td>150</td>
            <td>40</td>
            <td className="orgerns"><a href=""> Edit </a></td>
            <td>Poor Quality image</td>
          </tr>
        })}
      </table>

      <Paginator />
    </>
  );
}

export default InventoryOnhold;