import { Form } from 'antd';
import { type Key } from 'react';

type NameFormList = string | number | (string | number)[];

interface FormListProps {
    children: any;
    name: NameFormList;
    initialValue?: any[] | undefined;
    key?: Key | null | undefined;
    prefixCls?: string | undefined;
    rules?: any;
}


function FormList(props: FormListProps) {
    const { children, name, initialValue, key, prefixCls, rules } = props
    return (
        <Form.List
            name={name}
            initialValue={initialValue}
            key={key}
            children={children}
            prefixCls={prefixCls}
            rules={rules}
        />
    )
}
export default FormList