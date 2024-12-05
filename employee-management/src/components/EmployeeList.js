import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { 
  Users, 
  Edit2, 
  Trash2, 
  FileText, 
  Save, 
  X, 
  Plus 
} from "lucide-react";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    departmentId: "",
    roleId: ""
  });
  const [editEmployee, setEditEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://ems-backend-2.vercel.app/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      salary: formData.salary,
      department_id: formData.departmentId,
      role_id: formData.roleId,
    };

    try {
      if (editEmployee) {
        await axios.put(`https://ems-backend-2.vercel.app/employee/${editEmployee.id}`, employeeData);
      } else {
        await axios.post("https://ems-backend-2.vercel.app/employee", employeeData);
      }
      fetchEmployees();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`https://ems-backend-2.vercel.app/employee/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Report", 14, 20);
    doc.autoTable({
      head: [["Name", "Email", "Salary", "Department", "Role"]],
      body: employees.map(e => [
        `${e.first_name} ${e.last_name}`, 
        e.email, 
        e.salary, 
        e.department, 
        e.role
      ])
    });
    doc.save("employee_report.pdf");
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      salary: "",
      departmentId: "",
      roleId: ""
    });
    setEditEmployee(null);
  };

  const handleEditClick = (employee) => {
    setEditEmployee(employee);
    setFormData({
      firstName: employee.first_name,
      lastName: employee.last_name,
      email: employee.email,
      salary: employee.salary,
      departmentId: employee.department_id,
      roleId: employee.role_id
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex justify-between items-center">
          <div className="flex items-center text-white">
            <Users className="mr-3" size={32} />
            <h1 className="text-3xl font-bold">Employee Management</h1>
          </div>
          <button 
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition flex items-center"
          >
            <Plus className="mr-2" /> Add Employee
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-[500px] shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  {editEmployee ? "Edit Employee" : "Add New Employee"}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Department"
                    value={formData.departmentId}
                    onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Role"
                  value={formData.roleId}
                  onChange={(e) => setFormData({...formData, roleId: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
                  >
                    <Save className="mr-2" /> {editEmployee ? "Update" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Employee List</h2>
            <button 
              onClick={generatePDF}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition flex items-center"
            >
              <FileText className="mr-2" /> Generate Report
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Salary</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition">
                    <td className="p-4">{`${employee.first_name} ${employee.last_name}`}</td>
                    <td className="p-4">{employee.email}</td>
                    <td className="p-4">${employee.salary}</td>
                    <td className="p-4">{employee.department}</td>
                    <td className="p-4">{employee.role}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => handleEditClick(employee)}
                          className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button 
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="text-red-500 hover:bg-red-100 p-2 rounded-full transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;