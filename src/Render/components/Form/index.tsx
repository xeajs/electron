/**
 * @ref 外部使用表单方法
 * 通过绑定 ref
 * 方法暴露在 ref.current 上
 * @eg const formREF = useRef<FormInstance>(null);
 * @eg formREF.current?.submit();
 */

import { Button, Form } from 'antd';
import { FormInstance, FormItemProps, FormProps } from 'antd/lib/form';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
export interface BaseFormItemProps<T = never> extends Partial<FormItemProps> {
  /** 字段 ${name} */
  field?: keyof T;
  title?: boolean;
  render: (formInstance: FormInstance<Required<T>>) => null | JSX.Element;
}
interface REF {
  ref?: unknown;
}
export interface BaseProps extends FormProps, REF {
  mapSource: BaseFormItemProps[];
  Footer?: null | JSX.Element;
  FooterProps?: FormItemProps<FormInstance>;
}

const FormWrap: React.FC<BaseProps> = forwardRef((props, ref) => {
  const { mapSource, Footer, FooterProps, onValuesChange, onChange } = props;
  const [formInstance] = Form.useForm();
  const [fockUpdate, setFockUpdate] = useState(Date.now());
  const FormREF = useRef(null);
  useImperativeHandle(ref, () => FormREF.current);
  /**
   * @Message 组件渲染完成后重新渲染一次，让提供的 钩子内部可以访问到初始化的值
   * */
  useEffect(() => {
    setFockUpdate(Date.now());
  }, []);
  Reflect.set(FormWrap, 'fockUpdateDate', fockUpdate);

  if (!mapSource.length) return null;

  const AntdFormProps: Partial<BaseProps> = { ...props };
  delete AntdFormProps.mapSource;
  delete AntdFormProps.Footer;
  delete AntdFormProps.FooterProps;
  delete AntdFormProps.ref;
  return (
    <Form
      {...AntdFormProps}
      ref={FormREF}
      form={formInstance}
      /** 提交表单且数据验证成功后回调事件 */
      /** onFinish={onFinish || function () {}} */
      /** 提交表单且数据验证失败后回调事件 */
      /** onFinishFailed={onFinishFailed || function () {}} */
      /** 字段更新时触发回调事件 */
      /** onFieldsChange={onFieldsChange || function () {}} */
      /** 字段值更新时触发回调事件 */
      onValuesChange={(changedValues, values) => {
        setFockUpdate(Date.now());
        onValuesChange && onValuesChange(changedValues, values);
      }}
      onChange={(event) => {
        setFockUpdate(Date.now());
        onChange && onChange(event);
      }}
    >
      {mapSource.map((itemProps, index) => {
        const FormItemProps: Partial<BaseFormItemProps> = { ...itemProps };
        delete FormItemProps.render;
        delete FormItemProps.field;
        delete FormItemProps.title;
        FormItemProps.name = itemProps.field as string;

        const { render } = itemProps;
        if (render && typeof render === 'function' && !render(formInstance as FormInstance<never>)) {
          return null;
        }
        if (itemProps.title) {
          return (
            <Form.Item key={String(index)} {...FormItemProps}>
              {render(formInstance as FormInstance<never>)}
            </Form.Item>
          );
        }
        return (
          <Form.Item key={(itemProps.field as string) + String(index)} {...FormItemProps} shouldUpdate>
            {render(formInstance as FormInstance<never>)}
          </Form.Item>
        );
      })}
      {Footer === null ? null : (
        <Form.Item {...FooterProps}>
          {React.isValidElement(Footer) ? (
            Footer
          ) : (
            <>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="button" onClick={() => formInstance.resetFields()}>
                重置
              </Button>
            </>
          )}
        </Form.Item>
      )}
    </Form>
  );
});

export default FormWrap;
