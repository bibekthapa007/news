import "@fontsource/inter";
import { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/toast";

import { Provider } from "react-redux";

import { wrapper } from "store/store";
import { useAppDispatch } from "store/hook";

import { fetchUserData } from "features/auth/AuthSlice";
import { fetchCategories } from "features/category/CategorySlice";

import customTheme from "components/ThemeProvider";

const { ToastContainer } = createStandaloneToast();

function App({ Component, ...rest }: AppProps) {
  const title = Component.displayName || "Sojonews";
  const meta = "Nepal news portal.";

  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <FetchAppData>
        <ChakraProvider theme={customTheme}>
          {/* <CSSReset /> */}
          <Head>
            <title>{title}</title>
            <meta name="description" content={meta} />
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            />
          </Head>
          <ToastContainer />

          <Component {...props.pageProps} />
        </ChakraProvider>
      </FetchAppData>
    </Provider>
  );
}

interface MyProps {
  children?: React.ReactNode;
}

function FetchAppData({ children }: MyProps) {
  let dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchCategories());
  }, [dispatch]);

  return <div>{children}</div>;
}

export default App;
