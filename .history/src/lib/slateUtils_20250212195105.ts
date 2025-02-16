import { Editor } from "slate";

interface Editor {
  editor: any;
  format: string;
}

export const toggleMark = ({editor, format}: Editor) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = ( editor, format ) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};