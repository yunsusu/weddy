import { create } from "zustand";

interface FilterBox {
  category: Record<string, boolean>; // 키-값 형태의 객체
  progressStatus: Record<string, boolean>;
}

interface WorkSpaceState {
  filterBox: FilterBox;
  setFilterBox: (newFilterBox: FilterBox) => void;
}

const useFilterStore = create<WorkSpaceState>((set) => ({
  filterBox: { category: {}, progressStatus: {} }, // 초기 상태 설정
  setFilterBox: (newFilterBox) => set({ filterBox: newFilterBox }), // 상태 업데이트 함수
}));

export default useFilterStore;
