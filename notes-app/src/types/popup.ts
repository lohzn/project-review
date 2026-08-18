export interface PopupProps {
  noteId: string;
  initialTitle: string;
  onSaveTitle: (noteId: string, title: string) => Promise<void> | void;
  onClose: () => void;
}
