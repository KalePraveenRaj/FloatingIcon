import React, { useState, useRef } from 'react';
import './floating_icon.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isArrowVisible, setIsArrowVisible] = useState(true);
  const [isBulbVisible, setIsBulbVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isSearchSpaceVisible, setIsSearchSpaceVisible] = useState(false);
  const [isUploadSpaceVisible, setIsUploadSpaceVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const draggableContainerRef = useRef(null);

  const startDragging = (e) => {
    e.preventDefault();
    const element = draggableContainerRef.current;
    let offsetX = e.clientX - element.getBoundingClientRect().left;
    let offsetY = e.clientY - element.getBoundingClientRect().top;

    const dragElement = (e) => {
      e.preventDefault();
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    };

    const stopDragging = () => {
      document.removeEventListener('mousemove', dragElement);
      document.removeEventListener('mouseup', stopDragging);
    };

    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', stopDragging);
  };

  const handleArrowClick = () => {
    setIsArrowVisible(true);
    setIsBulbVisible(true);
  };

  const handleBulbClick = () => {
    setIsAlertVisible(true);
    setIsArrowVisible(false);
  };

  const handleSearchClick = () => {
    setIsSearchSpaceVisible(true);
    setIsUploadSpaceVisible(false);
  };

  const handleUploadClick = () => {
    setIsUploadSpaceVisible(true);
    setIsSearchSpaceVisible(false);
  };

  const handleCloseAlert = () => {
    setIsAlertVisible(false);
    setIsArrowVisible(true);
    setIsBulbVisible(false);
    setIsSearchSpaceVisible(false);
    setIsUploadSpaceVisible(false);
    setSelectedFile(null);
    setSearchQuery('');
    setSearchResult(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      setSelectedFile(null);
      setIsUploadSpaceVisible(false);
      alert('File uploaded successfully!');
    }
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/v1/parts/fetch/${searchQuery}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error('Error fetching search result:', error);
      alert('Error fetching search result. Please try again.');
    }
  };

  return (
    <div>
      <h1>Stock Pileer</h1>
      <div className="draggable-container" ref={draggableContainerRef} onMouseDown={startDragging}>
        <div className="inner-container">
          <div className="btn-group" id="btnGroup">
            {isBulbVisible && (
              <button
                id="bulbButton"
                className="icon"
                onClick={handleBulbClick}
              >
                <i className="fa-solid fa-lightbulb" style={{ color: '#04AA6D', fontSize: '25px' }}></i>
              </button>
            )}
            {isArrowVisible && (
              <button
                id="arrowButton"
                className="icon1"
                onClick={handleArrowClick}
              >
                <i className="fa-solid fa-arrow-rotate-left fa-rotate-180" style={{ color: '#f7f9fc', fontSize: '25px' }}></i>
              </button>
            )}
          </div>

          {isAlertVisible && (
            <div id="alertBox" className={`alert-box ${isSearchSpaceVisible ? 'search-space-visible' : ''}`}>
              <span className="close-alert" onClick={handleCloseAlert}><i className="fa-solid fa-times"></i></span>

              {isSearchSpaceVisible ? (
                <form className="search-space" onSubmit={handleSearchSubmit}>
                  <input 
                    type="text" 
                    id="searchInput" 
                    name="searchQuery" 
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    placeholder="Search.." 
                    className="search-input"
                  />
                  <button type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              ) : isUploadSpaceVisible ? (
                <div className="upload-space">
                  <input 
                    type="file" 
                    accept=".csv" 
                    id="fileInput" 
                    name="uploadFile"
                    onChange={handleFileChange} 
                    className="file-input" 
                  />
                  <button onClick={handleFileUpload}>
                    <i className="fa-solid fa-upload"></i>
                  </button>
                </div>
              ) : (
                <div className="default-buttons">
                  <button className="icon"><i className="fa-solid fa-camera"></i></button>
                  <button className="icon" onClick={handleSearchClick}><i className="fa fa-search"></i></button>
                  <button className="icon" onClick={handleUploadClick}><i className="fa-solid fa-upload"></i></button>
                </div>
              )}
              {searchResult && (
                <div className="search-results">
                  <p>Part Number: {searchResult.partNumber}</p>
                  <p>Description: {searchResult.description}</p>
                  <p>Price: {searchResult.price}</p>
                  <p>Stock: {searchResult.stock}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
