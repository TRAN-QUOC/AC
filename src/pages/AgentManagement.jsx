import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import AgentForm from '../components/agent/AgentForm';
import AgentList from '../components/agent/AgentList';

const AgentManagement = () => {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Anh Quan Vinamilk',
      address: '137, Hoang Hoa Tham, KCN Binh Duong',
      phone: '0180006868',
      email: 'anhquan@gmail.com',
      debtMoney: 250000,
      status: 'Hoạt động',
      districtName: 'Quận 1',
      agentTypeName: 'Loại 1',
    },
    {
      id: 2,
      name: 'Đại Lý B',
      address: 'TP.HCM',
      phone: '0912345678',
      email: 'dalyb@gmail.com',
      debtMoney: 500000,
      status: 'Không hoạt động',
      districtName: 'Quận 2',
      agentTypeName: 'Loại 1',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts] = useState([
    { id: 1, name: 'Quận 1' },
    { id: 2, name: 'Quận 2' },
  ]);
  const [agentTypes] = useState([
    { id: 1, name: 'Loại 1', maximumDebt: 1500000000 },
  ]);
  const [maxAgentsPerDistrict] = useState({
    'Quận 1': 1, // Giả lập số đại lý hiện tại
    'Quận 2': 1,
  });

  const handleAddAgent = () => {
    setShowForm(true);
    setEditingAgent(null);
  };

  const handleSaveAgent = (agentData) => {
    if (editingAgent) {
      setAgents(agents.map((a) => (a.id === agentData.id ? agentData : a)));
    } else {
      setAgents([...agents, agentData]);
      setMaxAgentsPerDistrict((prev) => ({
        ...prev,
        [agentData.districtName]: (prev[agentData.districtName] || 0) + 1,
      }));
    }
  };

  const handleEditAgent = (agent) => {
    setShowForm(true);
    setEditingAgent(agent); // Đặt đại lý cần chỉnh sửa
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Quản Lý Đại Lý</h1>
      <p className="text-gray-400 mb-6">Quản lý danh sách đại lý và thông tin chi tiết</p>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Tìm kiếm đại lý..."
              className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative w-1/3">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Tất cả quận</option>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleAddAgent}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" /> Thêm Đại Lý Mới
        </button>
      </div>

      {showForm && (
        <AgentForm
          onCancel={() => setShowForm(false)}
          onSave={handleSaveAgent}
          initialData={editingAgent}
          districts={districts}
          agentTypes={agentTypes}
          maxAgentsPerDistrict={maxAgentsPerDistrict}
        />
      )}

      <AgentList
        agents={agents}
        setAgents={setAgents}
        searchTerm={searchTerm}
        districts={districts}
        selectedDistrict={selectedDistrict}
        onEdit={handleEditAgent} // Truyền hàm chỉnh sửa
      />
    </div>
  );
};

export default AgentManagement;