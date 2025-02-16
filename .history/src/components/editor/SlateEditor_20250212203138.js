import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { type } from 'os';

const Editor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue([
      {
        type: 'paragraph',
        children: [{ text: '슬레이트 에디터를 시작하세요!' }],
      },
    ]).
  }, []);

  const handleChange = useCallback(newValue => {
    setValue(newValue);
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
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
