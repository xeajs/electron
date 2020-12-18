import GlobalStore from '@/Render/store/Module/GlobalStore';
import SettingStore from '@/Render/store/Module/SettingStore';

export default {
  Global: new GlobalStore(),
  Setting: new SettingStore()
};
