import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, Building2, UploadCloud as CloudUpload, ArrowRight } from 'lucide-react';
import { API_CONFIG } from '../config/api';
import { Link } from 'react-router-dom';

const AgencyPage = () => {
  const [uploadResult, setUploadResult] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isValidType = file.type === 'application/pdf' || file.type === 'text/plain';
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });

    setSelectedFiles(validFiles);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      setUploadResult({ error: 'Molimo izaberite fajlove za upload.' });
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    setUploading(true);
    setUploadResult(null);

    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPLOAD_MULTIPLE}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setUploadResult({
        success: true,
        message: 'Fajlovi su uspešno otpremljeni!',
        data: result,
        uploadedFiles: selectedFiles.map(file => ({
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          type: file.type
        }))
      });

      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult({
        error: `Došlo je do greške prilikom upload-a fajlova: ${error.message}`
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-tourism-primary to-tourism-secondary p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>

            <div className='w-full justify-between flex'>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Turistička Agencija</h1>
                <p className="text-sm text-gray-600">Upload dokumenata i materijala</p>
              </div>
              <Link to={`/`} className="w-[60px] bg-gradient-to-r from-tourism-primary to-tourism-secondary text-white rounded-lg font-semibold py-5 hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 group">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-tourism-primary/5 to-tourism-secondary/5 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <CloudUpload className="w-5 h-5 text-tourism-primary" />
              <span>Upload turističkih dokumenata</span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Podržani formati: PDF fajlovi (maksimalno 10MB po fajlu)
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleFileUpload} className="space-y-6">
              {/* Drag and Drop Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive
                    ? 'border-tourism-primary bg-tourism-primary/5 scale-105'
                    : 'border-gray-300 hover:border-tourism-primary hover:bg-gray-50'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  multiple
                  onChange={handleFileInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className={`p-4 rounded-full transition-colors duration-300 ${dragActive ? 'bg-tourism-primary text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                      <Upload className="w-8 h-8" />
                    </div>
                  </div>

                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      Prevucite fajlove ovde ili
                      <button
                        type="button"
                        onClick={openFileSelector}
                        className="text-tourism-primary hover:text-tourism-secondary font-semibold ml-1"
                      >
                        kliknite za izbor
                      </button>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PDF i DOCX fajlovi do 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4 animate-slide-up">
                  <h3 className="font-medium text-gray-700 mb-3 flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Izabrani fajlovi ({selectedFiles.length})</span>
                  </h3>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-1 bg-tourism-primary/10 rounded">
                            <FileText className="w-4 h-4 text-tourism-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-red-100 rounded-full text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploading || selectedFiles.length === 0}
                className={`w-full py-3 px-6 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center space-x-2 ${uploading || selectedFiles.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-tourism-primary to-tourism-secondary hover:shadow-lg transform hover:scale-[1.02]'
                  }`}
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Otpremanje u toku...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Otpremi fajlove</span>
                  </>
                )}
              </button>
            </form>

            {/* Upload Result */}
            {uploadResult && (
              <div className={`mt-6 p-4 rounded-xl animate-fade-in ${uploadResult.error
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-green-50 border border-green-200'
                }`}>
                <div className="flex items-start space-x-3">
                  <div className={`p-1 rounded-full ${uploadResult.error ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                    {uploadResult.error ? (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${uploadResult.error ? 'text-red-800' : 'text-green-800'
                      }`}>
                      {uploadResult.error || uploadResult.message}
                    </p>

                    {uploadResult.uploadedFiles && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-green-700 font-medium">Otpremljeni fajlovi:</p>
                        {uploadResult.uploadedFiles.map((file, index) => (
                          <div key={index} className="text-sm text-green-600 bg-green-100 rounded-lg p-2">
                            <strong>{file.name}</strong> - {file.size}
                          </div>
                        ))}
                      </div>
                    )}

                    
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyPage;