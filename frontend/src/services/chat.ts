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
  onChunkReceived: (chunk: string) => void,
) => {
  return axios.post(
    '/chat',
    {
      prompt,
      data: data || '',
      stream: true,
    },
    {
      responseType: 'stream',
      headers: {
        Accept: 'text/event-stream',
        'Content-Type': 'application/json',
      },
      onDownloadProgress: (progressEvent) => {
        const chunk = progressEvent.event.target.response;
        onChunkReceived(chunk);
      },
    },
  );
};
