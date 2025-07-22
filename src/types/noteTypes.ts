export interface Note {
  id: string;
  title: string;
  description: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateNoteDto {
  title: string;
  description: string;
}

export interface UpdateNoteDto {
  title?: string;
  description?: string;
}

export interface NotesApi {
  getAllNotes: () => Promise<Note[]>;
  createNote: (noteData: CreateNoteDto) => Promise<Note>;
  updateNote: (id: string, noteData: UpdateNoteDto) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
}

export type CardModel = Note;
