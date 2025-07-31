import { useBreakpoint, useViewPort } from "./viewport";

export function useIsRootWebDesign() {
  const viewPort = useViewPort();
  const breakpoint = useBreakpoint();
  return viewPort === "web" && breakpoint.is(["md", "lg"]);
}
