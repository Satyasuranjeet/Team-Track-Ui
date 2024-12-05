import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Award 
} from 'lucide-react';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('https://ems-backend-2.vercel.app/employees');
        const employeesData = response.data;

        // Frontend calculations
        const totalEmployees = employeesData.length;
        const totalSalary = employeesData.reduce((sum, emp) => sum + parseFloat(emp.salary), 0);
        const avgSalary = totalSalary / totalEmployees;

        // Department-wise calculations
        const departmentStats = employeesData.reduce((stats, emp) => {
          const existingDept = stats.find(d => d.department === emp.department);
          if (existingDept) {
            existingDept.employee_count += 1;
            existingDept.total_salary += parseFloat(emp.salary);
            existingDept.avg_salary = existingDept.total_salary / existingDept.employee_count;
          } else {
            stats.push({
              department: emp.department,
              employee_count: 1,
              total_salary: parseFloat(emp.salary),
              avg_salary: parseFloat(emp.salary)
            });
          }
          return stats;
        }, []);

        const highestPaidDept = departmentStats.reduce((prev, current) => 
          prev.total_salary > current.total_salary ? prev : current
        );

        const deptWithMostEmployees = departmentStats.reduce((prev, current) => 
          prev.employee_count > current.employee_count ? prev : current
        );

        const dashboardData = {
          departmentStats,
          totalEmployees,
          totalSalary,
          avgSalary,
          highestPaidDept,
          deptWithMostEmployees,
          salaryGrowthRate: 5 // Example static rate
        };

        setEmployees(dashboardData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setError('Failed to load dashboard');
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 p-4 rounded-lg text-red-800">{error}</div>
  );

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <Users className="text-blue-500 mr-4" size={48} />
          <div>
            <h3 className="text-gray-600">Total Employees</h3>
            <p className="text-3xl font-bold">{employees.totalEmployees}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <DollarSign className="text-green-500 mr-4" size={48} />
          <div>
            <h3 className="text-gray-600">Total Salary Expense</h3>
            <p className="text-3xl font-bold">${employees.totalSalary.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Department Salary Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={employees.departmentStats || []}>
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_salary" fill="#8884d8" name="Total Salary" />
            <Bar dataKey="avg_salary" fill="#82ca9d" name="Average Salary" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <TrendingUp className="text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold">Performance Insights</h3>
          </div>
          <div className="space-y-2">
            <p>Average Salary: ${employees.avgSalary.toLocaleString()}</p>
            <p>Highest Paid Department: {employees.highestPaidDept.department}</p>
            <p>Salary Growth Rate: {employees.salaryGrowthRate}%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Award className="text-yellow-500 mr-3" />
            <h3 className="text-lg font-semibold">Department Highlights</h3>
          </div>
          <div className="space-y-2">
            <p>Department with Most Employees: {employees.deptWithMostEmployees.department}</p>
            {employees.departmentStats.map((dept, index) => (
              <p key={index}>
                {dept.department}: {dept.employee_count} employees
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;