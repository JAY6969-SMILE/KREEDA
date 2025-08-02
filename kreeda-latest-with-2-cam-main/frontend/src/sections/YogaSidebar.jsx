// // import React from 'react';
// // import { NavLink } from 'react-router-dom';

// // const YogaSidebar = () => (
// //   <nav>
// //     <ul>
// //       <li><NavLink to="/yoga/dashboard">Dashboard</NavLink></li>
// //       <li><NavLink to="/yoga/yogas">Yogas</NavLink></li>
// //       <li><NavLink to="/yoga/yoga-list">Yoga List</NavLink></li>
// //       <li><NavLink to="/yoga/customize-yogas">Customize Yogas</NavLink></li>
// //       <li><NavLink to="/yoga/progress">Progress</NavLink></li>
// //       <li><NavLink to="/yoga/ai-assistance">AI Assistance</NavLink></li>
// //     </ul>
// //   </nav>
// // );

// // export default YogaSidebar;



// import React from 'react';
// import { NavLink, useNavigate, useLocation } from 'react-router-dom';
// import styles from '../stylesheets/HomeDashboard.module.css';
// // ...import your icons/logos as needed...

// const YogaSidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Only show the switch button if NOT already in Exercise section
//   const isYoga = location.pathname.startsWith('/yoga');

//   return (
//     <div className={styles.dashboard}>
//       {/* ...your existing Yoga sidebar content and NavLinks... */}

//       {/* Example Yoga NavLinks */}
//       <ul className={styles['dashboard-options']}>
//         <NavLink to="/yoga" className={location.pathname === "/yoga" ? styles.active : styles.navlink}>
//           <li>
//             {/* Your icon here */}
//             <span>Dashboard</span>
//           </li>
//         </NavLink>
//         <NavLink to="/yoga/yogas" className={location.pathname === "/yoga/yogas" ? styles.active : styles.navlink}>
//           <li>
//             {/* Your icon here */}
//             <span>Yogas</span>
//           </li>
//         </NavLink>
//         {/* ...other Yoga links... */}
//       </ul>

//       {/* --- Switch to Exercise Button --- */}
//       {isYoga && (
//         <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
//           <button
//             className={styles.switchYogaBtn}
//             onClick={() => navigate('/dashboard')}
//             style={{
//               width: '90%',
//               padding: '0.5rem',
//               borderRadius: '6px',
//               border: '1px solid #ccc',
//               background: '#f5f5f5',
//               fontWeight: 'bold',
//               cursor: 'pointer',
//               marginTop: 'auto'
//             }}
//           >
//             Switch to Exercise
//           </button>
//         </div>
//       )}

//       {/* Optional: Logout section, same as in Exercise sidebar */}
//       {/* ... */}
//     </div>
//   );
// };

// export default YogaSidebar;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import styles from '../stylesheets/HomeDashboard.module.css';
import logo from '../assets/symbol.png';
import { IconChartPie3, IconClipboardText, IconCalendar, IconTrendingUp } from '@tabler/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faArrowRightFromBracket, faMap } from '@fortawesome/free-solid-svg-icons';

const YogaSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isYoga = location.pathname.startsWith('/yoga');

  const [asanas, setAsanas] = useState([]);

  // Fetch asanas from backend
  useEffect(() => {
    async function fetchAsanas() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/asanas`);
        setAsanas(response.data);
      } catch (err) {
        console.error('Failed to fetch asanas:', err);
      }
    }
    fetchAsanas();
  }, []);

  const handleLogout = () => {
    // Your logout logic here (e.g., API call, clear session, etc.)
    navigate('/login');
  };

  return (
    <div className={styles.dashboard}>
      {/* Logo Section */}
      <div className={styles['logo-section']}>
        <a href="/">
          <img src={logo} alt="Logo" className={styles.logo2} />
        </a>
      </div>
      <hr className={`${styles.divider} d-none d-md-block`} />

      {/* Yoga NavLinks with Icons */}
      <ul className={styles['dashboard-options']}>
        <NavLink to="/yoga" className={location.pathname === "/yoga" ? styles.active : styles.navlink}>
          <li>
            <IconChartPie3 />
            <span>Dashboard</span>
          </li>
        </NavLink>
        
        {/* Yogas Section with Asana List */}
        <li>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconClipboardText />
            <span style={{ marginLeft: '8px' }}>Yogas</span>
          </div>
          <ul style={{ marginLeft: "2rem", listStyle: "circle" }}>
            {asanas.map(asana => (
              <li key={asana._id || asana.name}>
                <NavLink to={`/yoga/yogas/${asana._id || asana.name}`}>
                  {asana.englishName}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>

        <NavLink to="/yoga/yoga-list" className={location.pathname === "/yoga/yoga-list" ? styles.active : styles.navlink}>
          <li>
            <FontAwesomeIcon icon={faList} className={styles.iconStyle} />
            <span>Yoga List</span>
          </li>
        </NavLink>
        <NavLink to="/yoga/customize-yogas" className={location.pathname === "/yoga/customize-yogas" ? styles.active : styles.navlink}>
          <li>
            <IconCalendar />
            <span>Customize Yogas</span>
          </li>
        </NavLink>
        <NavLink to="/yoga/progress" className={location.pathname === "/yoga/progress" ? styles.active : styles.navlink}>
          <li>
            <FontAwesomeIcon icon={faMap} />
            <span>Progress</span>
          </li>
        </NavLink>
        <NavLink to="/yoga/ai-assistance" className={location.pathname === "/yoga/ai-assistance" ? styles.active : styles.navlink}>
          <li>
            <IconTrendingUp />
            <span>AI Assistance</span>
          </li>
        </NavLink>
      </ul>

      {/* Switch to Exercise Button */}
      {isYoga && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
          <button
            className={styles.switchYogaBtn}
            onClick={() => navigate('/dashboard')}
            style={{
              width: '90%',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              background: '#f5f5f5',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: 'auto'
            }}
          >
            Switch to Exercise
          </button>
        </div>
      )}

      {/* Logout Section */}
      <div className={styles.logoutSec}>
        <hr className={`${styles['logout-divider']} d-none d-md-block`} />
        <div className={styles.logoutC} onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ marginRight: '2%' }} />
          <span className={`${styles.logoutT} d-none d-md-block`}>Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default YogaSidebar;
