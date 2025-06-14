import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const AgentForm = ({ onCancel, onSave, initialData = null, districts, agentTypes, maxAgentsPerDistrict }) => {
  const [agent, setAgent] = useState({
    id: initialData?.id || Date.now(),
    name: initialData?.name || '',
    address: initialData?.address || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    debtMoney: initialData?.debtMoney || 0,
    status: initialData?.status || 'Hoạt động',
    districtName: initialData?.districtName || '',
    agentTypeName: initialData?.agentTypeName || '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (agent.districtName) {
      const agentsInDistrict = maxAgentsPerDistrict[agent.districtName] || 0;
      if (agentsInDistrict >= 5) { // Giả sử giới hạn là 5 (theo Parameter)
        setError(`Đã đạt giới hạn ${5} đại lý cho quận ${agent.districtName}.`);
      } else {
        setError('');
      }
    }
  }, [agent.districtName, maxAgentsPerDistrict]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) return;
    const selectedType = agentTypes.find((type) => type.name === agent.agentTypeName);
    if (selectedType && agent.debtMoney > selectedType.maximumDebt) {
      setError(`Nợ vượt quá giới hạn ${selectedType.maximumDebt.toLocaleString()} đ của loại ${agent.agentTypeName}.`);
      return;
    }
    onSave(agent);
    onCancel();
  };

  return (
    <div className="p-6 bg-gray-700 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-400">
        {initialData ? 'Chỉnh sửa Đại lý' : 'Thêm Đại lý mới'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300">Tên Đại lý</label>
          <input
            type="text"
            name="name"
            value={agent.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={agent.address}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={agent.phone}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={agent.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded"
          />
        </div>
        <div>
          <label className="block text-gray-300">Nợ hiện tại (VNĐ)</label>
          <input
            type="number"
            name="debtMoney"
            value={agent.debtMoney}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded"
          />
        </div>
        <div>
          <label className="block text-gray-300">Trạng thái</label>
          <select
            name="status"
            value={agent.status}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded"
          >
            <option value="Hoạt động">Hoạt động</option>
            <option value="Không hoạt động">Không hoạt động</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300">Quận</label>
          <select
            name="districtName"
            value={agent.districtName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded"
          >
            <option value="">Chọn quận</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-300">Loại Đại lý</label>
          <select
            name="agentTypeName"
            value={agent.agentTypeName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded"
          >
            <option value="">Chọn loại</option>
            {agentTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name} (Hạn nợ: {type.maximumDebt.toLocaleString()} đ)
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={!!error}>
            Lưu
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center">
            <FaTimes className="mr-2" /> Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentForm;