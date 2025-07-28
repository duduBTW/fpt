import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import styled from "styled-components";
import { Sidebar } from "../components/sidebar";

export const Route = createRootRoute({
  component: () => (
    <>
      <styles.app>
        <Sidebar />
        <styles.container>
          <Outlet />
        </styles.container>
      </styles.app>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});

const styles = {
  app: styled.div`
    height: 100vh;
    display: flex;
  `,
  container: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
} as const;
