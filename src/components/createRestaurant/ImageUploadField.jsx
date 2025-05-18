import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const ImageUploadField = ({ register, errors, watch, setValue }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const watchImage = watch('file');
  
  // Handle clearing the image
  const handleClear = () => {
    setValue('file', null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  
  // Update preview when file changes
  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      // Clean up the URL when component unmounts
      return () => URL.revokeObjectURL(fileUrl);
    }
  }, [watchImage]);
  
  return (
    <div className="space-y-2">
      <label className="block font-semibold text-gray-700">
        <span className="text-red-500 mr-1">*</span>
        Restaurant Image
      </label>
      
      <div className="relative w-full">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          {...register('file', {
            required: "Restaurant image is required"
          })}
          className="w-full p-2 border rounded-md bg-gray-50 file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0 file:text-sm file:font-semibold
            file:bg-red-50 file:text-red-700 hover:file:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
        
        {previewUrl && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      {errors.file && (
        <p className="text-sm text-red-500 mt-1">
          {errors.file.message}
        </p>
      )}
      
      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
          <div className="relative w-48 h-48 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;