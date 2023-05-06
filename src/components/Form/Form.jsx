import {Component} from 'react';
import {nanoid} from 'nanoid';
import css from './Form.module.css';
import PropTypes from 'prop-types';

class Form extends Component {
    state = {
        name: '',
        number: ''
    };
    
    inputNameId = nanoid();
    inputNumberId = nanoid();
    
    handleChange = e => {
      console.log(e.currentTarget)
      const {name, value} = e.currentTarget;
      this.setState({[name]: value})
    };

    handleSubmit = e => {
      e.preventDefault();
      this.props.onSubmit(this.state);
      this.reset();
      
    };

    reset = () => {
      this.setState({name: '',
        number: ''})
    }

    render() {
    return (
     <form onSubmit={this.handleSubmit}>
        <label htmlFor={this.inputNameId} className={css.label}>Name</label>
        <input className={css.input}
             type="text"
             name="name"
             value={this.state.name}
             id={this.inputNameId}
             onChange={this.handleChange}
             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
             required
        />
        
        <label htmlFor={this.inputNumberId} className={css.label}>Phone</label>
        <input className={css.input}
             type="tel"
             name="number"
             value={this.state.number}
             id={this.inputNumberId}
             onChange={this.handleChange}
             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
             required
        />
       
        <button type="submit" className={css.addButton}>Add contact</button>
    </form>
        );
    }
};

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}