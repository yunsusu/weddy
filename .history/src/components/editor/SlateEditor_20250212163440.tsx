'use client';

import { useState } from "react";

export default function SlateEditor() {
  const [ editor ] = useState(() => withReact(createEditor()));
}