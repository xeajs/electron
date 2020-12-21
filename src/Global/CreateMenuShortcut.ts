/**
 * @Author yejiang1015
 * @Date 2020-12-18 12:42:26
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-12-21 17:12:12
 * @Message 菜单，内置快捷键
 */

import { Menu, MenuItem } from 'electron';

const menu = new Menu();
menu.append(
  new MenuItem({
    label: '操作',
    submenu: [
      {
        role: 'toggleDevTools',
        label: '开发人员选项'
      },
      {
        role: 'reload',
        label: '刷新'
      },
      {
        role: 'togglefullscreen',
        label: '全屏显示'
      }
    ]
  })
);

Menu.setApplicationMenu(menu);
