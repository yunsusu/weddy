'use client';

import { useState } from "react";
import { create }

export default function SlateEditor() {
  const [ editor ] = useState(() => withReact(createEditor()));
}