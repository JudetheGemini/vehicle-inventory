import { create } from "zustand";
import type { AuthUser } from "aws-amplify/auth";

interface saveUser {
  test: string;
  setUserId: (id: string) => void;
  setUsername: (userName: string) => void;
  setTest: (test: string) => void;
}

type CombinedState = AuthUser & saveUser;

interface vehicleDataStore {
  totalVehicles: number;
  setTotalVehicles: (total: number) => void;
}

const useVehicleStore = create<vehicleDataStore>()((set) => ({
  totalVehicles: 0,
  setTotalVehicles: (total: number) =>
    set((state) => ({ totalVehicles: total })),
}));

const useLoginStore = create<CombinedState>()((set) => ({
  userId: "",
  username: "",
  test: "000",
  setUserId: (id: string) => set((state) => ({ userId: id })),
  setUsername: (userName: string) => set((state) => ({ username: userName })),
  setTest: (test: string) => set((state) => ({ test: test })),
}));

export { useLoginStore, useVehicleStore };
