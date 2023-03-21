import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';

const LegalPolicies = () => {

  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [navPage, setNavPage] = useState(null);
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([]);

  // const history = useHistory();

  const getApi = async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://18.234.206.45:8085/api/v1/partner/profile',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    };

    let { data } = await axios(config);
    data = data.results.aggreements;
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleDownload = async (id) => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://18.234.206.45:8085/api/v1/files/download/DDMS0024',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    };

    const { data } = await axios(config);
    const { filename, fileContent } = data.results;
    console.log(data);
    saveAs('data:image/jpeg;base64,' + fileContent, filename);
    // base64.decode(fileContent, filename)
  }

  return (
    <div className="panel_form">
      <h3 className="col-md-12">Legal terms & Policies</h3>
      {data.map(item => (
        <div className="legal_data">
          <li>{item.term.termName}</li>
          <p>
            <a onClick={() => handleDownload(item.term.documentId)} style={{ color: '#ff6658' }}>Download</a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default LegalPolicies;
