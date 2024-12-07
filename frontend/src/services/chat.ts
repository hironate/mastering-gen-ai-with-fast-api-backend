import axios from '@/utils/axios';

// Then use it in your API calls
export const getChatHistory = async () => {
  const response = await axios.get('/chat/history');
  return response.data;
};

export const sendMessage = async (
  prompt: string,
  data: string,
  files?: File[],
) => {
  const response = await axios.post('/chat', {
    prompt,
    data,
    files,
    stream: false,
  });
  return response.data;
};

export const sendStreamMessage = async (
  prompt: string,
  data: string,
  model: string,
  onChunkReceived: (chunk: string) => void,
  files?: File[],
) => {
  const formData = new FormData();
  formData.append('prompt', prompt);
  formData.append('data', data || '');
  formData.append('model', model);
  formData.append('stream', 'true');

  if (files) {
    files.forEach((file) => {
      formData.append('files', file);
    });
  }

  return axios.post('/chat', formData, {
    responseType: 'stream',
    headers: {
      Accept: 'text/event-stream',
      'Content-Type': 'multipart/form-data',
    },
    onDownloadProgress: (progressEvent) => {
      const chunk = progressEvent.event.target.response;
      onChunkReceived(chunk);
    },
  });
};
