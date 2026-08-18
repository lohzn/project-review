import "./App.css";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import Popup from "./components/Popup";
import Split from "react-split";
import { useState, useEffect } from "react";
import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { notesCollection } from "./firebase";
import type { Note } from "./types/note";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "");
  const [showPopup, setShowPopup] = useState(false);
  const [tempNotesText, setTempNotesText] = useState("");
  const currentNote = findCurrentNote();

  // Set up a real-time listener for the notes collection
  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesData as Note[]);
    });

    return () => unsubscribe();
  }, []);

  // Update tempNotesText whenever the current note changes
  useEffect(() => {
    if (currentNote) {
      setTempNotesText(currentNote.body);
    }
  }, [currentNote]);

  // Update the note in Firestore when tempNotesText changes, with a debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentNote && tempNotesText !== currentNote.body) {
        updateNote(tempNotesText);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [tempNotesText, currentNote]);

  // Function to create a new note
  const createNewNote = async () => {
    const newNote = {
      body: "## Hello",
      title: "Untitled Note",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const docRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(docRef.id);
    setShowPopup(true);
  };

  // Sort notes by updatedAt in descending order
  const sortNotesByUpdatedAt = () => {
    return [...notes].sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA;
    });
  };

  // Function to update a note's body
  async function updateNote(text: string) {
    const docRef = doc(notesCollection, currentNoteId);
    await updateDoc(docRef, {
      body: text,
      updatedAt: new Date().toISOString(),
    });
  }

  // Function to delete a note
  async function deleteNote(noteId: string) {
    if (!noteId) return;

    const docRef = doc(notesCollection, noteId);
    await deleteDoc(docRef);

    setNotes((oldNotes) => {
      const remainingNotes = oldNotes.filter((note) => note.id !== noteId);

      if (currentNoteId === noteId) {
        setCurrentNoteId(remainingNotes[0]?.id ?? "");
      }

      return remainingNotes;
    });
  }

  // Function to update the title of the current note
  async function updateCurrentNoteTitle(noteId: string, title: string) {
    const trimmedTitle = title.trim();
    const nextTitle = trimmedTitle.length > 0 ? trimmedTitle : "Untitled Note";

    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === noteId
          ? { ...oldNote, title: nextTitle }
          : oldNote;
      }),
    );

    if (!noteId) return;

    const noteDocRef = doc(notesCollection, noteId);
    await updateDoc(noteDocRef, { title: nextTitle });
  }

  // Function to find the current note based on currentNoteId
  function findCurrentNote() {
    return notes.find((note) => note.id === currentNoteId) || notes[0];
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split
          sizes={[30, 70]}
          direction="horizontal"
          className="split flex flex-row h-screen"
        >
          <Sidebar
            notes={sortNotesByUpdatedAt()}
            currentNoteId={currentNoteId}
            setCurrentNoteId={setCurrentNoteId}
            createNewNote={createNewNote}
            deleteNote={deleteNote}
          />
          <Editor
            tempNoteText={tempNotesText}
            setTempNoteText={setTempNotesText}
          />
        </Split>
      ) : (
        <div className="no-notes flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">You have no notes</h1>
          <button
            className="create-note  w-auto border-2 mt-2 rounded-2xl p-2"
            onClick={createNewNote}
          >
            Create one now
          </button>
        </div>
      )}
      {showPopup && currentNote && (
        <Popup
          noteId={currentNoteId}
          initialTitle={currentNote?.title ?? "Untitled Note"}
          onSaveTitle={updateCurrentNoteTitle}
          onClose={() => setShowPopup(false)}
        />
      )}
    </main>
  );
}

export default App;
