import styled from "styled-components";
import { Sidebar } from "./components/sidebar";
import { Button } from "./components/button";
import { Input } from "./components/input";

function App() {
  return (
    <styles.app>
      <Sidebar />
      <styles.container>
        <styles.content>
          <styles.leftPart></styles.leftPart>
          <styles.body>
            <styles.title>
              <Button variant="secondary" size="small">
                <Button.Icon name="chevron-left" />
              </Button>
              <styles.titleText>Your folder</styles.titleText>
              <Button variant="secondary" size="small">
                <Button.Icon name="folder-plus" />
              </Button>
            </styles.title>
          </styles.body>
          <styles.rightPart>
            <Input>
              <Input.Icon name="search" />
              <Input.Content placeholder="Search..." />
            </Input>
          </styles.rightPart>
        </styles.content>
        <styles.footer>footer</styles.footer>
      </styles.container>
    </styles.app>
  );
}

const styles = {
  // App area
  leftPart: styled.aside`
    flex: 1;
  `,
  body: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    max-width: var(--t2-container-width-md);
    padding-inline: var(--t2-content-horizontal);
    padding-block: var(--t2-content-vertical);
  `,
  rightPart: styled.aside`
    flex: 1;

    padding-inline: var(--t2-content-horizontal);
    padding-block: var(--t2-content-vertical);
  `,
  title: styled.div`
    display: flex;
  `,
  titleText: styled.h1`
    flex: 1;
    padding: 0px;
    margin: 0px;
    font-weight: 400;

    text-align: center;
    font-size: var(--typography-size-lg);
    font-family: var(--typography-family-title);
    line-height: var(--typography-line-height-lg);
  `,

  // Footer
  footer: styled.footer`
    display: flex;

    background-color: var(--colors-light);
  `,

  // Layout Wrappers
  app: styled.div`
    height: 100vh;
    display: flex;
  `,
  container: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  content: styled.div`
    flex: 1;
    display: flex;

    background-color: var(--t2-body);
  `,
} as const;

export default App;
