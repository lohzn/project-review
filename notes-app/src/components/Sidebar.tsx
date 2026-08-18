import type { sidebarProps } from "../types/sidebar";

function Sidebar(props: sidebarProps) {
  // Render the list of notes in the sidebar
  const notesElements = props.notes.map((note) => (
    <div key={note.id}>
      <div
        className={`title flex flex-row cursor-pointer rounded-md px-2 py-2 transition-colors ${
          note.id === props.currentNoteId
            ? "bg-sky-600 text-white"
            : "bg-transparent hover:bg-gray-600"
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-sm font-semibold inline-flex items-center justify-center">
          {note.title}
        </h4>
        <button
          className="delete-note ml-auto border border-gray-500 rounded-md bg-red-500 text-white text-sm hover:bg-red-700 px-2 py-1"
          onClick={(e) => {
            e.stopPropagation();
            props.deleteNote(note.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  // Default rendering of the sidebar with a button to create a new note and the list of notes
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <button
        className="create-note w-auto border-2 mt-2 rounded-2xl p-2"
        onClick={props.createNewNote}
      >
        Create New Note
      </button>
      <div className="notes-list mt-4">{notesElements}</div>
    </div>
  );
}

export default Sidebar;
