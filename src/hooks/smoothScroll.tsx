import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const smoothScroll = (offset: number = 70) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>('');

  useEffect(() => {
    setActiveLink(location.hash);
  }, [location]);

  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    event.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset;
      const yOffset = -offset;
      window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });

      // Update the URL hash without jumping
      window.history.pushState({}, '', `#${targetId}`);
    }
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      const sections = document.querySelectorAll<HTMLElement>('section');
      let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

      sections.forEach((section) => {
        if (
          section.offsetTop - offset - 1 <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveLink(`#${section.id}`);
        }
      });
    };

    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [offset]);

  return { activeLink, handleScroll };
};

export default smoothScroll;
