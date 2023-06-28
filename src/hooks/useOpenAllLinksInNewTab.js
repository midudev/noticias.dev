import { useEffect } from 'react';

export const useOpenAllLinksInNewTab = () => {
  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.tagName === 'A') {
        event.preventDefault();
        window.open(event.target.href, '_blank');
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);
};
