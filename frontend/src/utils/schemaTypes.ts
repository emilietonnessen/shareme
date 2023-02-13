export interface CommentsProps {
  postedBy: PostedByProps;
  comment: string;
  _key: string;
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
  saved: boolean;
  comments: CommentsProps[];
}

export interface PostedByProps extends UserProps {
  image?: string;
}
export interface UserProps {
  userName?: string;
  image?: string;
  _id?: string;
  _type?: string;
  _ref?: string;
  //sub: string;
}

export interface ImageProps {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
    url: string;
  };
}
