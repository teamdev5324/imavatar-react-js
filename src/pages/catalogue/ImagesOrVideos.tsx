import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { submitProducts } from '../../services/catalogue/singleCatalouge';

import { catalogueSelectors } from '../../store/catalogue';
import { SystemState } from '../../store/storeTypes';

const ImagesOrVideos = () => {
  const [images, setImages] = useState<any>([]);

  const dispatch =
    useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();
  const catalogueState = useSelector(catalogueSelectors.getCatalogueState);

  const { getAllProductInfo } = catalogueState;

  console.log('getAllProductInfo', getAllProductInfo);

  const [files, setFiles] = useState<any>({ images: [{ file: null, base64: null, name: null }, { file: null, base64: null, name: null }, { file: null, base64: null, name: null }, { file: null, base64: null, name: null }] });
  const _files: any = files;

  const saveAndNextPress = (isGoingBack = false) => {
    if (images.length <= 0)
      toast.error('Please select images', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

    // if (isGoingBack)

    const prepareData = {
      category: 'cat1',
      pid: 2,
      description: {
        briefDescription: 'string',
        formOfProduct: 'Solid',
        fragile: 'Yes',
        highLights: 'string',
        keyWords: 'string',
        otherInformation: 'string',
        packagingHeight: '1.99',
        packagingLength: '1.99',
        packagingWidth: '1.99',
        perisableExpirable: 'Yes',
        relatedDeities: 'string',
        relatedFaith: 'string',
        relatedFestival: 'string',
        replacementAvailable: 'Yes',
        returnAvailable: 'No',
        shelfLife: 'string',
        unitOfPackaging: 'cm',
      },
      images: {
        documentId1: 'DDMS0018',
        documentId2: null,
        documentId3: null,
        documentId4: null,
      },
      subCategory: 'sub11',
    };

    // dispatch(submitProducts(prepareData));
  };

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

  const handleSelect = async (num: any) => {
    const file_ = document.createElement('input');
    file_.type = 'file';
    file_.accept = 'image/jpeg';
    file_.onchange = async (file: any) => {
      file = file.target.files[0];
      console.log(file);
      const base64: any = await getBase64(file);
      // setCertificate({ fileName: file.name, base64: base.split('base64,')[1] });
      // _files.images[num] = { base64, name: file.name };

      let __data = JSON.stringify({
        fileName: file.name,
        usecaseName: "imageupload",
        fileContent: base64.split('base64,')[1],
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://18.234.206.45:8085/api/v1/files/upload',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: __data
      };

      const { data } = await axios.request(config);
      _files.images[num] = { base64: data.results.url, name: file.name, documentId: data.results.documentId };
      setFiles(f => ({ ...f, ..._files }));
    };
    file_.click();
  };

  const [pid, setPid] = useState(null);

  useEffect(() => {
    const _pid: any = localStorage.getItem('pid');
    setPid(_pid);
  }, []);

  const handleSubmit = async () => {
    const isEmpty = () => {
      let res = false;
      files.images.forEach(item => {
        if (!item.base64) { res = true };
      });
      return res;
    };

    if (isEmpty()) {
      alert('Please select all images');
    } else {
      const __images: any = {
        documentId1: files.images[0].documentId,
        documentId2: files.images[1].documentId,
        documentId3: files.images[2].documentId,
        documentId4: files.images[3].documentId,
      };
      let cat: any = localStorage.getItem('cat');
      cat = JSON.parse(cat);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://18.234.206.45:8085/api/v1/partner/product/singleUpload/save',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: {
          images: __images,
          category: cat.cat,
          subCategory: cat.subCat,
          pid,
        },
      };

      axios.request(config)
        .then((res) => {
          res = res.data.results;
          console.log(res);
          alert('Images saved successfully');
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }

  return (
    <>
      {pid && (
        <>
          <div className="catlgs-upload">
            <div className="catlgs-upload1">
              <h4 className="cathed1">Uploaded 1 of 4 images</h4>
            </div>
            <div className="catlgs-upload1 catlgs-upload2">
              <h4 className="cathed1">
                You can arrange the order of images after uploading
              </h4>
            </div>
            <div className="catlgs-upload1">
              <h4 className="cathed1">Image & Video Guidelines</h4>
            </div>
          </div>
          <div className='images__'>
            <>
              {files.images.map((item, index) => (
                <img src={!item.base64 ? require('../../assets/img/upload_.png') : item.base64}
                  onClick={() => handleSelect(index)}
                />
              ))}
            </>
          </div>
          <div className="col-md-9 frmses cats_fmsbtn">
            <input
              type="button"
              name=""
              className="edit44"
              value="Save & Go Back"
              onClick={() => {
                handleSubmit();
              }}
            />
            <input
              type="button"
              name=""
              className="edit44"
              value="Save & Next"
              onClick={() => {
                handleSubmit();
              }}
            />
            <input type="button" name="" className="edit44" value="Cancel" />
          </div>
        </>
      )}
    </>
  );
};

export default ImagesOrVideos;
