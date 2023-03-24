import { RefObject, useEffect } from 'react';

export default function useOutsideClick(ref: RefObject<HTMLElement>, onOutsideClick: () => void): void {
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      onOutsideClick();
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, onOutsideClick]);
}