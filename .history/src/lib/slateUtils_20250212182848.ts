import { Editor } from "slate";

export const toggleMark = ( editor, format ) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.
  }
}