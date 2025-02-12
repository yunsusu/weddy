import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const Editor = () => {
  const [ editor ] = useState(() => withReact(createEditor()));
  
  const [content, setContent] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  if (!value) {
    return <div>Loading...</div>;
  }

  return (
    <Slate editor={editor} initialValue={content} onChange={(text) => setContent(text)}>
      <Editable
        placeholder="내용을 입력하세요..."
        style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          minHeight: '200px',
        }}
      />
    </Slate>
  );
};

export default Editor;
