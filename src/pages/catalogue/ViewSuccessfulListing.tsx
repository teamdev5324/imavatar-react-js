import { excelFileUrl } from "../../constants/apiUrlConstant"
import { downloadFile } from "../../utils/helpers"

const ViewSuccessfulListing = () => {
    return (
        <div className="catmainbulk pt-4 mt-4">
            <table className="table table-responsive table-striped table-hover table-bordered tbleorder">
                <tbody>
                    <tr>
                        <th>File ID </th>
                        <th>Created on </th>
                        <th>File status </th>
                        <th>File proceed on </th>
                        <th>Number of Products </th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>ABCD12 </td>
                        <td>05-10-2022    |   02.00 PM </td>
                        <td> File uploaded successfully</td>
                        <td>05-10-2022    |   03:00 PM</td>
                        <td>30</td>
                        <td className="orgerns" onClick={() => downloadFile(excelFileUrl, "LDMS0007.xlsx")} >Download</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ViewSuccessfulListing