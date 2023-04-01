import { useEffect, useState } from "react"
import { Navigate, NavLink, useNavigate } from "react-router-dom"
import { ROUTER_URL_CONSTANT } from "../../constants/routerUriConstants";
import groupBy from 'lodash.groupby';
import axios from "axios";
import moment from "moment";

const ViewQcStatus = () => {

    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://18.234.206.45:8085/api/v1/partner/product/qc?uploadType=BULK',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        };

        axios.request(config)
            .then((res) => {
                res = res.data.results;
                res = groupBy(res, 'fileId');
                res = Object.values(res);
                console.log(res);
                localStorage.setItem('qcStatus', JSON.stringify(res));
                setData(res);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

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
                                    <th>Errors</th>
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
                                                if (item[0].qcstatus !== 'PENDING' && item[0].qcstatus !== 'DRAFT' && item[0].qcstatus !== 'PASS') {
                                                    navigate(`/${ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT_BULK}/${ROUTER_URL_CONSTANT.CORRECT_ERRORS}/${index}`);
                                                };
                                            }}>
                                                {item[0].qcstatus === 'PENDING' || item[0].qcstatus === 'DRAFT' || item[0].qcstatus === 'PASS' ? 'No' : 'Yes, correct error'}
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

export default ViewQcStatus