import React from 'react';

const UploadPage = ({ name }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Upload Documents</h3>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Question Paper
        </label>
        <input
          type="file"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-emerald-50 file:text-emerald-700
            hover:file:bg-emerald-100
            transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Evaluation Criteria
        </label>
        <input
          type="file"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-emerald-50 file:text-emerald-700
            hover:file:bg-emerald-100
            transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Model Answer Sheet
        </label>
        <input
          type="file"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-emerald-50 file:text-emerald-700
            hover:file:bg-emerald-100
            transition-colors"
        />
      </div>
    </div>
  );
};

export default UploadPage;