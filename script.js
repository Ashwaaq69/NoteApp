document.addEventListener('DOMContentLoaded', () => {
    const addNoteButton = document.getElementById('add-note-button');
    const backButton = document.getElementById('back-button');
    const saveNoteButton = document.getElementById('save-note-button');
    const noteListScreen = document.getElementById('note-list-screen');
    const noteDetailScreen = document.getElementById('note-detail-screen');
    const notesContainer = document.getElementById('notes');
    const noteDateInput = document.getElementById('note-date');
    const noteContentInput = document.getElementById('note-content');
    let selectedColor = '#506A86';
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    function displayNotes() {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.style.backgroundColor = note.color;
            noteElement.innerHTML = `
                <h2>Note ${index + 1}</h2>
                <p>${note.content}</p>
                <span>${note.date}</span>
            `;
            noteElement.addEventListener('click', () => {
                openNoteDetail(note, index);
            });
            notesContainer.appendChild(noteElement);
        });
    }

    function openNoteDetail(note, index) {
        noteDateInput.value = note.date;
        noteContentInput.value = note.content;
        selectedColor = note.color;
        noteDetailScreen.style.display = 'flex';
        noteListScreen.style.display = 'none';
        saveNoteButton.onclick = () => {
            saveNote(index);
        };
    }

    function saveNote(index) {
        const updatedNote = {
            date: noteDateInput.value,
            content: noteContentInput.value,
            color: selectedColor
        };
        notes[index] = updatedNote;
        localStorage.setItem('notes', JSON.stringify(notes));
        noteDetailScreen.style.display = 'none';
        noteListScreen.style.display = 'flex';
        displayNotes();
    }

    addNoteButton.addEventListener('click', () => {
        const newNote = {
            date: new Date().toISOString().split('T')[0],
            content: '',
            color: selectedColor
        };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        openNoteDetail(newNote, notes.length - 1);
    });

    backButton.addEventListener('click', () => {
        noteDetailScreen.style.display = 'none';
        noteListScreen.style.display = 'flex';
    });

    document.querySelectorAll('.color-option').forEach(button => {
        button.addEventListener('click', () => {
            selectedColor = button.dataset.color;
        });
    });

    displayNotes();
});
