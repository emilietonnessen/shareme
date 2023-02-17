import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { categories } from '../utils/data';
import { client } from '../client';
import { UserProps } from '../utils/schemaTypes';
import { SanityImageAssetDocument } from '@sanity/client';
import Spinner from '../components/Spinner';

const CreatePin = ({ user }: { user: UserProps }) => {
  // 🏡 Local state 🏡
  const [title, setTitle] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>(
    null
  );
  const [wrongImageType, setWrongImageType] = useState<boolean>(false);
  const [wrongImageSize, setWrongImageSize] = useState(false);

  // 🎣 Hooks 🎣
  const navigate = useNavigate();

  // ⬆️📸 Upload image handler ⬆️📸
  const uploadImage = (e: any) => {
    const { type, name, size } = e.target.files[0];
    setWrongImageType(false);
    setWrongImageSize(false);

    const isImageTypeCorrect =
      type === 'image/png' ||
      type === 'image/svg' ||
      type === 'image/jpeg' ||
      type === 'image/gif' ||
      type === 'image/tiff';

    const isImageSizeCorrect = size <= 2000000;

    // TODO: Add max 20MB file size
    if (isImageTypeCorrect) {
      if (isImageSizeCorrect) {
        setWrongImageType(false);
        setLoading(true);

        client.assets
          .upload('image', e.target.files[0], {
            contentType: type,
            filename: name,
          })
          .then((document) => {
            setImageAsset(document);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Image upload error', error);
          });
      } else {
        setWrongImageSize(true);
      }
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      };

      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setFields(true);
      // FIXME: I don't like handling errors like this. Add correct form validation instead
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields.
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 max-w-6xl w-full rounded-md">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && (
              <p>
                Wrong image type. Please use either png, svg, jpeg, gif or tiff
              </p>
            )}
            {wrongImageSize && (
              <p>Wrong image size. Please use an image under 20MB</p>
            )}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400 text-center">
                    Use high-quality JPEG, SVG, PNG, GIF or TIFF less than 2MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  id="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your pin about?"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-lg">
                Choose Pin Category
              </p>
              <select
                name=""
                id=""
                onChange={(e) => setCategory(e.target.value)}
                className="w-full outline-none text-base border-b-2 border-gray-200 p-2 cursor-pointer"
              >
                <option value="other" className="vg.white">
                  Select category
                </option>
                {categories.map((category) => (
                  <option
                    key={category.name}
                    value={category.name}
                    className="text-base border-0 outline-none capitalize bg-white text-black"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-start items-end mt-5">
              <button
                className="bg-salmon text-white font-bold p-2 rounded-md w-full sm:w-28 outline-none"
                type="button"
                onClick={savePin}
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
