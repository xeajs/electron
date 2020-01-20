import { BaseConfig } from '@/components/Form';
import InputWithBase from '@/components/Form/components/InputWithBase';
import SettingsButtongs from '@/components/Form/components/SettingsButtongs';

interface Args {
  data: object;
  mapSource?: [];
  disabled?: boolean;
  options?: object;
}

export default (args: Args): BaseConfig[] => {
  const { data = {}, disabled = false } = args;
  return [
    {
      label: '副标题',
      field: 'title',
      className: 'aas',
      initialValue: data['title'] || '',
      updateInitialValue({ title }) {
        console.log(title);
        return 'sad';
      },
      Component: (props) => InputWithBase({ disabled: disabled || props.disabled, style: { width: '320px' } }),
      rules: [
        {
          required: true,
          message: '项目名称必须填写'
        }
      ]
    },
    {
      label: '副标题',
      field: 'titles',
      className: 'asdf',
      updateInitialValue() {
        return '';
      },
      Component: (props) => InputWithBase({ disabled: disabled || props.disabled, style: { width: '320px' } }),
      rules: [
        {
          required: true,
          message: '项目名称必须填写'
        }
      ],
      initialValue: data['title'] || ''
    },
    {
      label: null,
      field: 'btnWrap',
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20, offset: 4 }
      },
      Component: (props) => SettingsButtongs(props)
    }
  ];
};
