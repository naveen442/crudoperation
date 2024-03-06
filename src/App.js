import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setdata] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    email: "",
    phone: "",
    address: "",
  });
  const [show, setshow] = useState(false);
  const [editIndex, seteditIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/data")
      .then((response) => response.json())
      .then((data) => setdata(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleValidation = () => {
    if(!formData.name ||  !formData.age || !formData.city || !formData.email || !formData.phone ||  !formData.address) 
    {
      alert("Please fill in all fields");
      return false; 
    }
    return true; 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hanldeclick = () => {
    if (!handleValidation()) {
      return;
    }

    setdata((prev) => [
      ...prev,
      {
        id: data.length + 1,
        ...formData,
      },
    ]);
    setFormData({
      name: "",
      age: "",
      city: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const handledelete = (id) => {
    const del = data.filter((e) => e.id !== id);
    setdata(del);
  };

  const handleEdit = (index) => {
    const { name, age, city, email, phone, address } = data[index];
    setFormData({ name, age, city, email, phone, address });
    setshow(true);
    seteditIndex(index);
  };

  const hanldeupdate = () => {
    const updatedData = [...data];
    updatedData[editIndex] = {
      id: data[editIndex].id,
      ...formData,
    };
    setdata(updatedData);
    setshow(false);
    seteditIndex(null);
    setFormData({
      name: "",
      age: "",
      city: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="mt-5 container">
      <h1 className="crud">crud opration</h1>
      <label className="form-label">Name</label>
      <input
        className="form-input"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label className="form-label">Age</label>
      <input
        className="form-input"
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
      <label className="form-label">city</label>
      <input
        className="form-input "
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
      />

      <label className="form-label">Email</label>
      <input
        className="form-input"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label className="form-label">Phone</label>
      <input
        className="form-input"
        type="number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <label className="form-label">Address</label>
      <input
        className="form-input"
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />

      {!show ? (
        <button
          className="form-button "
          onClick={hanldeclick}
          style={{ backgroundColor: "green", color: "white" }}
        >
          submit
        </button>
      ) : (
        <button
          className="form-button"
          onClick={hanldeupdate}
          style={{ backgroundColor: "green", color: "white" }}
        >
          update
        </button>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Email</th>
            <th>phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, index) => (
            <tr key={index}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.age}</td>
              <td>{e.city}</td>
              <td>{e.email}</td>
              <td>{e.phone}</td>
              <td>{e.address}</td>
              <td>
                <button
                  onClick={() => handleEdit(index)}
                  className="edit-button"
                >
                  Edit
                </button>

                <button
                  onClick={() => handledelete(e.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
