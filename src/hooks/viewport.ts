import { useCallback, useEffect, useState } from "react";

export type ViewPort = 'mobile' | 'web'

type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const getBreakpoint = (width: number): BreakpointKey => {
  if (width < 600) return 'xs';
  if (width < 960) return 'sm';
  if (width < 1280) return 'md';
  if (width < 1920) return 'lg';
  return 'xl';
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>(getBreakpoint(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = getBreakpoint(window.innerWidth);
      setBreakpoint(newBreakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const is = useCallback((keys: BreakpointKey[]) => keys.includes(breakpoint), [breakpoint])

  return { value: breakpoint, is };
};


export function useViewPort(): ViewPort {
  return 'web'
}