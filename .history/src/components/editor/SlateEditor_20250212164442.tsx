'use client';

import { useState } from "react";
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import styles from "./style.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function SlateEditor() {
  const [ editor ] = useState(() => withReact(createEditor()));
  const [ value, setValue ] = useState([
    { type: "paragraph", children: [{ text: "내용을 입력해주세요." }] },
  ]);

  return (
    <div className={cn("editorContainer")}>
      <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
        <Toolbar editor={editor} />
        <Editable className={cn("editorEditable")} renderElement={RenderElement} rederLeaf={RenderLeaf} />
      </Slate>
    </div>
  )


}