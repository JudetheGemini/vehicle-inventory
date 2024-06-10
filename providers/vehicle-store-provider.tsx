"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";
import {
  type VehicleStore,
  createVehicleStore,
  initState,
} from "@/stores/vehicle-store";

export const VehicleStoreContext = createContext<StoreApi<VehicleStore> | null>(
  null
);

export interface VehicleStoreProviderProps {
  children: ReactNode;
}

export const VehicleStoreProvider = ({
  children,
}: VehicleStoreProviderProps) => {
  const storeRef = useRef<StoreApi<VehicleStore>>();
  if (!storeRef.current) {
    storeRef.current = createVehicleStore(initState());
  }
  return (
    <VehicleStoreContext.Provider value={storeRef.current}>
      {children}
    </VehicleStoreContext.Provider>
  );
};

export const useVehicleStore = <T,>(
  selector: (store: VehicleStore) => T
): T => {
  const vehicleStoreContext = useContext(VehicleStoreContext);
  if (!vehicleStoreContext) {
    throw new Error(
      "useVehicleStore must be used within a VehicleStoreProvider"
    );
  }
  return useStore(vehicleStoreContext, selector);
};
