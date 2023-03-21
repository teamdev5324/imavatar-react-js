import { toast } from 'react-toastify';

export const successMessage = (title: string) =>
  toast.success(title, {
    position: 'top-right',
  });
export const errorMessage = (title: string) =>
  toast.error(title, {
    position: 'top-right',
  });
export const warnMessage = (title: string) =>
  toast.warn(title, {
    position: 'top-right',
  });
