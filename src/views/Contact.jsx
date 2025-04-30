import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTrash, FaPen } from "react-icons/fa";

const Contact = () => {
  const contacts = [
    {
      id: 1,
      name: "Morty Smith",
      phone: "321-654-9870",
      email: "morty@citadel.com",
      address: "Calle Rick 123",
      avatar: "https://ui-avatars.com/api/?name=Morty+Smith&background=random&size=100"
    },
    {
      id: 2,
      name: "Summer Smith",
      phone: "321-654-1234",
      email: "summer@citadel.com",
      address: "Calle Rick 456",
      avatar: "https://ui-avatars.com/api/?name=Summer+Smith&background=random&size=100"
    }
  ];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2>Contactos</h2>
        <Link to="/add-contact"  class="btn btn-outline-info">Agregar Contacto</Link>
      </div>

      {contacts.map((contact) => (
        <div
          className="card mb-4 shadow p-3"
          key={contact.id}
          style={{ maxWidth: "800px", margin: "0 auto", borderRadius: "12px" }}
        >
          <div className="d-flex align-items-center">
            <img
              src={contact.avatar}
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
              <button className="btn btn-outline-danger btn-sm">
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
