import { SanityImageAssetDocument } from '@sanity/client';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Dropdown from './../components/Inputs/Dropdown';
import ErrorBox from './../components/NoticeBoxes/ErrorBox';
import ImageUpload from './../containers/ImageUpload';
import Input from '../components/Inputs/Input';
import PrimaryButton from './../components/Buttons/PrimaryButton';
import Textarea from '../components/Inputs/Textarea';
import { UserProps } from '../utils/schemaTypes';
import { categories } from '../utils/data';
import { client } from '../client';

const UploadPinPage = ({ user }: { user: UserProps }) => {
  // 🏡 Local state 🏡
  const [title, setTitle] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
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

    const isImageSizeCorrect = size <= 20000000;

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
      setFormError(true);
      // FIXME: I don't like handling errors like this. Add correct form validation instead
      setTimeout(() => {
        setFormError(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center mt-5 lg:h-4/5">
      <div className="flex lg:flex-row flex-col gap-4 justify-center  bg-white lg:p-5 p-3 max-w-6xl w-full rounded-md">
        {/* Image upload */}
        <ImageUpload
          imageAsset={imageAsset}
          imageSizeError={wrongImageSize}
          imageTypeError={wrongImageType}
          loading={loading}
          onClick={() => setImageAsset(null)}
          uploadImage={uploadImage}
        />

        {/* Form */}
        <form className="flex flex-1 flex-col gap-6 w-full pt-4 ">
          <h1 className="text-3xl">Upload image</h1>
          <Input
            value={title}
            label="Title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
          />
          <Input
            label="Destination link"
            name="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
          />
          <Textarea
            label="About"
            name="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your pin about?"
          />

          <Dropdown
            onChange={(e: any) => setCategory(e.target.value)}
            options={categories}
          />

          {formError && <ErrorBox message="Please fill in all the fields" />}

          <PrimaryButton
            label="Upload image"
            type="submit"
            onClick={(e: any) => {
              e.preventDefault();
              savePin();
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default UploadPinPage;
