"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import PocketBase, { AuthModel } from "pocketbase";

interface PocketContextInterface {
  pb?: PocketBase;
  user: AuthModel;
  initialized: boolean;
  loginWithProvider: (provider: string) => Promise<void>;
  logout: () => void;
}

const PocketContext = createContext<PocketContextInterface>({
  initialized: false,
  user: null,
  loginWithProvider: async () => undefined,
  logout: () => undefined,
});

export const PocketProvider = ({ children }: PropsWithChildren) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_HOST);

  const [user, setUser] = useState<AuthModel>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setUser(pb.authStore.model);
    setInitialized(true);
  }, []);

  useEffect(() => {
    // todo: what cookie??
    // send back the default 'pb_auth' cookie to the client with the latest store state
    pb.authStore.onChange(() => {
      setUser(pb.authStore.model ?? null);
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        pb.authStore.isValid && (await pb.collection("users").authRefresh());
      } catch (e: any) {
        if (e.message.includes("autocancelled")) return;
        // clear the auth store on failed refresh
        pb.authStore.clear();
      }
    })();
  }, []);

  async function loginWithProvider(provider: string) {
    await pb?.collection("users").authWithOAuth2({ provider: "google" });
    setUser(pb.authStore.model);
  }

  function logout() {
    pb?.authStore.clear();
    setUser(null);
  }

  return (
    <PocketContext.Provider
      value={{ pb, user, initialized, logout, loginWithProvider }}
    >
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => {
  const ctx = useContext(PocketContext);
  if (ctx === null) {
    throw "usePocket should only be used within PocketProvider";
  }

  return ctx;
};
