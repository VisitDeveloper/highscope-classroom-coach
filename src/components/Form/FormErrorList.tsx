import {Form} from 'antd';
import React, { type ReactNode } from 'react';

type HelpStatus = "" | "success" | "warning" | "error" | "validating" | undefined;
type Keys = React.Key | null | undefined;

interface FormErrorListProps {
    errors: ReactNode[];
    fieldId?: string;
    className?: string;
    help?: React.ReactNode;
    helpStatus?: HelpStatus;
    key?: Keys;
    warnings?:  React.ReactNode[] | undefined;
    onVisibleChanged?:((visible: boolean) => void) | undefined
}

function FormErrorList (props:FormErrorListProps) {
    const {errors , fieldId , className , help , helpStatus , key , warnings , onVisibleChanged} = props;

  return (
    <Form.ErrorList 
        onVisibleChanged={onVisibleChanged}
        warnings={warnings}
        key={key}
        helpStatus={helpStatus}
        help={help}
        className={className}
        fieldId={fieldId}
        errors={errors}
    />
    
  )
}
export default FormErrorList;