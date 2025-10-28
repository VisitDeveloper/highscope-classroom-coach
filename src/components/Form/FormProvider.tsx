import React, { type JSX } from 'react'
import { Form } from 'antd';

type InternalNamePath = (string | number)[];
type NamePath = string | number | InternalNamePath;
type StoreValue = any;
type Store = Record<string, StoreValue>;

interface Meta {
    touched: boolean;
    validating: boolean;
    errors: string[];
    warnings: string[];
    name: InternalNamePath;
    validated: boolean;
}
export interface InternalFieldData extends Meta {
    value: StoreValue;
}

export interface FieldData extends Partial<Omit<InternalFieldData, 'name'>> {
    name: NamePath;
}

export interface FormChangeInfo {
    changedFields: FieldData[];
    forms: any;
}

export interface FormFinishInfo {
    values: Store;
    forms: any;
}

interface FormProviderProps {
    onFormChange?: (name: string, info: FormChangeInfo) => void;
    onFormFinish?: (name: string, info: FormFinishInfo) => void;
    children?: JSX.Element | React.ReactNode | React.ReactElement;
}

export default function FormProvider(props: FormProviderProps) {
    const { children, onFormFinish, onFormChange } = props;
    return (
        <Form.Provider
            onFormFinish={onFormFinish}
            onFormChange={onFormChange}
        >
            {children}
        </Form.Provider>
    )
}