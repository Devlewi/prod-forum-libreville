declare module 'basiclightbox' {
  export function create(html: string | HTMLElement): {
    show: () => void;
    close: () => void;
    visible: () => boolean;
    element: () => HTMLElement;
  };
}
