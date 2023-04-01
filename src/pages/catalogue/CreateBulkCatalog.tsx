import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { excelFileUrl } from "../../constants/apiUrlConstant"
import { cloud, cloudOpposite } from "../../constants/imageConstants"
import { ROUTER_URL_CONSTANT } from "../../constants/routerUriConstants"
import { downloadFile } from "../../utils/helpers";
import axios from "axios";
import { saveAs } from 'file-saver';

const CreateBulkCatalog = () => {
    const [filePath, setFilePath] = useState("");
    const [cat___, setCat___] = useState(null);
    const navigate = useNavigate();

    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let res: any = null;
            reader.onload = function () {
                resolve(reader.result)
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        })
    };

    const uploadFile = async () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = ".xlsx"
        input.onchange = async (e: any) => {
            // setFilePath(e.target?.file[0]);
            const file = e.target?.files[0];
            console.log(file);

            console.clear();
            console.log(URL.createObjectURL(file));

            let base: any = await getBase64(file);
            base = base.split('base64,')[1];

            console.log(base);

            const cat__: any = localStorage.getItem('cat');
            const cat_: any = JSON.parse(cat__);

            let data = {
                category: cat_.cat,
                fileContent: base,
                fileName: file.name,
                subcategory: cat_.subCat
            };

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://18.234.206.45:8085/api/v1/partner/product/bulkUpload',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                data,
            };

            axios.request(config)
                .then((res: any) => {
                    res = res.data;
                    console.log(res);
                    if (res.status === 'SUCCESS') {
                        localStorage.setItem('bulkFileData', JSON.stringify(res.results));
                        navigate(`/${ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT_BULK}/${ROUTER_URL_CONSTANT.BULK_CATALOGUE_FILE_REPORT}`)
                    };
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        input.click()
    }

    return (
        <>
            <div>
                <div className="catmainbulk pt-4 mt-4">
                    <div className="cat-bilks">
                        <div className="cat-bilks1">
                            <p> Download excel template to add product details <img src={cloudOpposite} className="img-fluid" /> </p>
                            <input type="button" name="" defaultValue="Download" className="catblkdwn" onClick={() => saveAs('https://imavatar-dev.s3.amazonaws.com/DDMS0232.xlsx', "upload_template.xlsx")} />
                        </div>
                        <div className="cat-bilks1">
                            <p>Download excel template to add product details <img src={cloud} className="img-fluid" /> </p>
                            <input type="button" name="ExcelFileUpload" defaultValue="Upload" className="catblkdwn" onClick={uploadFile} />
                        </div>
                    </div>
                </div>
                <div className="deletes border-0 pb-2">
                    <label htmlFor="staticEmail" className="col-form-label fnt20">Note: You can add maximum 30 number of products in single excel file.</label>
                </div>
            </div>

        </>
    )
}

export default CreateBulkCatalog