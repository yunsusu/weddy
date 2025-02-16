import { create } from "zustand";

// 상태와 액션을 정의하는 인터페이스
interface WorkSpaceState {
  searchWord: string;
  setSearchWord: (text: string) => void;
}

const useWorkSpaceStore = create<WorkSpaceState>((set) => ({
  searchWord: "", // 초기 상태
  setSearchWord: (text) => set({ searchWord: text }), // 상태 업데이트
}));

export default useWorkSpaceStore;
