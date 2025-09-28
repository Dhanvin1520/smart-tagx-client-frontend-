import axios from 'axios';

export interface TagResponse {
  tags: string[];
  success: boolean;
  message: string;
}

const RAW_API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
// Normalize: remove any trailing slashes to avoid double '//' when joining paths
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, '');

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

export async function generateTags(text: string): Promise<TagResponse> {
  const response = await client.post<TagResponse>(`/api/generate-tags`, { text });
  return response.data;
}


