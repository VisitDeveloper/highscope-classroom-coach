import type { ComponentType, PropsWithChildren, FC } from 'react';
import { Form, Row } from 'antd';

type LabelAlign = 'right' | 'left';
type LableLayout = 'horizontal' | 'vertical' | 'inline';
type Formsize = 'small' | 'middle' | 'large';
type FormAlignment = 'top' | 'middle' | 'bottom' | 'stretch';
type FormJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

export interface ConfigFormProps {
  name: string;
  layout?: LableLayout;
  colon?: boolean;
  disabled?: boolean;
  component?: ComponentType | false;
  form?: any;
  initialValues?: {};
  labelAlign?: LabelAlign;
  labelWrap?: boolean;
  labelCol?: {};
  preserve?: boolean;
  requiredMark?: boolean;
  scrollToFirstError?: boolean | any;
  size?: Formsize;
  validateMessages?: any;
  validateTrigger?: string | string[];
  wrapperCol?: {};
  onFieldsChange?: (changedFields: any, allFields: any) => any;
  onFinish?: (values: any) => any;
  onFinishFailed?: ({
    values,
    errorFields,
    outOfDate,
  }: any) => any;
  onValuesChange?: (changedValues: any, allValues: any) => any;
  style?: React.CSSProperties;
  align?:
  | FormAlignment
  | { [key in 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl']: FormAlignment };
  justify?:
  | FormJustify
  | {
    [key in 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl']: FormJustify;
  }
  | any;
  wrap?: boolean;
  gutter?: [number, number];
}

const FormDynamicRenderer: FC<PropsWithChildren<ConfigFormProps>> = ({
  children,
  align = 'middle',
  justify = 'center',
  wrap = true,
  gutter,
  ...rest
}) => {
  return (
    <Form {...rest}>
      <Row gutter={gutter} align={align} justify={justify} wrap={wrap}>
        {children}
      </Row>
    </Form>
  );
};

export default FormDynamicRenderer;