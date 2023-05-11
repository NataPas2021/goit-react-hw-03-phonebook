import css from './ContactsList.module.css'
import PropTypes from 'prop-types';

const ContactsList = ({contacts, deleteContact}) => {
 return (
    <>
    <ul>
        {contacts.map(({id, name, number}) => {
         return (
              <li key={id}
                  className={css.contact}
                 >
                {name}: {number}
                <button type='button'
                 className={css.deleteButton}
                 onClick={()=> deleteContact(id)}>Delete
                </button>
              </li>
         )
        })
        } 
    </ul>
    </> 
 )
};

export default ContactsList;

ContactsList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })).isRequired,
    deleteContact: PropTypes.func.isRequired,
}