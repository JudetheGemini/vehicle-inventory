import { createStore } from "zustand";
import type { AuthUser } from "aws-amplify/auth";

export interface VehicleData {
  totalVehicles: number;
}

export interface VehicleDataAction {
  setTotalVehicles: (total: number) => void;
}

export type VehicleStore = VehicleData & VehicleDataAction;

export const initState = (): VehicleData => {
  return { totalVehicles: 0 };
};

export const defaultInitState: VehicleData = {
  totalVehicles: 0,
};

export const createVehicleStore = (
  initState: VehicleData = defaultInitState
) => {
  return createStore<VehicleStore>()((set) => ({
    ...initState,
    setTotalVehicles: (total: number) => set(() => ({ totalVehicles: total })),
  }));
};
