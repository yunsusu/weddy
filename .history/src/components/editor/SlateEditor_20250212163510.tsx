'use client';

import { useState } from "react";
import { createEditor } from 'slate'

export default function SlateEditor() {
  const [ editor ] = useState(() => withReact(createEditor()));
}