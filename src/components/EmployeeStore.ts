import { create } from "zustand";
import type { Employee } from "../lib/employees";

interface EmployeeState {
  employee: Employee | undefined;
  set: (e: Employee) => void;
}

const useEmployeeStore = create<EmployeeState>()((set) => ({
  employee: undefined,
  set: (e) => set(() => ({ employee: e })),
}))

export default useEmployeeStore;