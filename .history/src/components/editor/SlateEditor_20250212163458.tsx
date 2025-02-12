'use client';

import { useState } from "react";
import 

export default function SlateEditor() {
  const [ editor ] = useState(() => withReact(createEditor()));
}