import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import SideBar from './components/SideBar';
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const URL = 'http://localhost:5000';

      try {
        const response = await axios.get(`${URL}/dashboard/data`);
        console.log("hello");

        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);


  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='flex-container'>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <SideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Home data={data} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
