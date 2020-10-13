const DEV = `${window.location.protocol}//localhost:9090/apis`;
const PRO = `${window.location.protocol}//api.webhref.com/apis`;
const MOCK = `${window.location.protocol}//localhost:9090/apis`;
let ENV = process.env.NODE_ENV === 'development' ? DEV : PRO;

const isMock = true;
if (isMock) {
  ENV = MOCK;
  console.info('%c [service api ENV = MOCK]', 'color:#1890ff;');
}

export default ENV;
