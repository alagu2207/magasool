import { useWindowDimensions } from 'react-native';

export type Responsive = {
  width: number;
  isMobile: boolean; // < 768
  isTablet: boolean; // 768 - 1023
  isDesktop: boolean; // >= 1024
};

/** Single source of truth for breakpoints used across the static site. */
export function useResponsive(): Responsive {
  const { width } = useWindowDimensions();
  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
}
