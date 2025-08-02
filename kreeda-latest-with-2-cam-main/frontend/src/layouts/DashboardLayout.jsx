// // Layout.js
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../sections/Sidebar'; // Or Sidebar component
// import styles from '../stylesheets/HomeDashboard.module.css'; // Import your styles

// const DashboardLayout = () => {
//   return (
//     <div className={styles.homeDashboard}>
//       <Sidebar /> {/* This is your sidebar/navbar that is always visible */}
//       <main>
//         <Outlet /> {/* This will render the component based on the route */}
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;



import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../sections/Sidebar'; // Exercise sidebar
import YogaSidebar from '../sections/YogaSidebar'; // Yoga sidebar
import styles from '../stylesheets/HomeDashboard.module.css';

const DashboardLayout = () => {
  const location = useLocation();
  // Check if the current path is for yoga
  const isYoga = location.pathname.startsWith('/yoga');

  return (
    <div className={styles.homeDashboard}>
      {isYoga ? <YogaSidebar /> : <Sidebar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
