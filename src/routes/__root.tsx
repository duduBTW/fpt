import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import styled from "styled-components";
import { Sidebar, type SidebarDirection } from "../components/sidebar";
import { useIsRootWebDesign } from "../hooks/root";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const isRootWebDesign = useIsRootWebDesign()
  const direction: SidebarDirection =
    isRootWebDesign ? "column" : "row";

  return (
    <>
      <styles.app data-direction={direction}>
        <Sidebar direction={direction} />
        <styles.container>
          <Outlet />
        </styles.container>
      </styles.app>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}

const styles = {
  app: styled.div`
    height: 100vh;
    display: flex;

     &[data-direction="column"] {
       flex-direction: row;
    }
    &[data-direction="row"] {
      flex-direction: column-reverse;
    }
  `,
  container: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
} as const;
