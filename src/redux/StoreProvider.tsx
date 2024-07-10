"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { PersistGate } from "redux-persist/integration/react";

/**
 *  Create a new "client" component
 *  that will create the store &
 *  share it using the React-Redux Provider component.
 */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={storeRef.current.__persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
