import { push } from 'notivue';

export const useToast = () => {
  return {
    success(message: string, title?: string) {
      push.success({ title, message });
    },
    error(message: string, title?: string) {
      push.error({ title, message });
    },
    info(message: string, title?: string) {
      push.info({ title, message });
    },
    warning(message: string, title?: string) {
      push.warning({ title, message });
    }
  };
};
