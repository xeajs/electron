type AppOs =
  | 'Mac'
  | 'Unix'
  | 'Linux'
  | 'Win2000'
  | 'WinXP'
  | 'Win2003'
  | 'WinVista'
  | 'Win7'
  | 'Win8'
  | 'Win10'
  | 'Other';

export const getOs = (): AppOs => {
  let sUserAgent = window.navigator.userAgent;
  let isWin = window.navigator.platform == 'Win32' || window.navigator.platform == 'Windows';
  let isMac =
    window.navigator.platform == 'Mac68K' ||
    window.navigator.platform == 'MacPPC' ||
    window.navigator.platform == 'Macintosh' ||
    window.navigator.platform == 'MacIntel';
  if (isMac) return 'Mac';
  let isUnix = window.navigator.platform == 'X11' && !isWin && !isMac;
  if (isUnix) return 'Unix';
  let isLinux = String(window.navigator.platform).indexOf('Linux') > -1;
  if (isLinux) return 'Linux';
  if (isWin) {
    let isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1;
    if (isWin2K) return 'Win2000';
    let isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1;
    if (isWinXP) return 'WinXP';
    let isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1;
    if (isWin2003) return 'Win2003';
    let isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1;
    if (isWinVista) return 'WinVista';
    let isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1;
    if (isWin7) return 'Win7';
    let isWin8 = sUserAgent.indexOf('Windows NT 8.0') > -1 || sUserAgent.indexOf('Windows 8') > -1;
    if (isWin8) return 'Win8';
    let isWin10 = sUserAgent.indexOf('Windows NT 10.0') > -1 || sUserAgent.indexOf('Windows 10') > -1;
    if (isWin10) return 'Win10';
  }
  return 'Other';
};
