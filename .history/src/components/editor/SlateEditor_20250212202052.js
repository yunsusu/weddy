import React, { useMemo, useState, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

const Editor = () => {
  // Slate editor 인스턴스 생성
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  
  // 문서 상태
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '슬레이트 에디터를 시작하세요!' }],
    },
  ]);

  // Editable 컴포넌트에서의 내용 변경 처리
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
