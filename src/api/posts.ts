import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get<Post[]>(`${API_URL}/posts?_limit=6`);
  return data;
};
