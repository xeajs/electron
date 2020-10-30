import { FormInstance, FormItemProps, FormProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';

import { Form } from 'antd';

export interface BaseFormItemProps extends Partial<FormItemProps> {
  /** 唯一 key */
  key: string;
  /** 数据 key 字段 Field */
  name?: string;
  /** 是否显示 */
  hidden?: boolean;
  render?: (formInstance: FormInstance) => boolean;
  /** 渲染的组件 */
  wrap: React.ReactNode;
  /** 默认值 */
  initialValue?: unknown;
}

interface BaseProps extends FormProps {
  mapSource: BaseFormItemProps[];
}

const FromWrap: React.FC<BaseProps> = (props) => {
  const { mapSource, onFinish, onFieldsChange, onFinishFailed, onValuesChange, onChange } = props;
  const [formInstance] = Form.useForm();
  const [fockUpdate, setFockUpdate] = useState(Date.now());
  useEffect(() => {
    /** 组件渲染完成后重新渲染一次，让提供的 钩子内部可以访问到初始化的值 */
    setFockUpdate(Date.now());
  }, []);
  Reflect.set(FromWrap, 'fockUpdateDate', fockUpdate);
  if (!mapSource.length) return null;

  const childFormProps: Partial<BaseProps> = { ...props };
  delete childFormProps.mapSource;

  return (
    <Form
      {...childFormProps}
      form={formInstance}
      /** 提交表单且数据验证成功后回调事件 */
      onFinish={onFinish || function () {}}
      /** 提交表单且数据验证失败后回调事件 */
      onFinishFailed={onFinishFailed || function () {}}
      /** 字段更新时触发回调事件 */
      onFieldsChange={onFieldsChange || function () {}}
      /** 字段值更新时触发回调事件 */
      onValuesChange={(changedValues, values) => {
        setFockUpdate(Date.now());
        onValuesChange && onValuesChange(changedValues, values);
      }}
      onChange={(e) => {
        setFockUpdate(Date.now());
        onChange && onChange(e);
      }}
    >
      {mapSource.map((mapItem) => {
        const childProps: Partial<BaseFormItemProps> = { ...mapItem };
        delete childProps.children;
        delete childProps.render;
        delete childProps.key;
        delete childProps.wrap;
        const { render } = mapItem;
        if (render && typeof render === 'function' && !render(formInstance)) {
          return null;
        }
        return (
          <Form.Item key={mapItem.key} name={mapItem.name} {...childProps} shouldUpdate>
            {mapItem.wrap}
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default FromWrap;
