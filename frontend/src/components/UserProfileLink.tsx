import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface UserProfileLinkProps {
  id: string;
  image: string;
  userName?: ReactNode;
  classesLink?: string;
  classesImage?: string;
  classesText?: string;
}

const UserProfileLink = ({
  id,
  image,
  userName,
  classesLink,
  classesImage,
  classesText,
}: UserProfileLinkProps) => {
  return (
    <Link to={`/user-profile/${id}`} className={classesLink}>
      <img src={image} alt="user-profile" className={classesImage} />
      {userName && <p className={classesText}>{userName}</p>}
    </Link>
  );
};

export default UserProfileLink;
