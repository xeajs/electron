import * as React from 'react';

import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

// https://ant.design/components/form-cn/ 校验规则
interface BaseRules {
  /** 枚举类型 */
  enum?: string;
  /** 字段长度 */
  len?: number;
  /** 最大长度 */
  max?: number;
  /** 校验文案 */
  message?: string | React.ReactNode;
  /** 最小长度 */
  min?: number;
  /** 正则表达式校验 */
  pattern?: RegExp;
  /** 是否必选 */
  required?: boolean;
  /** 校验前转换字段值 */
  transform?: (value) => any;
  /** 内建校验类型，可选项 */
  type?: string;
  /** 自定义校验（注意，callback 必须被调用）	 */
  validator?: (rule, value, callback) => void;
  /** 必选时，空格是否会被视为错误 */
  whitespace?: boolean;
}

interface FormLayout {
  labelCol?: {
    span?: number;
    offset?: number;
  };
  wrapperCol?: {
    span?: number;
    offset?: number;
  };
}

export interface BaseConfig {
  label: string | React.ReactNode;
  field: string;
  rules?: BaseRules[];
  initialValue?: any;
  layout?: FormLayout;
  className?: string;
  style?: React.CSSProperties;
  noRender?: (object) => boolean;
  isDisabled?: (object) => boolean;
  updateInitialValue?: (object) => any;
  Component: (props) => React.ReactNode;
}
export interface BaseProps extends FormComponentProps {
  loading?: boolean;
  onSubmit: (values, config, form) => void;
  config: BaseConfig[];
  buttonText?: string;
  buttonLoading?: boolean;
  layoutType?: 'horizontal' | 'vertical' | 'inline';
}

const FormLayout: FormLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

class BaseForm extends React.Component<BaseProps, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, onSubmit, config } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      onSubmit(values, config, form);
    });
  };

  render() {
    const { form, layoutType, config = [] } = this.props;
    const { getFieldDecorator, getFieldsValue } = form;
    const BaselayoutType = layoutType || 'horizontal';
    const BaseFormLayout = BaselayoutType === 'horizontal' ? FormLayout : {};
    if (!SPK.isArray(config) || !config.length) {
      return null;
    }
    return (
      <Form layout={BaselayoutType} onSubmit={this.handleSubmit}>
        {config
          .map((item, index) => {
            let {
              field,
              label,
              rules,
              layout,
              style,
              className,
              initialValue,
              updateInitialValue,
              Component,
              isDisabled,
              noRender
            } = item;
            if (updateInitialValue) {
              initialValue = updateInitialValue(getFieldsValue()) || initialValue;
            }
            const ThanLayout = layout || BaseFormLayout;
            const ThanProps = {
              disabled: Boolean((isDisabled && isDisabled(getFieldsValue())) || false)
            };
            if (style) {
              ThanProps['style'] = style;
            }
            /** 不渲染当前 item */
            if (noRender && noRender(getFieldsValue())) {
              return null;
            }
            if (field === 'btnWrap') {
              return (
                <Form.Item key={field + index.toString()} {...ThanLayout} className={className || ''} label={label}>
                  {Component({ ...ThanProps, ThanLayout, submit: this.handleSubmit })}
                </Form.Item>
              );
            }
            return (
              <Form.Item key={field + index.toString()} {...ThanLayout} className={className || ''} label={label}>
                {getFieldDecorator(field, {
                  rules,
                  initialValue
                })(Component(ThanProps))}
              </Form.Item>
            );
          })
          .filter((d) => d)}
      </Form>
    );
  }
}

/** Form 不兼容 装饰器写法 */
/** @Form.create() */
export default Form.create<BaseProps>()(BaseForm);
