import amount from "@/../public/icons/amount-icon.png";
import date from "@/../public/icons/date.svg";
import deleteIcon from "@/../public/icons/deleteRed.svg";
import detail from "@/../public/icons/detail-icon.png";
import assignee from "@/../public/icons/people.svg";
import { addSmallCard, deleteItem } from "@/lib/apis/workSpace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import React, { useRef } from "react";
import ProgressModal from "./ProgressModal";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

type Payload = {
  checklistId: number;
  largeCatItemId: number;
  title: string;
  dueDate: string;
  assigneeName: string;
  body: string;
  statusName: string;
  amount: number;
};

type CheckListPageProps = {
  onClose: () => void;
  item: {
    checklistId?: number;
    id?: number;
    largeCatItemId?: number;
    title?: string;
    dueDate?: string;
    assigneeName?: string;
    body?: string;
    statusName?: string;
    amount?: number;
  };
};

export default function CheckListPage({ onClose, item }: CheckListPageProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const [formData, setFormData] = React.useState({
    title: item.title || "",
    dueDate: item.dueDate || "",
    assigneeName: item.assigneeName || "미지정",
    body: item.body || "",
    statusName: item.statusName || "진행 중",
    amount: item.amount || 0,
  });

  const { mutate: addSmallItem, isLoading }: any = useMutation({
    mutationFn: (payload: Payload) => addSmallCard(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cardData"] });
      onClose();
    },
    onError: (error: Error) => {
      console.error("에러 발생:", error);
      alert("저장 중 오류가 발생했습니다.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleDelete = async () => {
    if (!item.checklistId || !item.largeCatItemId || !item.id) {
      alert("삭제할 항목의 필수 데이터가 없습니다.");
      console.log(item.checklistId, item.largeCatItemId, item.id);
      return;
    }

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteItem(item.checklistId, item.largeCatItemId, item.id);
      alert("삭제되었습니다.");
      onClose(); // 삭제 후 모달 닫기
    } catch (error) {
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleProgressChange = (newStatus: string) => {
    setFormData((prev) => ({
      ...prev,
      statusName: newStatus,
    }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: Payload = {
      checklistId: item.checklistId || 0,
      largeCatItemId: item.largeCatItemId || 0,
      title: formData.title,
      dueDate: formData.dueDate || new Date().toISOString().split("T")[0],
      assigneeName: formData.assigneeName,
      body: formData.body,
      statusName: formData.statusName,
      amount: formData.amount,
    };
    addSmallItem(payload);
  };

  return (
    <div className={cn("checkModalWrap")} ref={modalRef}>
      <div className={cn("modalNav")}>
        <button onClick={onClose}>→</button>
        <button className={cn("trashIcon")} onClick={handleDelete}>
          <Image
            src={deleteIcon}
            alt="소분류 삭제하기"
            width={24}
            height={24}
          />
        </button>
      </div>

      <div className={cn("modalContents")}>
        <ProgressModal item={item} onChange={handleProgressChange} />
        <form className={cn("modalForm")} onSubmit={handleSave}>
          <h2>
            {formData.title ? (
              formData.title
            ) : (
              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="제목을 입력하세요."
                onChange={handleChange}
              />
            )}
          </h2>
          <div className={cn("assignee", "label")}>
            <Image src={assignee} alt="담당자" width={16} height={16} />
            <p>담당자</p>
          </div>
          <div className={cn("people")}>
            <div>{formData.assigneeName}</div>
            <div>김지연</div>
          </div>
          <div className={cn("date", "label")}>
            <Image src={date} alt="날짜" width={16} height={16} />
            {formData.dueDate ? (
              <p>{formData.dueDate} 까지</p>
            ) : (
              <input
                type="date"
                onChange={handleChange}
                value={formData.dueDate}
                name="dueDate"
                placeholder="날짜를 선택하세요."
              />
            )}
          </div>
          <div className={cn("amount", "label")}>
            <Image src={amount} alt="금액" width={16} height={16} />
            {formData.amount ? (
              <p>{formData.amount} 원</p>
            ) : (
              <input
                type="number"
                onChange={handleChange}
                value={formData.amount}
                name="amount"
                placeholder="금액을 입력하세요."
              />
            )}
          </div>
          <div className={cn("label")}>
            <Image src={detail} alt="내용" width={16} height={16} />
            <p>내용</p>
          </div>

          <div>
            <div className={cn("modalDetail")}>
              <textarea
                name="body"
                value={formData.body}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, body: e.target.value }))
                }
                placeholder="내용을 입력하세요."
                rows={4}
              />
            </div>
            <div className={cn("modalFooter")}>
              <div className={cn("footerContents")}></div>
              <button
                type="submit"
                className={cn("saveBtn")}
                disabled={isLoading}
              >
                {isLoading ? "저장 중..." : "저장하기"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
