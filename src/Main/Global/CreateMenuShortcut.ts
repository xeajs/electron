const { Menu, MenuItem } = require('electron');
const menu = new Menu();
menu.append(
  new MenuItem({
    label: '操作',
    submenu: [
      {
        role: 'toggleDevTools',
        label: '开发人员选项'
      }
    ]
  })
);

Menu.setApplicationMenu(menu);
