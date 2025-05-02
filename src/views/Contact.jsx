import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTrash, FaPen } from "react-icons/fa";
import { Context } from "../store/context";

const Contact = () => {
  const { store, actions } = useContext(Context);

  // Asegurarse de que contacts sea un array
  const contacts = Array.isArray(store.contacts) ? store.contacts : [];

  useEffect(() => {
    actions.getContacts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2>Contactos</h2>
        <Link to="/add-contact" className="btn btn-outline-info">Agregar Contacto</Link>
      </div>

      {contacts.length === 0 && (
        <p className="text-center text-muted">No hay contactos aún.</p>
      )}

      {contacts.map((contact) => (
        <div
          className="card mb-4 shadow p-3"
          key={contact.id}
          style={{ maxWidth: "800px", margin: "0 auto", borderRadius: "12px" }}
        >
          <div className="d-flex align-items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random`}
              alt={contact.name}
              className="rounded-circle"
              width="80"
              height="80"
              style={{ objectFit: "cover" }}
            />
            <div className="ms-3 flex-grow-1">
              <h5 className="mb-1">{contact.name}</h5>
              <p className="mb-1 text-dark">
                <FaMapMarkerAlt className="me-2 fa-icon" />
                {contact.address}
              </p>
              <p className="mb-1 text-dark">
                <FaPhone className="me-2 fa-icon" />
                {contact.phone}
              </p>
              <p className="mb-0 text-dark">
                <FaEnvelope className="me-2 fa-icon" />
                {contact.email}
              </p>
            </div>
            <div className="d-flex flex-column justify-content-center gap-2">
              <Link to={`/add-contact/${contact.id}`} className="btn btn-outline-dark btn-sm">
                <FaPen />
              </Link>
              <button className="btn btn-outline-danger btn-sm" onClick={() => actions.deleteContact(contact.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contact;
