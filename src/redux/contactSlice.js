import { createSlice, nanoid } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';
const contactsInitialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const contactSlice = createSlice({
  // Имя слайса
  name: 'contacts',
  // Начальное состояние редюсера слайса
  initialState: {
    contactsInitialState,
  },
  // Объект редюсеров
  reducers: {
    addContact: (state, action) => [...state, action.payload],

    removeContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

// Генераторы экшенов
export const { addContact, removeContact } = contactSlice.actions;

// Редюсер слайса
export default contactSlice.reducer;
