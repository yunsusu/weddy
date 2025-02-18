import { create } from "zustand";

// 상태와 액션을 정의하는 인터페이스
interface WorkSpaceState {
  sideMenuValue: any;
  setSideMenuValue: (text: any) => void;
}

const useSideMenuValStore = create<WorkSpaceState>((set) => ({
  sideMenuValue: [], // 초기 상태
  setSideMenuValue: (text) => set({ sideMenuValue: text }), // 상태 업데이트
}));

export default useSideMenuValStore;
