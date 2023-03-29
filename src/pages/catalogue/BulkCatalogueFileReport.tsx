const BulkCatalogueFileReport = () => {
    return (
        <>
            <div className="catmainbulk pt-4 mt-4">
                <table className="table table-responsive table-striped table-hover table-bordered tbleorder">
                    <tbody>
                        <tr>
                            <th>File ID </th>
                            <th>File uploaded on </th>
                            <th>File status </th>
                            <th>Number of Products </th>
                            <th>Errors </th>
                        </tr>
                        <tr>
                            <td>ABCD12 </td>
                            <td>05-10-2022    |   02.00 PM </td>
                            <td> File uploaded successfully</td>
                            <td> 30</td>
                            <td>No </td>
                        </tr>
                    </tbody>
                </table>
                <div className="payment-success pt-4">
                    <div className="payment-success-content">
                        <h6 className="active breeds4">View QC status </h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BulkCatalogueFileReport