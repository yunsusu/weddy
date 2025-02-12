'use client';

import { useState } from "react";
import { createEditor } from 

export default function SlateEditor() {
  const [ editor ] = useState(() => withReact(createEditor()));
}