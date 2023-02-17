import jwt_decode from 'jwt-decode';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import logo from '../assets/logowhite.png';
import shareVideo from '../assets/share.mp4';
import { client } from '../client';
import Spinner from '../components/Spinner';

interface DecodedProps {
  name: string;
  picture: string;
  sub: string;
}

const Login = () => {
  // 🏡 Local state 🏡
  const [loading, setLoading] = useState<boolean>(false);

  // 🎣 Hooks 🎣
  const navigate = useNavigate();

  // ✅ Success handler ✅
  const createOrGetUser = async (response: CredentialResponse) => {
    setLoading(true);

    // Get the user data from the response
    const decoded: DecodedProps = jwt_decode(response?.credential as string);

    // Set the decoded user data in the local storage
    localStorage.setItem('user', JSON.stringify(decoded));

    const user = {
      _id: decoded?.sub,
      _type: 'user',
      userName: decoded?.name,
      image: decoded?.picture,
    };

    // If user does not exist, then create a new one. If not login
    client.createIfNotExists(user).then(() => {
      navigate('/', { replace: true });
      setLoading(false);
    });
  };

  return (
    <main className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        {/* Background Video */}
        <video
          src={shareVideo}
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
            <img src={logo} alt="share me logo" width="130px" />
          </div>

          {/* Google Login */}
          <div aria-live="polite">
            {/* FIXME: There is a problem with the GoogleLogin button were the outline is not visible when tabbing to it. It will however be activated, but it won't be visually seen as focused. */}
            {loading ? (
              <Spinner />
            ) : (
              <GoogleLogin
                onSuccess={(response) => createOrGetUser(response)}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
