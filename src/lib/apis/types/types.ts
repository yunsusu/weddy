export interface SmallCatItem {
  checklistId: number;
  id: number;
  largeCatItemId: number;
  title: string;
  dueDate: string;
  assigneeName: string;
  statusName: string;
  amount: number;
  body: string;
  attachedFileUrl: string;
}

export interface LargeCatItem {
  id: number;
  checklistId: number;
  title: string;
  smallCatItems: SmallCatItem[];
}