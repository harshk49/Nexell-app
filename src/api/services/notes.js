import api from "../config";

export const notesService = {
  // Create a new note with the given data
  createNote: async (noteData) => {
    const response = await api.post("/notes", noteData);
    return response.data;
  },

  // Retrieve all notes
  getAllNotes: async () => {
    const response = await api.get("/notes");
    return response.data;
  },

  // Fetch a single note by its ID
  getNoteById: async (noteId) => {
    const response = await api.get(`/notes/${noteId}`);
    return response.data;
  },

  // Update an existing note by ID with new data
  updateNote: async (noteId, updatedData) => {
    const response = await api.put(`/notes/${noteId}`, updatedData);
    return response.data;
  },

  // Delete a note by its ID
  deleteNote: async (noteId) => {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  },
};
