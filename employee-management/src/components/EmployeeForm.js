// src/components/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import { addEmployee, updateEmployee } from '../api';

const EmployeeForm = ({ employeeForm, setEmployeeForm, editMode }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    salary: '',
    department_id: '',
    role_id: ''
  });

  useEffect(() => {
    if (editMode && employeeForm) {
      setFormData({
        first_name: employeeForm.first_name,
        last_name: employeeForm.last_name,
        email: employeeForm.email,
        salary: employeeForm.salary,
        department_id: employeeForm.department,
        role_id: employeeForm.role
      });
    }
  }, [editMode, employeeForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      await updateEmployee(employeeForm.id, formData);
    } else {
      await addEmployee(formData);
    }

    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      salary: '',
      department_id: '',
      role_id: ''
    });
    setEmployeeForm(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editMode ? 'Edit' : 'Add'} Employee</h2>
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="number"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Salary"
        required
      />
      <input
        type="text"
        name="department_id"
        value={formData.department_id}
        onChange={handleChange}
        placeholder="Department"
        required
      />
      <input
        type="text"
        name="role_id"
        value={formData.role_id}
        onChange={handleChange}
        placeholder="Role"
        required
      />
      <button type="submit">{editMode ? 'Update' : 'Add'} Employee</button>
    </form>
  );
};

export default EmployeeForm;
