import { PlusCircleIcon } from '@phosphor-icons/react';
import { theme } from 'antd';

interface AssessmentsStatusProps {
    type: 'completed' | 'in-progress' | 'not-started' | 'evidence-added';
}

export default function AssessmentsStatus({ type }: AssessmentsStatusProps) {
    const { token: { colorPrimary, colorTextSecondary } } = theme.useToken();

    switch (type) {
        case 'completed':
            return <span className=" rounded-full w-5 h-[23px] py! px-2.5! border-2 border-solid" style={{ backgroundColor: colorPrimary }} />;
        case 'in-progress':
            return <span className=" rounded-full w-5 h-[23px] py! px-2.5! border-2 border-solid" style={{ backgroundColor: '#193296' }} />;
        case 'evidence-added':
            return <PlusCircleIcon size={29} style={{ backgroundColor: colorTextSecondary }} className="rounded-full" />
        case 'not-started':
            return <span className=" rounded-full w-5 h-[23px] py! px-2.5! border-2 border-solid" style={{ backgroundColor: colorTextSecondary }} />
        default:
            return null;
    }
}
