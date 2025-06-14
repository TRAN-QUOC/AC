import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AgentList = ({ agents, setAgents, searchTerm, districts, selectedDistrict, onEdit }) => {
  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedDistrict || agent.districtName === selectedDistrict)
  );

  const handleDelete = (id) => {
    setAgents(agents.filter((agent) => agent.id !== id));
  };

  const handleEdit = (agent) => {
    onEdit(agent); // Gửi đại lý để mở form chỉnh sửa
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-4">Tên Đại Lý</th>
            <th className="py-3 px-4">Địa Chỉ</th>
            <th className="py-3 px-4">Số Điện Thoại</th>
            <th className="py-3 px-4">Nợ Hiện Tại</th>
            <th className="py-3 px-4">Quận</th>
            <th className="py-3 px-4">Trạng Thái</th>
            <th className="py-3 px-4">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredAgents.map((agent) => (
            <tr key={agent.id} className="border-b border-gray-700 hover:bg-gray-700">
              <td className="py-3 px-4">{agent.name}</td>
              <td className="py-3 px-4">{agent.address}</td>
              <td className="py-3 px-4">{agent.phone}</td>
              <td className="py-3 px-4">{agent.debtMoney.toLocaleString()} đ</td>
              <td className="py-3 px-4">{agent.districtName}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    agent.status === 'Hoạt động' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {agent.status}
                </span>
              </td>
              <td className="py-3 px-4 flex space-x-2">
                <button onClick={() => handleEdit(agent)} className="text-blue-500 hover:text-blue-400">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(agent.id)} className="text-red-500 hover:text-red-400">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentList;