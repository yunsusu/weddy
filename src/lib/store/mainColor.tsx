import { create } from "zustand";

// 상태와 액션을 정의하는 인터페이스
interface WorkSpaceState {
  color: string;
  setColor: (text: string) => void;
}

const useColorStore = create<WorkSpaceState>((set) => ({
  color: "#7034f3", // 초기 상태
  setColor: (text) => set({ color: text }), // 상태 업데이트
}));

export default useColorStore;
