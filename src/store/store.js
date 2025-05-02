export const getState = ({ getStore, getActions, setStore }) => {
    const BASE_URL = "https://playground.4geeks.com/contact";
    const AGENDA_SLUG = "mi_agenda_angelita";

    return {
        store: {
            contacts: []
        },
        actions: {
            // Obtener todos los contactos
            getContacts: async () => {
                try {
                    const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`);
                    const data = await response.json();
                    setStore({ contacts: data.contacts });
                } catch (error) {
                    console.error("Error al obtener contactos:", error);
                }
            },

            // Crear nuevo contacto
            addContact: async (contact) => {
                try {
                    const newContact = {
                        name: contact.name,
                        email: contact.email,
                        address: contact.address,
                        phone: contact.phone
                    };
                    const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newContact)
                    });
                    if (response.ok) {
                        await getActions().getContacts();
                    } else {
                        console.error("Error al crear contacto:", response.status);
                    }
                } catch (error) {
                    console.error("Error al crear contacto:", error);
                }
            },

            // Obtener contacto por ID (filtrando)
            getContactById: async (id) => {
                try {
                    const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`);
                    const data = await response.json();
                    const contact = data.contacts.find(c => c.id == id);
                    return contact || null;
                } catch (error) {
                    console.error("Error al obtener contacto:", error);
                    return null;
                }
            },

            // Actualizar un contacto existente
            updateContact: async (contact) => {
                try {
                    const updatedContact = {
                        name: contact.name,
                        email: contact.email,
                        address: contact.address,
                        phone: contact.phone
                    };
                    const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contact.id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedContact)
                    });
                    if (response.ok) {
                        await getActions().getContacts();
                    } else {
                        console.error("Error al actualizar contacto:", response.status);
                    }
                } catch (error) {
                    console.error("Error al actualizar contacto:", error);
                }
            },

            // Eliminar un contacto
            deleteContact: async (id) => {
                try {
                    const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
                        method: "DELETE"
                    });
                    if (response.ok) {
                        await getActions().getContacts();
                    } else {
                        console.error("Error al eliminar contacto:", response.status);
                    }
                } catch (error) {
                    console.error("Error al eliminar contacto:", error);
                }
            }
        }
    };
};

export default getState;
