'use client';

import { useState } from "react";
import { createEditor } from 'slate';
import { withReact } from 'slate-react';

export default function SlateEditor() {
  const [ editor ] = useState(() => withReact(createEditor()));
  const [ value, setValue ] = useState([
    { type: "paragraph", children: [{ text: "내용을 입력해주세요." }] },
  ])
}