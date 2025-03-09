import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태와 액션을 정의하는 인터페이스
interface WorkSpaceState {
  userData: any;
  setUserData: (text: any) => void;
}

const useUserDataStore = create<WorkSpaceState>()(
  persist(
    (set) => ({
      userData: [], // 초기 상태
      setUserData: (text) => set({ userData: text }), // 상태 업데이트
    }),
    {
      name: "userData-storage", // 로컬스토리지에 저장될 키 이름
    }
  )
);

export default useUserDataStore;
