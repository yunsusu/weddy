import { Editor } from "slate";

interface SlateEditor {
  editor: Editor;
  format: any;
}

export const toggleMark = ( editor: Editor, format:string ) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = ( editor: Editor, format:string ) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};