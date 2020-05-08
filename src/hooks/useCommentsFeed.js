import React from 'react';
import { api } from 'utils';

const createComment = ({ name, message }) => api.post('/api/createComment', { name, message });

function useCommentsFeed() {
  const [status, setStatus] = React.useState('loading');
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  // Fetch initial comments data
  React.useEffect(() => {
    api
      .get('/api/getComments')
      .then((comments) => {
        setData(comments);
        setStatus('success');
      })
      .catch((e) => {
        setError(e?.message ?? 'Unknown error occured');
        setStatus('error');
      });
  }, []);

  // Establish a long-polling connection to fetch live feed
  React.useEffect(() => {
    let timeout;
    const subscribe = () => {
      api
        .get('/api/comments/subscribe')
        .then((comments) => {
          setData(comments);
          subscribe();
        })
        .catch((e) => {
          setError(e?.message ?? 'Unknown connection error');
          timeout = setTimeout(subscribe, 3000); // attempt to reconnect in 3 seconds
        });
    };
    subscribe();

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, []);

  return {
    status,
    data,
    error,
    actions: {
      createComment,
    },
  };
}

export default useCommentsFeed;
