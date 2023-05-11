import { useState } from 'react';

import { useAppSelector } from '../../hooks/hooks';
import { selectCommentRating } from '../../store/features/comments/selectors';

export const useStars = () => {
  const rating = useAppSelector(selectCommentRating)
    const starsArr = () => {
        const MAX_RATING = 5;
        const arr = [];

        for (let i = 1; i < MAX_RATING + 1; i++) {
          arr.push(i);
        }

        return arr;
      };
    
      const [mouseOnStar, setMouseOnStar] = useState(rating || 0);

      return {
        starsArr,
        mouseOnStar,
        setMouseOnStar
      }
}