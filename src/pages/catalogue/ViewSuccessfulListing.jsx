import { useEffect, useState } from "react"
import { Navigate, NavLink, useNavigate } from "react-router-dom"
import { ROUTER_URL_CONSTANT } from "../../constants/routerUriConstants";
import groupBy from 'lodash.groupby';
import axios from "axios";
import moment from "moment";
import { saveAs } from 'file-saver';

const ViewQcStatus = () => {

    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://18.234.206.45:8085/api/v1/partner/product/qc?uploadType=BULK&status=PASS',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        };

        axios.request(config)
            .then((res) => {
                res = res.data.results;
                console.clear();
                console.log(res);
                res = groupBy(res, 'fileId');
                res = Object.values(res);
                console.clear();
                console.log(res);
                setData(res);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const download = (fileId) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://18.234.206.45:8085/api/v1/files/download/' + fileId,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        axios.request(config)
            .then((res) => {
                res = res.data.results;
                saveAs(res.url, res.filename);
                console.log(res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <>
            {data && (
                <div>
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
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item[0].fileId}</td>
                                        <td>{moment(item[0].createdDate).format('DD-MM-YYYY')}    |   {moment(item[0].createdDate).format('hh.mm a')}</td>
                                        <td> File uploaded successfully</td>
                                        <td>{moment(item[0].updatedDate).format('DD-MM-YYYY')}    |   {moment(item[0].updatedDate).format('hh.mm a')}</td>
                                        <td>{data[0].length}</td>
                                        <td className="orgerns">
                                            <div onClick={() => {
                                                download(item[0].fileId);
                                            }}>
                                                Download
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default ViewQcStatus;