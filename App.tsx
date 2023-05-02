import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import {
  REACT_APP_NHOST_SUBDOMAIN,
  REACT_APP_NHOST_REGION,
  REACT_APP_NHOST_BACKEND_URL,
} from "@env";
import { NhostClient, NhostProvider } from "@nhost/react";
import * as SecureStore from "expo-secure-store";

const nhost = new NhostClient({
  backendUrl: REACT_APP_NHOST_BACKEND_URL,
  clientStorage: SecureStore,
  clientStorageType: "expo-secure-storage",
  // subdomain: REACT_APP_NHOST_SUBDOMAIN,
  // region: REACT_APP_NHOST_REGION,
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NhostProvider nhost={nhost}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </NhostProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
