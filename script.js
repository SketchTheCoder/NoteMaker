const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");
const toggleBtn = document.getElementById("dark");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Load and display notes on page load
getNotes().forEach(note => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

// Add new note on button click
addNoteButton.addEventListener("click", () => {
  addNote();
});

function getNotes() {
  return JSON.parse(localStorage.getItem("NoteMaker") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("NoteMaker", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Note...";

  // Save updated note
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  // Delete on double-click
  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Are you sure you want to delete this note?");
    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.find(note => note.id === id);
  if (targetNote) {
    targetNote.content = newContent;
    saveNotes(notes);
  }
}

function deleteNote(id, element) {
  const notes = getNotes().filter(note => note.id !== id);
  saveNotes(notes);
  notesContainer.removeChild(element);
}

