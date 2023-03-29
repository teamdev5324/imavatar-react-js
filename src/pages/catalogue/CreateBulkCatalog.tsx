import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { excelFileUrl } from "../../constants/apiUrlConstant"
import { cloud, cloudOpposite } from "../../constants/imageConstants"
import { ROUTER_URL_CONSTANT } from "../../constants/routerUriConstants"
import { downloadFile } from "../../utils/helpers"

const CreateBulkCatalog = () => {
    const [filePath, setFilePath] = useState("")
    const navigate = useNavigate()

    const uploadFile = () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = ".xlsx"
        input.onchange = (e: any) => {
            setFilePath(e.target?.value)
            navigate(`/${ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT_BULK}/${ROUTER_URL_CONSTANT.BULK_CATALOGUE_FILE_REPORT}`)
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
                            <input type="button" name="" defaultValue="Download" className="catblkdwn" onClick={() => downloadFile(excelFileUrl, "LDMS0007.xlsx")} />
                        </div>
                        <div className="cat-bilks2">
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