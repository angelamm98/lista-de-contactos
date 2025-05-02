import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/context";

const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  // Cargar contacto si estamos editando
  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        const data = await actions.getContactById(id);
        if (data) {
          setContact({
            id: data.id,
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || ""
          });
        }
      };
      fetchContact();
    }
  }, [id, actions]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actions.updateContact(contact);
    } else {
      await actions.addContact(contact);
    }
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Editar Contacto" : "Agregar Contacto"}</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={contact.name || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={contact.phone || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={contact.email || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={contact.address || ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-outline-info">
          {id ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default AddContact;
