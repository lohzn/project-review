import type { Note } from "./note";

export interface sidebarProps {
  notes: Note[];
  currentNoteId: string;
  setCurrentNoteId: (id: string) => void;
  createNewNote: () => void;
  deleteNote: (noteId: string) => void;
}
