export type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: {
    id: string;
    name: string | null;
    email: string;
    imageUrl: string | null;
  };
  createdAt: string;
  updatedAt: string;
};
