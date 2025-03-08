import { create } from "zustand";

// 상태와 액션을 정의하는 인터페이스
interface WorkSpaceState {
  reRander: number;
  setReRander: any;
}

const useReStore = create<WorkSpaceState>((set) => ({
  reRander: 0, // 초기 상태
  setReRander: () => set((state) => ({ reRander: state.reRander + 1 })),
}));

export default useReStore;
