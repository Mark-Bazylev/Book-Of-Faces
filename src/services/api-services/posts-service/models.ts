export interface Post {
  _id:string;
  content: string;
  likes: [string];
  createdAt: string;
  updatedAt: string;
  commentsLength:number;
}
