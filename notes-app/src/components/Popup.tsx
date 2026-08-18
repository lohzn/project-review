import { useState } from "react";
import type { PopupProps } from "../types/popup";

function Popup({ noteId, initialTitle, onSaveTitle, onClose }: PopupProps) {
  const [titleInput, setTitleInput] = useState(initialTitle);

  // Function to handle saving the title of the note
  async function handleSave() {
    const trimmedTitle = titleInput.trim();
    await onSaveTitle(
      noteId,
      trimmedTitle.length > 0 ? trimmedTitle : "Untitled Note",
    );
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 text-gray-900 shadow-xl">
        <h1 className="text-2xl font-bold">Enter name of note</h1>
        <input
          id="note-title"
          type="text"
          placeholder="Note title"
          className="mt-4 w-full rounded border p-2"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <div className="mt-4 flex gap-2">
          <button
            className="inline-flex h-8 items-center justify-center rounded-2xl bg-blue-900 px-3 text-sm text-white hover:bg-blue-800"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="inline-flex h-8 items-center justify-center rounded-2xl bg-gray-200 px-3 text-sm hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
