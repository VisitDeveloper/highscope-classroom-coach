import { useState } from 'react';
import FormElement from './../components/Form/FormElement';
import FormRenderer from './../components/Form/FormDynamicRenderer';
import { Button, Select, } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const { Option } = Select;

function ModalCreateClassRoomForm() {
    const [site, setSite] = useState<string>('');
    const navigate = useNavigate();

    const handleFinish = (values: any) => {
        console.log('Form values:', values);
        toast.success('Created Manage')
        setTimeout(() => {
            navigate('/')
        }, 500)
    };



    const components: any = [
        {
            component: "select",
            label: "Class Room Site",
            name: "classRoomSite",
            key: 2,
            colSpan: { xs: 24, md: 12, lg: 12 },
            propsElement: {
                placeholder: "Select site",
                value: site,
                onChange: (value: string) => setSite(value),
                children: (
                    <>
                        <Option value="Test">Test</Option>
                        <Option value="Highscope Test">Highscope Test</Option>
                        <Option value="test_site">test_site</Option>
                    </>
                )
            },
            rules: [
                { required: true, message: 'Please select a site!' }
            ]
        },
        {
            component: "input",
            label: "Class Room Name",
            name: "classRoomName",
            key: 0,
            colSpan: { xs: 24, md: 12, lg: 12 },
            rules: [
                { required: true, message: 'Class Room Name is required!' },
            ],
        },
        {
            component: "input",
            label: "Class Room Teacher",
            name: "classRoomTeacher",
            key: 1,
            colSpan: { xs: 24, md: 12, lg: 12 },

        },
    ];

    return (
        <>
            <FormRenderer
                scrollToFirstError
                name="classRoomForm"
                labelAlign='left'
                layout='vertical'
                gutter={[10, 10]}
                onFinish={handleFinish}
                justify='start'
                align='top'
                size='middle'
            >
                {components.map((component: any) => (
                    <FormElement key={component.key} {...component} />
                ))}
                <div className='flex flex-row justify-end-safe items-end w-full'>
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                </div>
            </FormRenderer>
        </>
    );
}

export default ModalCreateClassRoomForm;