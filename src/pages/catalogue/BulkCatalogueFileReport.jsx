import { useState, useEffect } from "react";
import moment from 'moment';
import { cancelling } from "../../constants/imageConstants";
import axios from "axios";

const BulkCatalogueFileReport = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('bulkFileData')));
    }, []);
    console.log(JSON.parse(localStorage.getItem('bulkFileData')));

    const handleDownload = async () => {
        console.log(data.documentId);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://18.234.206.45:8085/api/v1/files/download/' + data.documentId,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        };

        let res = await axios.request(config);
        res = res.data.results;
        console.log(res);
        window.open(res.url);
    }

    return (
        <>
            {data && (
                <div className="catmainbulk pt-4 mt-4">
                    {data.status === 'FAILED' && <h5><img src={cancelling} className="img-fluid" /> There are some errors in the listing. To rectify please click on 'correct error' to download the excel and correct the errors.</h5>}
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
                                <td onClick={handleDownload} style={{ cursor: 'pointer' }}>{data.documentId}</td>
                                {/* <td>05-10-2022    |   02.00 PM </td> */}
                                <td>{moment(data.createdDate).format('DD-MM-YYYY')}    |   {moment(data.createdDate).format('hh.mm a')} </td>
                                <td> File uploaded successfully</td>
                                <td>{data.numberOfProducts}</td>
                                <td>{data.status === 'FAILED' ? 'Yes' : 'No'}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="payment-success pt-4">
                        <div className="payment-success-content">
                            <h6 className="active breeds4">View QC status </h6>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default BulkCatalogueFileReport