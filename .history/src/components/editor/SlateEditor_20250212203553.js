import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { type } from 'os';

const Editor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  
  const [value, setValue] = useState([

  ]);

  useEffect(() => {
    setValue([
      
    ]);
  }, []);

  const handleChange = useCallback(newValue => {
    setValue(newValue);
  }, []);

  if (!value) {
    return <div>Loading...</div>;
  }

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
