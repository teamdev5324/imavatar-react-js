import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { cancelling } from "../../constants/imageConstants";
import axios from "axios";

const CorrectErrors = () => {

    const [data, setData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const lcData = JSON.parse(localStorage.getItem('qcStatus'))[id];

        const ids = [];

        lcData.forEach((item, index) => {
            ids[index] = item.id;
        });

        console.log(ids);

        ids.forEach(async (item, index) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://18.234.206.45:8085/api/v1/partner/product/qc/product/' + item,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            };

            axios.request(config)
                .then((res) => {
                    // console.log(JSON.stringify(response.data));
                    res = res.data.results;
                    console.clear();
                    console.log(res);
                    setData(prevdata => ([...prevdata, ...[res]]));
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        // console.log(JSON.parse(localStorage.getItem('qcStatus'))[id]);
    }, []);

    useEffect(() => {
        console.clear();
        console.log(data);
    }, [data]);

    return (
        <>
            {data && (
                <div>
                    <div className="catmainbulk pt-4 mt-4">
                        {/* <h5><img src={cancelling} className="img-fluid" />There are some errors in the listing. To rectify please click on 'edit' and correct the fields wherever necessary.</h5> */}
                        <table className="table table-responsive table-striped table-hover table-bordered tbleorder">
                            <tbody>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Product Name</th>
                                    <th>Product Title </th>
                                    <th>Error</th>
                                    <th>Action</th>
                                </tr>
                                {data.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.productInfo.productName}</td>
                                        <td>{item.productInfo.productTitle}</td>
                                        <td>{item.status !== 'DRAFT' && item.status !== 'ACTIVE' && item.status !== 'INACTIVE' && item.status !== 'PENDING' ? 'Yes' : 'No'}</td>
                                        <td className={item.status !== 'DRAFT' && item.status !== 'ACTIVE' && item.status !== 'INACTIVE' && item.status !== 'PENDING' ? 'orgerns' : null}>{item.status !== 'DRAFT' && item.status !== 'ACTIVE' && item.status !== 'INACTIVE' && item.status !== 'PENDING' ? 'Edit' : '----'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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

export default CorrectErrors