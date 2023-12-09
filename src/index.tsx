import { i18n, Language } from "@/Localization";
import store from "@/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Localization from "expo-localization";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { Provider } from "react-redux";
import { ApplicationNavigator } from "./Navigation";


i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = Language.ENGLISH;

const queryClient = new QueryClient();

export default function App() {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <ApplicationNavigator />
        </Provider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
