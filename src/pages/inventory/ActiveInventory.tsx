import React from 'react';
import { invtImage, sortIcon } from '../../constants/imageConstants';
import Paginator from '../../components/inventory/Paginator';

const ActiveInventory = () => {
  return (
    <>
      <div className="deletes border-0 inventoring0">
        <div className="deletes-left inventoring1">
          <div className="form-group row m-0">
            <label htmlFor="staticEmail" className="col-form-label"
            >Filter by:</label
            >
            <div className="">
              <select
                name="service"
                id="cars"
                className="form-control"

              >
                <option value="">Select Category</option>
                <option value="">Books</option>
                <option value="">Pooja Samagri</option>
                <option value="">Gemstones</option>
                <option value="">Yantras</option>
                <option value="">Idols frames</option>
              </select>
            </div>
            <input
              type="button"
              name=""
              className="inventedit"
              value="Apply"
            />
            <input
              type="button"
              name=""
              className="inventedit"
              value="Reset"
            />
          </div>
        </div>
        <div className="deletes-right inventoring2">
          <h4><a href="inventory/activeInventory" className="active">All Stock (0) </a></h4>
          <h4><a href="inventory/activeInventory"> Out of stock (0)</a></h4>
          <h4><a href="inventory/activeInventory">Low Stock (0) </a></h4>
        </div>
      </div>
      <table
        className="table table-responsive table-striped table-hover table-bordered tbleorder"
      >
        <tr>
          <th>
            Category <img src={sortIcon} className="img-fluid" />
          </th>
          <th>IMA <span>SKU ID </span></th>
          <th>Partner <span> SKU ID </span></th>
          <th>Image</th>
          <th>HSN <span> Code </span></th>
          <th>Product <span> Name </span></th>
          <th>
            On-hand <span> Quantity </span>
            <img src={sortIcon} className="img-fluid" />
          </th>

          <th>In-Transit <span> Quantity </span></th>
          <th>On-Hand <span>Unit Cost </span></th>

          <th>
            Your Selling <span> Price</span>
            <img src={sortIcon} className="img-fluid" />
          </th>
          <th>Restock <span> Level</span></th>
          <th>Action</th>
          <th>Status</th>
        </tr>

        {new Array(10).fill("_").map((d, i) => {
          return <tr>
            <td>Pooja Samagri</td>
            <td>Poo1XY66</td>
            <td>ABC123</td>
            <td>
              <img src={invtImage} className="img-fluid" />
            </td>
            <td>667546</td>
            <td>Agarbati</td>
            <td>
              <div className="quantity">
                <a href="inventory/activeInventory#" className="quantity__minus"
                ><span>-</span></a
                >
                <input
                  name="quantity"
                  type="text"
                  className="quantity__input"
                  value="102"
                />
                <a href="inventory/activeInventory#" className="quantity__plus"
                ><span>+</span></a
                >
              </div>
            </td>
            <td>16</td>

            <td>200.00</td>
            <td>150</td>
            <td>
              <div className="quantity">
                <a href="inventory/activeInventory#" className="quantity__minus"
                ><span>-</span></a
                >
                <input
                  name="quantity"
                  type="text"
                  className="quantity__input"
                  value="40"
                />
                <a href="inventory/activeInventory#" className="quantity__plus"
                ><span>+</span></a
                >
              </div>
            </td>
            <td className="orgerns"><a href="inventory/activeInventory">Edit </a></td>
            <td>
              <label className="switch">
                <input type="checkbox" checked />
                <span className="slider round"></span>
              </label>
            </td>
          </tr>
        })}


      </table>

      <Paginator />
    </>
  )
}


export default ActiveInventory;