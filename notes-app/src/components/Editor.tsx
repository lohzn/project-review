import MDEditor from "@uiw/react-md-editor";
import type { EditorProps } from "../types/editor";

function Editor({ tempNoteText, setTempNoteText }: EditorProps) {
  const value = tempNoteText;

  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={(val) => setTempNoteText(val ?? "")}
        height={400}
      />
      <MDEditor.Markdown source={value} className="whitespace-pre-wrap" />
    </div>
  );
}

export default Editor;
