import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/hooks';
import { closeToast, createToast } from '../../store/features/toast/toast-slice';

export const useToast = (id: number) => {
  const dispatch = useAppDispatch();
  let timer: NodeJS.Timeout;

  useEffect(() => {
    timer = setTimeout(() => dispatch(closeToast(id)), 5000);
  }, []);

  const closeModal = () => {
    clearTimeout(timer);
    dispatch(closeToast(id));
  };

  return { closeModal };
};


export const useOpenToast = () => {
  const dispatch = useAppDispatch();

  return (text: string, error: boolean) => {
    dispatch(createToast({ text, error }));
  };
}