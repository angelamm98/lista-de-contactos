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
                    console.log("💡 API data desde getContacts:", data); // Puedes quitar esto luego
                    setStore({ contacts: data.contacts }); // ✅ Aquí está la corrección clave
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

            // Obtener un contacto por ID
            getContactById: async (id) => {
                try {
                    const response = await fetch(`${BASE_URL}/contacts/${id}`);
                    const data = await response.json();
                    return data;
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
                    const response = await fetch(`${BASE_URL}/contacts/${contact.id}`, {
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
                    const response = await fetch(`${BASE_URL}/contacts/${id}`, {
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
