// All API calls for the posts feature live here.
// In a real app each feature would have its own api file (e.g. users.ts, orders.ts).
import axios from 'axios';

// The base URL is in one place — easy to swap for a real API later
const API_URL = 'https://jsonplaceholder.typicode.com';

// The type describes the shape of the data coming from the server
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// The fetcher is just an async function — TanStack Query calls it for you
export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get<Post[]>(`${API_URL}/posts?_limit=6`);
  return data;
};
