import jwt_decode from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logowhite.png';
import shareVideo from '../assets/share.mp4';
import { client } from '../client';

const Login = () => {
  // Hooks 🎣
  const navigate = useNavigate();

  // ✅ Success handler ✅
  const createOrGetUser = async (response) => {
    const decoded = jwt_decode(response.credential);
    localStorage.setItem('user', JSON.stringify(decoded));
    const { name, picture, sub } = decoded;

    const user = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };

    client.createIfNotExists(user).then(() => {
      navigate('/', { replace: true });
    });
  };

  // ❌ Error handler ❌
  const onError = (error) => {
    console.log('[error]', error);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        {/* Background Video */}
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        {/* Content */}
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          {/* Logo */}
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>

          {/* Google Login */}
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response)}
              onSError={onError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
