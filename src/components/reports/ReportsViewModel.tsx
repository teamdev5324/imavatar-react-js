import React, { useEffect, useState } from 'react';
import {
  activeRatingIcon,
  desableRatingIcon,
} from '../../constants/imageConstants';
import ViewModel from '../Model/ViewModel';

interface ReportsViewModelProps {
  show: boolean;

  handleClose: () => void;
}

const ReportsViewModel: React.FC<ReportsViewModelProps> = ({
  show,
  handleClose,
}) => {
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    setShowModel(show);
  }, [show]);

  return (
    <ViewModel show={showModel}>
      <div className="modal-content reprter8">
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          onClick={() => setShowModel(false)}
        >
          X
        </button>

        <div className="modal-body">
          <div className="mid-content">
            <table className="table table-responsive tblereport">
              <tbody>
                <tr>
                  <th>Sr. No. </th>
                  <th>Category </th>
                  <th>Product Title </th>
                  <th> Average Ratings</th>
                  <th>Ratings</th>
                  <th className="rws70">Reviews</th>
                  <th>Order ID</th>
                </tr>
                <tr>
                  <td>1 </td>
                  <td>Yantras </td>
                  <td>Evil locket </td>
                  <td>3 </td>
                  <td>
                    <div className="yantrastar">
                      <img src={activeRatingIcon} className="img-fluid" />
                      <img src={activeRatingIcon} className="img-fluid" />
                      <img src={activeRatingIcon} className="img-fluid" />
                      <img src={activeRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                    </div>
                    <div className="yantrastar">
                      <img src={activeRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                    </div>
                  </td>
                  <td className="blopquer">
                    <p>Quality of locket is ordinary</p>{' '}
                    <p> This is really a good product</p>{' '}
                  </td>
                  <td>10001 </td>
                </tr>
                <tr>
                  <td>1 </td>
                  <td>Yantras </td>
                  <td>Evil locket </td>
                  <td>3 </td>
                  <td>
                    <div className="yantrastar">
                      <img src={activeRatingIcon} className="img-fluid" />
                      <img src={activeRatingIcon} className="img-fluid" />
                      <img src={activeRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                    </div>
                    <div className="yantrastar">
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                    </div>
                    <div className="yantrastar">
                      <img src={activeRatingIcon} className="img-fluid" />
                      <img src={activeRatingIcon} className="img-fluid" />
                      <img src={activeRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                    </div>
                    <div className="yantrastar">
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                      <img src={desableRatingIcon} className="img-fluid" />
                    </div>
                  </td>
                  <td className="blopquer">
                    <p>The wooden frame quality was very bad</p>{' '}
                    <p>Quality of locket is ordinary</p>{' '}
                    <p>This is really a good product</p>{' '}
                    <p> The wooden frame quality was very bad</p>{' '}
                  </td>
                  <td>10001 </td>
                </tr>
              </tbody>
            </table>
            <div className="deletes border-0 reporter6 p-0">
              <div className="deletes-left reporter3">
                <div className="form-group row m-0">
                  <input
                    type="button"
                    name=""
                    className="inventedit2"
                    value="Download"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewModel>
  );
};

export default ReportsViewModel;
