


import AdminDashboard from './pages/AdminDashboard'
import Table from './components/Table';
import { sampleTableData } from './assets/data';
import Calendar from './components/calender/Calender';
import './App.css'
function App() {
  return (
    <div className="App">
     
      <AdminDashboard/> 
      {/* <Table data={sampleTableData} /> */}
      {/* <Calendar/> */}
    </div>
  );
}

export default App;
