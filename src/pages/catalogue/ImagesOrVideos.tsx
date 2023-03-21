import React from 'react';

const ImagesOrVideos = () => {
  return (
    <>
      <div className="catlgs-upload">
        <div className="catlgs-upload1">
          <h4 className="cathed1">Uploaded 1 of 4 images</h4>
          <div>
            <div id="img-preview"></div>
            <input
              type="file"
              id="choose-file"
              name="choose-file"
              accept="image/*"
            />
            <label htmlFor="choose-file">Upload</label>
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
              id="choose-file"
              name="choose-file"
              accept="image/*"
            />
            <label htmlFor="choose-file">Upload</label>
          </div>
          <div className="prs-cat" style={{ marginLeft: '10px' }}>
            <div id="img-preview"></div>
            <input
              type="file"
              id="choose-file"
              name="choose-file"
              accept="image/*"
            />
            <label htmlFor="choose-file">Upload</label>
          </div>
        </div>
        <div className="catlgs-upload1">
          <h4 className="cathed1">Image & Video Guidelines</h4>
          <div>
            <div id="img-preview1"></div>
            <input
              type="file"
              id="choose-file1"
              name="choose-file1"
              accept="image/*"
            />
            <label htmlFor="choose-file1">Upload</label>
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
            />
            <input
              type="button"
              name=""
              className="edit44"
              value="Save & Next"
            />
            <input type="button" name="" className="edit44" value="Cancel" />
          </div>
        </form>
      </div>
    </>
  );
};

export default ImagesOrVideos;
