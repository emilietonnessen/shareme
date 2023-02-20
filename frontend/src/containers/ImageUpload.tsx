import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { SanityImageAssetDocument } from '@sanity/client';

import Spinner from '../components/Spinners/Spinner';

interface ImageUploadProps {
  imageAsset: SanityImageAssetDocument | null;
  imageSizeError: boolean;
  imageTypeError: boolean;
  loading: boolean;
  onClick: () => void;
  uploadImage: (event: any) => void;
}

const ImageUpload = ({
  imageAsset,
  imageSizeError,
  imageTypeError,
  loading,
  onClick,
  uploadImage,
}: ImageUploadProps) => {
  // TODO: Make whole click area into a button
  return (
    <div className="bg-slate-100 p-3 flex flex-0.7 w-full">
      <div className="flex justify-center h-full items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full">
        {loading && <Spinner />}
        {imageTypeError && (
          <p>Wrong image type. Please use either png, svg, jpeg, gif or tiff</p>
        )}
        {imageSizeError && (
          <p>Wrong image size. Please use an image under 20MB</p>
        )}
        {!imageAsset ? (
          <div>
            <div className="flex flex-col gap-10 items-center justify-center h-full">
              <label
                htmlFor="upload-image"
                className="flex flex-col justify-center items-center"
              >
                <AiOutlineCloudUpload className="text-2xl font-bold" />
                <span className="text-lg">Click to upload</span>
              </label>
              <p className="text-slate-700 font-bold text-sm text-center px-4">
                Use high-quality JPEG, SVG, PNG, GIF or TIFF less than 20MB
              </p>
            </div>
            <input
              type="file"
              name="upload-image"
              id="upload-image"
              onChange={uploadImage}
              className="w-0 h-0"
            />
          </div>
        ) : (
          <div className="relative h-full">
            <img
              src={imageAsset?.url}
              alt="uploaded-pic"
              className="h-full w-full"
            />
            <button
              className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
              onClick={onClick}
            >
              <MdDelete />
              <span className="sr-only">Remove image</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
