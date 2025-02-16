import styles from "./style.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

import { Editor, Transforms, Range } from 'slate';
import { useCallback } from 'react';

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const MarkButton = ({ format, children }) => {
  const editor = useSlate();
  
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {children}
    </button>
  );
};
