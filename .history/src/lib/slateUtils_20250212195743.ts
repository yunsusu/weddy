import { Editor } from "slate";

interface SlateEditor {
  editor: Editor;
  format: string;
}

export const toggleMark = ( {editor, format }: SlateEditor) => {
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