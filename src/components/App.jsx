import { Component } from "react";
import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import ContactsList from "./ContactsList/ContactsList";
import Filter from "./Filter/Filter";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount = () => {
    const parsedData = JSON.parse(localStorage.getItem("contacts"));

    if (parsedData !== null) {
      this.setState({ contacts: [...parsedData] });
    }
  };

  componentDidUpdate = () => {
    const { contacts } = this.state;
    localStorage.setItem("contacts", JSON.stringify([...contacts]));
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  addContact = (data) => {
    const { contacts } = this.state;
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    )
      return alert(`${data.name} is already in contacts.`);

    this.setState((prev) => ({ contacts: [...prev.contacts, data] }));
  };

  deleteContact = (id) =>
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => contact.id !== id),
    }));

  render() {
    const filteredContacts = this.filteredContacts();
    const { filter } = this.state;

    return (
      <Section title="Phonebook">
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={this.handleChange} />
        <ContactsList
          filteredContacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </Section>
    );
  }
}

export default App;
