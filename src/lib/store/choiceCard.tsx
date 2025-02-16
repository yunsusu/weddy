import { create } from "zustand";

// 상태와 액션을 정의하는 인터페이스
interface WorkSpaceState {
  choiceCard: string;
  setChoiceCard: (text: string) => void;
}

const useCardStore = create<WorkSpaceState>((set) => ({
  choiceCard: "", // 초기 상태
  setChoiceCard: (text) => set({ choiceCard: text }), // 상태 업데이트
}));

export default useCardStore;
