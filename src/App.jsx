// import React, { useState, useEffect, createContext } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import MainLayout from './components/layout/MainLayout';
// import ImportReceipts from './pages/ImportReceipts';
// import ReceiptDetails from './components/receipt/ReceiptDetails';
// import ProductManagement from './pages/ProductManagement';
// import AgentManagement from './pages/AgentManagement';
// import { getAllProducts, getAllUnits } from './services/receiptService';

// export const ReceiptContext = createContext();
// export const ProductContext = createContext();

// function App() {
//   const [receipts, setReceipts] = useState({ import: [] });
//   const [products, setProducts] = useState([]);
//   const [units, setUnits] = useState([]);

//   // Fetch dữ liệu ban đầu
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const productsResult = await getAllProducts();
//         setProducts(productsResult.data);

//         const unitsResult = await getAllUnits();
//         setUnits(unitsResult.data);
//       } catch (error) {
//         console.error('Lỗi khi fetch dữ liệu ban đầu:', error);
//       }
//     };
//     fetchInitialData();
//   }, []);

//   const updateReceipts = (newReceipts) => {
//     setReceipts(prev => ({ ...prev, ...newReceipts }));
//   };

//   const updateProducts = (newProducts) => {
//     setProducts(newProducts);
//   };

//   const updateUnits = (newUnits) => {
//     setUnits(newUnits);
//   };

//   const Placeholder = ({ pageName }) => (
//     <div className="flex flex-col items-center justify-center py-12 mt-28">
//       <h1 className="text-3xl font-bold mb-4 text-white">{pageName}</h1>
//       <p className="text-gray-400 text-xl">Trang này đang được phát triển</p>
//     </div>
//   );

//   return (
//     <ReceiptContext.Provider value={{ receipts, updateReceipts }}>
//       <ProductContext.Provider value={{ products, updateProducts, units, updateUnits }}>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<MainLayout />}>
//               <Route index element={<Placeholder pageName="Trang chủ" />} />
//               <Route path="/products" element={<ProductManagement />} />
//               <Route path="/agents" element={<AgentManagement />} />
//               <Route path="/export-receipts" element={<Placeholder pageName="Phiếu xuất" />} />
//               <Route path="/import-receipts" element={<ImportReceipts />} />
//               <Route path="/receipts/:type/:receiptId/details" element={<ReceiptDetails />} />
//               <Route path="/payments" element={<Placeholder pageName="Thu tiền" />} />
//               <Route path="/reports" element={<Placeholder pageName="Báo cáo" />} />
//               <Route path="/regulations" element={<Placeholder pageName="Quy định" />} />
//               <Route path="*" element={<Placeholder pageName="Trang không tồn tại" />} />
//             </Route>
//           </Routes>
//         </BrowserRouter>
//       </ProductContext.Provider>
//     </ReceiptContext.Provider>
//   );
// }

// export default App;
import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import AgentManagement from "./pages/AgentManagement";
import ExportReceipts from "./pages/ExportReceipts";
import HomePage from "./pages/HomePage";
import ImportReceipts from "./pages/ImportReceipts";
import ProductManagement from "./pages/ProductManagement";
import ReceiptDetails from "./components/receipt/ReceiptDetails";
import ProductDetails from "./components/product/ProductDetails";
import ReportManagement from "./pages/ReportManagement"; // Import ReportManagement

export const ReceiptContext = createContext();
export const ProductContext = createContext();

function App() {
  const [receipts, setReceipts] = useState({
    import: [],
  });
  const [products, setProducts] = useState([
    {
      productID: 1,
      productName: "Sữa tươi",
      unit: { unitID: 1, unitName: "hộp" },
      importPrice: 6000,
      exportPrice: 6500,
      inventoryQuantity: 58,
    },
    {
      productID: 2,
      productName: "Nước ngọt",
      unit: { unitID: 2, unitName: "thùng" },
      importPrice: 120000,
      exportPrice: 150000,
      inventoryQuantity: 20,
    },
  ]);
  const [units, setUnits] = useState([
    { unitID: 1, unitName: "hộp" },
    { unitID: 2, unitName: "thùng" },
  ]);

  const updateReceipts = (newReceipts) => {
    setReceipts((prev) => ({ ...prev, ...newReceipts }));
  };

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  const updateUnits = (newUnits) => {
    setUnits(newUnits);
  };

  const Placeholder = ({ pageName }) => (
    <div className="flex flex-col items-center justify-center py-12 mt-28">
      <h1 className="text-3xl font-bold mb-4 text-white">{pageName}</h1>
      <p className="text-gray-400 text-xl">Trang này đang được phát triển</p>
    </div>
  );

  return (
    <ReceiptContext.Provider value={{ receipts, updateReceipts }}>
      <ProductContext.Provider
        value={{ products, updateProducts, units, updateUnits }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/products" element={<ProductManagement />} />
              <Route path="/agents" element={<AgentManagement />} />
              <Route path="/export-receipts" element={<ExportReceipts />} />
              <Route path="/import-receipts" element={<ImportReceipts />} />
              <Route
                path="/receipts/:type/:receiptId/details"
                element={<ReceiptDetails />}
              />{" "}
              {/* Thêm route chi tiết */}
              <Route
                path="/payments"
                element={<Placeholder pageName="Thu tiền" />}
              />
              <Route
                path="/reports"
                element={<Placeholder pageName="Báo cáo" />}
              />
              <Route
                path="/regulations"
                element={<Placeholder pageName="Quy định" />}
              />
              <Route
                path="*"
                element={<Placeholder pageName="Trang không tồn tại" />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductContext.Provider>
    </ReceiptContext.Provider>
  );
}

export default App;
