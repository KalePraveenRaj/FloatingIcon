import React, { useState, useRef } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './floating_icon1.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [state, setState] = useState({
    isArrowVisible: true,
    isBulbVisible: false,
    isAlertVisible: false,
    isSearchSpaceVisible: false,
    isUploadSpaceVisible: false,
    searchQuery: '',
    searchResult: null,
    selectedFile: null,
    excelBuffer: null,
    reportReady: false,
    isUploading: false,
  });

  const draggableContainerRef = useRef(null);
  const uploadButtonRef = useRef(null);

  const startDragging = (e) => {
    if (
      e.target.classList.contains('icon') ||
      e.target.classList.contains('icon1') ||
      e.target.closest('form') ||
      e.target === uploadButtonRef.current
    ) {
      return;
    }

    e.preventDefault();
    const element = draggableContainerRef.current;
    const offsetX = e.clientX - element.getBoundingClientRect().left;
    const offsetY = e.clientY - element.getBoundingClientRect().top;

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

  const handleStateUpdate = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleArrowClick = () => {
    handleStateUpdate({ isArrowVisible: true, isBulbVisible: true });
  };

  const handleBulbClick = () => {
    handleStateUpdate({ isAlertVisible: true, isArrowVisible: false });
  };

  const handleSearchClick = () => {
    handleStateUpdate({ isSearchSpaceVisible: true, isUploadSpaceVisible: false });
  };

  const handleUploadClick = () => {
    handleStateUpdate({ isUploadSpaceVisible: true, isSearchSpaceVisible: false });
  };

  const handleCloseAlert = () => {
    handleStateUpdate({
      isAlertVisible: false,
      isArrowVisible: true,
      isBulbVisible: false,
      isSearchSpaceVisible: false,
      isUploadSpaceVisible: false,
      selectedFile: null,
      searchQuery: '',
      searchResult: null,
      excelBuffer: null,
      reportReady: false,
      isUploading: false,
    });
  };

  const handleFileChange = (e) => {
    handleStateUpdate({ selectedFile: e.target.files[0] });
  };

  const handleFileUpload = () => {
    if (state.selectedFile) {
      handleStateUpdate({ isUploading: true });
      Papa.parse(state.selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const partNumbers = results.data.map((row) => row.part_number).filter(Boolean);
          fetchDataForParts(partNumbers);
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
          handleStateUpdate({ isUploading: false });
        },
      });
    }
  };

  const fetchDataForParts = async (parts) => {
    if (parts.length === 0) {
      console.error('No part numbers to fetch.');
      handleStateUpdate({ isUploading: false });
      return;
    }

    const partData = [];
    for (const partNumber of parts) {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/parts/fetch/${partNumber}`);
        partData.push(response.data);
      } catch (error) {
        console.error(`Error fetching data for part number ${partNumber}:`, error);
      }
    }

    if (partData.length > 0) {
      createExcelReport(partData);
    } else {
      console.error('No data available for the report.');
      handleStateUpdate({ reportReady: false, isUploading: false });
    }
  };

  const createExcelReport = (partData) => {
    const worksheet = XLSX.utils.json_to_sheet(partData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Part Numbers Report');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    handleStateUpdate({ excelBuffer, reportReady: true, isUploading: false });
  };

  const downloadReport = () => {
    if (state.excelBuffer) {
      saveAs(new Blob([state.excelBuffer], { type: 'application/octet-stream' }), 'part_numbers_report.xlsx');
    } else {
      console.error('No data available to download.');
    }
  };

  const handleSearchQueryChange = (e) => {
    handleStateUpdate({ searchQuery: e.target.value });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/parts/fetch/${state.searchQuery}`);
      handleStateUpdate({ searchResult: response.data });
    } catch (error) {
      console.error('Error fetching search result:', error);
    }
  };

  const handleSnapClick = async () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      handleStateUpdate({ searchQuery: selectedText, isSearchSpaceVisible: true, isUploadSpaceVisible: false });
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/parts/fetch/${selectedText}`);
        handleStateUpdate({ searchResult: response.data });
      } catch (error) {
        console.error('Error fetching search result:', error);
      }
    } else {
      alert('Please select text to snap.');
    }
  };

  return (
    <div>
      <h1>Praveen Raj 12434</h1>
      <div
        className="draggable-container"
        ref={draggableContainerRef}
        onMouseDown={startDragging}
      >
        <div className="inner-container">
          <div className="btn-group" id="btnGroup">
            {state.isBulbVisible && (
              <button
                id="bulbButton"
                className="icon"
                onClick={handleBulbClick}
              >
                <i
                  className="fa-solid fa-lightbulb"
                  style={{ color: '#04AA6D', fontSize: '25px' }}
                ></i>
              </button>
            )}
            {state.isArrowVisible && (
              <button
                id="arrowButton"
                className="icon1"
                onClick={handleArrowClick}
              >
                <i
                  className="fa-solid fa-arrow-rotate-left fa-rotate-180"
                  style={{ color: '#f7f9fc', fontSize: '25px' }}
                ></i>
              </button>
            )}
          </div>

          {state.isAlertVisible && (
            <div
              id="alertBox"
              className={`alert-box ${state.isSearchSpaceVisible ? 'search-space-visible' : ''}`}
            >
              <span className="close-alert" onClick={handleCloseAlert}>
                <i className="fa-solid fa-times"></i>
              </span>

              {state.isSearchSpaceVisible ? (
                <form className="search-space" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    id="searchInput"
                    name="searchQuery"
                    value={state.searchQuery}
                    onChange={handleSearchQueryChange}
                    placeholder="Search.."
                    className="search-input"
                  />
                  <button type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              ) : state.isUploadSpaceVisible ? (
                <div className="upload-space">
                  <div className="file-upload">
                    <input
                      type="file"
                      accept=".csv"
                      id="fileInput"
                      name="uploadFile"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <button
                      ref={uploadButtonRef}
                      onClick={handleFileUpload}
                      disabled={state.isUploading}
                    >
                      <i className="fa-solid fa-upload"></i>
                    </button>
                  </div>
                  {state.reportReady && (
                    <button className="download-report" onClick={downloadReport}>
                      <i className="fa-solid fa-download"></i> Download Report
                      </button>
              )}
              {state.isUploading && (
                <div className="uploading-status">
                  <i className="fa-solid fa-spinner fa-spin"></i> Uploading...
                </div>
              )}
            </div>
          ) : null}

          {/* Default Buttons */}
          {!state.isSearchSpaceVisible && !state.isUploadSpaceVisible && (
            <div className="default-buttons">
              <button className="icon" onClick={handleSearchClick}>
                <i className="fa fa-search"></i>
              </button>
              <button className="icon" onClick={handleSnapClick}>
                <i className="fa-solid fa-camera"></i>
              </button>
              <button className="icon" onClick={handleUploadClick}>
                <i className="fa-solid fa-upload"></i>
              </button>
            </div>
          )}

          {/* Search Result Display */}
          {state.searchResult && (
            <div className="search-results">
              <p><strong>Part Number:</strong> {state.searchResult.partNumber}</p>
              <p><strong>Name:</strong> {state.searchResult.name}</p>
              <p><strong>Quantity:</strong> {state.searchResult.quantity}</p>
              <p><strong>Description:</strong> {state.searchResult.description}</p>
            </div>
          )}

          {/* Error or Status Message */}
          {state.errorMessage && (
            <div className="error-message">
              <i className="fa-solid fa-exclamation-circle"></i> {state.errorMessage}
            </div>
          )}
        </div>
      )}
    </div>
  </div>
</div>
);} export default App;
