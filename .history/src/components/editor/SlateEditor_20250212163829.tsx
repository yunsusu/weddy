'use client';

import { useState } from "react";
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import styles from "@/styles/editor.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function SlateEditor() {
  const [ editor ] = useState(() => withReact(createEditor()));
  const [ value, setValue ] = useState([
    { type: "paragraph", children: [{ text: "내용을 입력해주세요." }] },
  ]);

  return (
    <div></div>
  )


}