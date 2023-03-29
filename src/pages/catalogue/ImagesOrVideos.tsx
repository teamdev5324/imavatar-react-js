import { useState } from 'react';
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
      info: {}, // you can take data from reducer   ,

      pricing: {
        hsncode: '1234',
        mrp: '1.99',
        onHandUnitCost: '1.99',
        partnerSKUId: 'string',
        yourSellingPrice: '1.99',
      },

      subCategory: 'sub11',
      variation: {
        color: 'string',
        height: '1.99',
        length: '1.99',
        materialType: 'string',
        shape: 'string',
        size: 'string',
        unitQuantity: '1.55',
        width: '1.99',
      },
    };

    dispatch(submitProducts(prepareData));
  };

  return (
    <>
      <div className="catlgs-upload">
        <div className="catlgs-upload1">
          <h4 className="cathed1">Uploaded 1 of 4 images</h4>
          <div>
            <div id="img-preview"></div>
            <input
              type="file"
              id="choose-file-1"
              name="choose-file-1"
              accept="image/*"
              className="d-none"
              onChange={(res) => {
                images[0] = res.target.value;
                setImages(images);
              }}
            />
            <label htmlFor="choose-file-1">Upload File</label>
          </div>
        </div>
        <div className="catlgs-upload1 catlgs-upload2">
          <h4 className="cathed1">
            You can arrange the order of images after uploading
          </h4>
          <div className="prs-cat">
            <div id="img-preview"></div>
            <input
              type="file"
              id="choose-file-2"
              name="choose-file-2"
              accept="image/*"
              className="d-none"
              onChange={(res) => {
                images[1] = res.target.value;
                setImages(images);
              }}
            />
            <label htmlFor="choose-file-2">Upload</label>
          </div>
          <div className="prs-cat" style={{ marginLeft: '10px' }}>
            <div id="img-preview"></div>
            <input
              type="file"
              id="choose-file-3"
              name="choose-file-3"
              accept="image/*"
              className="d-none"
              onChange={(res) => {
                images[2] = res.target.value;
                setImages(images);
              }}
            />
            <label htmlFor="choose-file-3">Upload</label>
          </div>
        </div>
        <div className="catlgs-upload1">
          <h4 className="cathed1">Image & Video Guidelines</h4>
          <div>
            <div id="img-preview1"></div>
            <input
              type="file"
              id="choose-file-4"
              name="choose-file-4"
              accept="image/*"
              className="d-none"
              onChange={(res) => {
                images[3] = res.target.value;
                setImages(images);
              }}
            />
            <label htmlFor="choose-file-4">Upload</label>
          </div>
        </div>
      </div>

      <div className="cater_forms pb-5">
        <form>
          <div className="col-md-9 frmses cats_fmsbtn">
            <input
              type="button"
              name=""
              className="edit44"
              value="Save & Go Back"
              onClick={() => saveAndNextPress(true)}
            />
            <input
              type="button"
              name=""
              className="edit44"
              value="Save & Next"
              onClick={() => saveAndNextPress()}
            />
            <input type="button" name="" className="edit44" value="Cancel" />
          </div>
        </form>
      </div>
    </>
  );
};

export default ImagesOrVideos;
