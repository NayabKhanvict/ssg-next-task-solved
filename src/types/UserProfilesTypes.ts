export interface PersonProfile {
  user: User;
}
export interface User {
  backgroundImageUrl: string;
  profilePictureUrl: string;
  name: string;
  title: string;
  metrics: {
    followers: number;
    following: number;
  };
}
