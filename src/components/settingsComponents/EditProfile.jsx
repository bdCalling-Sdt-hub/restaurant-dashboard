import React, { useState, useCallback } from 'react';
import { Button, Input, Modal, Slider } from 'antd';
import Cropper from 'react-easy-crop';
import profile from '/profile.png';
import { IoCameraOutline } from 'react-icons/io5';

const EditProfile = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(profile);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setIsModalOpen(true);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result));
      reader.readAsDataURL(file);
    });
  };

  const getCroppedImg = useCallback(async () => {
    try {
      const canvas = document.createElement('canvas');
      const image = new Image();
      image.src = imageSrc;
      const ctx = canvas.getContext('2d');

      const { width, height } = croppedAreaPixels;
      canvas.width = width;
      canvas.height = height;

      image.onload = () => {
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          width,
          height,
          0,
          0,
          width,
          height
        );
        const base64Image = canvas.toDataURL('image/jpeg');
        setCroppedImage(base64Image);
        setIsModalOpen(false);
      };
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg text-center">
      <div className="max-w-[400px] mx-auto">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="upload-button"
        />
        <label htmlFor="upload-button" className="cursor-pointer">
          <div className='relative'>
          <img
            src={croppedImage}
            className="rounded-full mx-auto w-24 h-24 border"
            alt="Profile"
          />
        <div className='absolute right-36 bottom-0'>
        <div className='bg-red-500 border-2 border-white flex items-center justify-center  w-8 h-8 rounded-full '>
         <IoCameraOutline size={20} color='#fff' />
         </div>
        </div>
          </div>

        </label>
        <h2 className="text-xl font-bold mt-2">Edit Profile</h2>
        <div className="text-left mt-4">
          <label className="font-semibold">Username</label>
          <Input className="mt-1" placeholder="Username" defaultValue="Amith" />
        </div>
        <div className="text-left mt-4">
          <label className="font-semibold">Email</label>
          <Input className="mt-1" placeholder="Email" defaultValue="amith@gmail.com" />
        </div>
        <div className="text-left mt-4">
          <label className="font-semibold">Phone Number</label>
          <Input className="mt-1" placeholder="Phone Number" defaultValue="+909820070" />
        </div>
        <div className="text-left mt-4">
          <label className="font-semibold">Address</label>
          <Input className="mt-1" placeholder="Address" defaultValue="G st, 23 Miami City" />
        </div>
        <Button type="primary" className="!mt-6 !bg-red-500" onClick={onBack}>
          Save Changes
        </Button>

        <Modal
          title="Crop Image"
          visible={isModalOpen}
          onOk={getCroppedImg}
          onCancel={handleCancel}
          okText="Save"
          okButtonProps={{
            style: {
              backgroundColor: '#f44336', // Red color
              borderColor: '#f44336',
              color: '#fff',
            },
          }}
        >
          {imageSrc && (
            <div className="relative w-full h-64 bg-gray-200">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}
          <div className="mt-4">
            <label className="font-semibold">Zoom</label>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(value) => setZoom(value)}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default EditProfile;
