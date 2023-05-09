import {Component} from 'react';
import css from './App.module.css';
import Form from './Form/Form';
import ContactsList from './Contacts/ContactsList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';

const LS_KEY = "contact";
console.log(LS_KEY)
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount(){
    console.log('MOUNT');
    const savedState = localStorage.getItem(LS_KEY);
    console.log(savedState);
    if(savedState) {
      this.setState({contacts: JSON.parse(savedState)})
    }
    
  }

  componentDidUpdate(_, prevState) {
    
  
}
  
  addContact = ({name, number}) => {
    const existName = this.state.contacts
    .map(contact => contact.name.toUpperCase())
    .includes(name.toUpperCase())

    if(existName) {
      alert(`${name} is elready in contacts!)`)
      return
    } else {
    const newContact= {
      id: nanoid(),
      name,
      number
    }
    
    this.setState(({contacts}) => ({
      contacts: [newContact, ...contacts],
    }
    
    ))
  }
  };

  changeFilter = e => { this.setState({filter: e.currentTarget.value});}
  
  getVisibleContacts = () => {
    const {contacts, filter} = this.state;
    const normalizedFilter = filter.toLowerCase();

    return (contacts.filter(contact => {
      return (contact.name.toLowerCase().includes(normalizedFilter));
    }))
  };

  deleteContact = contactID => {
    this.setState(prevState => ({
     contacts: prevState.contacts.filter(contact => contact.id !== contactID)
    }));

  };

  formSubmitHandler = data => {
    console.log(data)
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

  return (
    <div className={css.appContainer}>
      <h1>Phonebook</h1>
      <Form onSubmit={this.addContact}/>
      <h2>Contacts</h2>
      <Filter text='Search by name' value={this.state.filter} onChange={this.changeFilter}/>
      <ContactsList contacts={visibleContacts} deleteContact={this.deleteContact}/>
    </div>
  );
  }
};


