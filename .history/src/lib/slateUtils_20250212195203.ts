import { Editor } from "slate";

interface EditorSlate {
  editor: any;
  format: any;
}

export const toggleMark = ({editor, format}: EditorSlate) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = ({editor, format}: EditorSlate) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};