import { cancelling } from "../../constants/imageConstants"

const CorrectErrors = () => {
    return (
        <>
            <div>
                <div className="catmainbulk pt-4 mt-4">
                    <h5><img src={cancelling} className="img-fluid" />There are some errors in the listing. To rectify please click on 'edit' and correct the fields wherever necessary.</h5>
                    <table className="table table-responsive table-striped table-hover table-bordered tbleorder">
                        <tbody>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Product Name</th>
                                <th>Product Title </th>
                                <th>Error</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Rudraksha </td>
                                <td> 9 Mukhi Rudraksha (Nepal)</td>
                                <td>Yes</td>
                                <td className="orgerns">Edit</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Rudraksha </td>
                                <td> 9 Mukhi Rudraksha (Nepal)</td>
                                <td>Yes</td>
                                <td className="orgerns">Edit</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Rudraksha </td>
                                <td> 9 Mukhi Rudraksha (Nepal)</td>
                                <td>No</td>
                                <td>----</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Rudraksha </td>
                                <td> 9 Mukhi Rudraksha (Nepal)</td>
                                <td>No</td>
                                <td>----</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Rudraksha </td>
                                <td> 9 Mukhi Rudraksha (Nepal)</td>
                                <td>No</td>
                                <td>----</td>
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

export default CorrectErrors