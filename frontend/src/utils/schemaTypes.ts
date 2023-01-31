export interface CommentsProps {
  postedBy: PostedByProps;
  comment: string;
}

export interface PinProps {
  _id: string;
  title: string;
  about: string;
  destination: string;
  category: string;
  image: ImageProps;
  userId: string;
  postedBy: UserProps;
  save: SaveProps[];
  comments: CommentsProps[];
}

export interface PostedByProps extends UserProps {
  image: string;
}

export interface SaveProps {
  postedBy: PostedByProps;
  userId: string;
  _key: string;
}

export interface UserProps {
  userName: string;
  image: string;
  _id: string;
}

export interface ImageProps {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
    url: string;
  };
}
