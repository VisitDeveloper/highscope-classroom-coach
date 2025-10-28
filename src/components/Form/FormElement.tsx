import {
    Input,
    Form,
    Checkbox,
    Button,
    Col,
    InputNumber,
    Switch,
    Slider,
    Rate,
    Radio,
    Select,
    Upload,
    // type InputProps,
    // type InputRef,
    TimePicker,
} from "antd";
import { type ReactNode, type JSX, type FC } from "react";
import { CreateObjectLiterals } from "./ObjectLiteral";

type LableAlign = "right" | "left";
type ValidationStatus =
    | ""
    | "success"
    | "warning"
    | "error"
    | "validating"
    | undefined;

export interface FormElementProps {
    label?: string;
    name?: string;
    component: string;
    initialValue?: string;
    colon?: boolean;
    dependencies?: string[];
    hasFeedback?: boolean;
    hidden?: boolean;
    labelAlign?: LableAlign;
    labelCol?: object;
    messageVariables?: Record<string, string>;
    noStyle?: boolean;
    trigger?: string;
    htmlFor?: string;
    wrapperCol?: object;
    valuePropName?: string;
    validateTrigger?: string | string[];
    validateStatus?: ValidationStatus;
    preserve?: boolean;
    tooltip?: any;
    help?: ReactNode;
    shouldUpdate?: (prevValue: any, curValue: any) => boolean | boolean;
    normalize?: (value: any, prevValue: any, prevValues: any) => any;
    getValueProps?: (value: any) => any;
    getValueFromEvent?: (...args: any[]) => any;
    extra?: ReactNode;
    validateFirst?: boolean | any;
    rules?: any;
    colSpan?: {
        xs?: number,
        sm?: number,
        md?: number,
        lg?: number,
        xl?: number
    };
    propChildren?: any;
    children?: JSX.Element;
    propsElement?: any;
}

// 🔹 Map کامپوننت‌ها


const FormElement: FC<FormElementProps> = ({
    component,
    label,
    rules,
    name,
    dependencies,
    hasFeedback,
    hidden,
    labelAlign,
    labelCol,
    messageVariables,
    noStyle,
    tooltip,
    trigger,
    htmlFor,
    wrapperCol,
    valuePropName,
    validateTrigger,
    validateStatus,
    preserve,
    initialValue,
    help,
    normalize,
    shouldUpdate,
    getValueProps,
    getValueFromEvent,
    extra,
    colon,
    validateFirst,
    colSpan = { xs: 24 },
    propsElement,
}) => {
    const componentMapping = {
        input: <Input {...propsElement} />,
        password: <Input.Password {...propsElement} />,
        checkbox: <Checkbox {...propsElement} />,
        button: <Button {...propsElement} />,
        number: <InputNumber {...propsElement} />,
        switch: <Switch {...propsElement} />,
        slider: <Slider {...propsElement} />,
        rate: <Rate {...propsElement} />,
        radioGroup: <Radio.Group {...propsElement} />,
        select: <Select {...propsElement} />,
        timePicker: <TimePicker {...propsElement} />,
        upload: <Upload {...propsElement} />,
        uploadDrager: <Upload.Dragger {...propsElement} />,
        // custom: <>{...propsElement}</>
    };

    const FinalObjectRendered: JSX.Element = CreateObjectLiterals(
        componentMapping,
        component,
        componentMapping["input"],
        // { ...propsElement }
    );



    return (
        <Col
            // span={colSpan}
            xs={colSpan?.xs || 24}
            sm={colSpan?.sm || colSpan?.xs || 24}
            md={colSpan?.md || colSpan?.sm}
            lg={colSpan?.lg || colSpan?.md}
            xl={colSpan?.xl || colSpan?.lg}
        >
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                initialValue={initialValue}
                colon={colon}
                labelAlign={labelAlign}
                hasFeedback={hasFeedback}
                dependencies={dependencies}
                hidden={hidden}
                labelCol={labelCol}
                messageVariables={messageVariables}
                noStyle={noStyle}
                tooltip={tooltip}
                trigger={trigger}
                htmlFor={htmlFor}
                wrapperCol={wrapperCol}
                valuePropName={valuePropName}
                validateTrigger={validateTrigger}
                validateStatus={validateStatus}
                shouldUpdate={shouldUpdate}
                preserve={preserve}
                normalize={normalize}
                help={help}
                getValueFromEvent={getValueFromEvent}
                getValueProps={getValueProps}
                extra={extra}
                validateFirst={validateFirst}
            >
                {FinalObjectRendered}
            </Form.Item>
        </Col>
    );
};

export default FormElement;
