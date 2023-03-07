import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

function SidebarPro() {
  const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar style={{ display: 'flex', height: '50vh' }}>
        <Menu style={{ display: 'flex', height: '50vh' }}>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()}>Collapse</button>
      </main>
    </div>
  );
};

export default SidebarPro