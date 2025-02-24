import amount from "@/../public/icons/amount-icon.png";
import date from "@/../public/icons/date.svg";
import deleteIcon from "@/../public/icons/deleteRed.svg";
import detail from "@/../public/icons/detail-icon.png";
import assignee from "@/../public/icons/people.svg";
import { addSmallCard, getCard } from "@/lib/apis/workSpace";
import classNames from "classnames/bind";
import Image from "next/image";
import ProgressModal from "./ProgressModal";
import styles from "./style.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "@/lib/apis/deleteItem";
import React, { useEffect, useRef, useState } from "react";
import useSideMenuValStore from "@/lib/store/sideMenuValue";

const cn = classNames.bind(styles);

type Payload = {
  checklistId: number;
  largeCatItemId: number;
  smallCatItemId: any;
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
    checklistId: number;
    id: number;
    largeCatItemId: number;
    title: string;
    dueDate: string;
    assigneeName: string;
    body?: string;
    statusName: string;
    amount?: number;
  };
  ids: {
    checklistId?: number;
    largeCatItemId?: number;
    smallCatItemId?: number;
  }
  onDeleteSuccess: () => void;
};


export default function CheckListPage({ onClose, item, ids, onDeleteSuccess }: CheckListPageProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [ cardId, setCardId ] = useState<number>(1);
  const [ cardLength, setCardLength ] = useState<number>(0);
  const [ card, setCard ] = useState([]);
  const { sideMenuValue, setSideMenuValue } = useSideMenuValStore();

  const [formData, setFormData] = React.useState({
    title: item.title || "",
    dueDate: item.dueDate || "",
    assigneeName: item.assigneeName || "미지정",
    body: item.body || "",
    statusName: item.statusName || "진행 중",
    amount: item.amount || 0,
  });

  const { data: cardDatas, isSuccess } = useQuery({
    queryKey: ["cardData", cardId, cardLength],
    queryFn: () => getCard(cardId),
  });

  const { mutate: addSmallItem, isLoading }: any = useMutation({
    mutationFn: (payload: Payload) => addSmallCard(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["cardData", cardId, cardLength] });
    },
    onError: (error: Error) => {
      console.error("에러 발생:", error);
      alert("저장 중 오류가 발생했습니다.");
    },
  });

  useEffect(() => {
    if (isSuccess && cardDatas) {
      setCard(cardDatas);
      setFormData(prev => ({
        ...prev,
        ...cardDatas,
        amount: prev.amount || cardDatas.amount || 0
      }));
      setSideMenuValue(cardDatas);
    }
  }, [isSuccess, cardDatas]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
  };

  const { mutate: deleteItemMutate } = useMutation({
    mutationFn: () => {
      if (!ids.checklistId || !ids.largeCatItemId || !ids.smallCatItemId) {
        throw new Error('ids가 없습니다');
      }
      
      return deleteItem(
        ids.checklistId,
        ids.largeCatItemId,
        ids.smallCatItemId
      );
    },
    onSuccess: () => {
      onDeleteSuccess();
      alert("성공적으로 삭제되었습니다.");
      onClose();
    },
    onError: (error) => {
      console.error('Delete failed:', error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  });

  const handleDelete = () => {
    if (!ids.checklistId || !ids.largeCatItemId || !ids.smallCatItemId) {
      alert("삭제할 항목의 필수 데이터가 없습니다.");
      return;
    }

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      deleteItemMutate();
    }
  };  

  const handleProgressChange = (newStatus: string) => {
    setFormData((prev) => ({
      ...prev,
      statusName: newStatus,
    }));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ids.checklistId || !ids.largeCatItemId) {
      alert("필수 데이터가 누락되었습니다.");
      console.log(ids.checklistId, ids.largeCatItemId)
      return;
    }

    const payload: Payload = {
      checklistId: ids?.checklistId,
      largeCatItemId: ids?.largeCatItemId,
      smallCatItemId: ids?.smallCatItemId,
      title: formData.title,
      dueDate: formData.dueDate || new Date().toISOString().split("T")[0],
      assigneeName: formData.assigneeName,
      body: formData.body,
      statusName: formData.statusName,
      amount: typeof formData.amount === 'string' ? parseInt(formData.amount, 10) : formData.amount || 0,
    };

    try {
      await addSmallItem(payload); // 데이터 저장
      const updatedData = await getCard(cardId);
      if (updatedData) {
        setCard(updatedData);
        setFormData(prev => ({
          ...prev,
          ...updatedData 
        }));
      }
    } catch (error) {
      console.error("저장 후 데이터 갱신 실패:", error);
      alert("저장 후 데이터를 불러오는 중 오류가 발생했습니다.");
    }
  }

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
            <input type="number" onChange={handleChange} value={formData.amount} name="amount" placeholder="금액을 입력하세요." />
            <span>원</span>
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
