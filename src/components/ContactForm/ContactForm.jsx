import { useState /*, useEffect */ } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// import { addContact } from '../../redux/actions';
import { addContact } from '../../redux/contactSlice';
import { Form, Label, Input, Btn } from './ContactForm.styled';
import { nanoid } from 'nanoid';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { getContacts } from 'redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // const [formInput, setFormInput] = useState({
  //   name: '',
  //   number: '',
  // });
  // обробник контрольованого інпута в onChange
  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    // setFormInput(prevForm => ({ ...prevForm, [name]: value }));
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };
  const resetForm = () => [setName(''), setNumber('')];

  // const { name, number } = formInput;
  const handleSubmit = event => {
    event.preventDefault();

    const normalizedName = name.toLowerCase();
    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ id: nanoid(10), name, number }));
    toast.success(`Contact ${name}is add phonebook`);

    resetForm();
  };

  // useEffect(() => {
  //   if (contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }
  // }, [contacts]);
  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">
        Name
        <Input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={handleChangeForm}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label htmlFor="name">
        Number
        <Input
          type="tel"
          name="number"
          placeholder="Enter number telephone"
          value={number}
          onChange={handleChangeForm}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Btn type="submit">Add contact</Btn>
    </Form>
  );
};

// ContactForm.propType = {
//   value: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };