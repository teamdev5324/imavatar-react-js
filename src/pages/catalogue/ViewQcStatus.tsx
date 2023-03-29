import { NavLink } from "react-router-dom"
import { cancelling } from "../../constants/imageConstants"
import { ROUTER_URL_CONSTANT } from "../../constants/routerUriConstants"

const ViewQcStatus = () => {
    return (
        <>
            <div>
                <div className="catmainbulk pt-4 mt-4">
                    <h5><img src={cancelling} className="img-fluid" /> There are some errors in the listing. To rectify please click on 'correct error' to download the excel and correct the errors.</h5>
                    <table className="table table-responsive table-striped table-hover table-bordered tbleorder">
                        <tbody>
                            <tr>
                                <th>File ID </th>
                                <th>Created on </th>
                                <th>File status </th>
                                <th>File proceed on </th>
                                <th>Number of Products </th>
                                <th>Errors</th>
                            </tr>
                            <tr>
                                <td>ABCD12 </td>
                                <td>05-10-2022    |   02.00 PM </td>
                                <td> File uploaded successfully</td>
                                <td>05-10-2022    |   03:00 PM</td>
                                <td>30</td>
                                <td className="orgerns">
                                    <NavLink to={`/${ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT_BULK}/${ROUTER_URL_CONSTANT.CORRECT_ERRORS}`}>
                                        Correct  Errors
                                    </NavLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="payment-success pt-4">
                    <div className="payment-success-content">
                        <h6 className="active breeds4">View QC status </h6>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ViewQcStatus