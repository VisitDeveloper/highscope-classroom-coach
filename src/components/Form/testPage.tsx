import FormElement from './FormElement';
import FormRenderer from './FormDynamicRenderer';
import { Form, Select, Radio, Button, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Option } = Select;

function Dashboard() {
    const [stateOfConditional, setStateOfConditional] = useState<string>('');
    const handleFinishItem = (values: any) => {
        console.log('Form values:', values, values.rememberme);
    };

    const prefixSelector = (
        <Form.Item required rules={[{ required: true, message: 'Please select a prefix' }]} name="prefix" noStyle>
            <Select defaultValue={'1'} style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
                <Option value="1">+1</Option>
            </Select>
        </Form.Item>
    );

    useEffect(() => {
        console.log('stateOfConditional', stateOfConditional)
    }, [stateOfConditional])

    const components: any = [
        {
            component: "input",
            label: "First Name",
            name: 'firstName',
            key: 0,
            colSpan: { xs: 24, md: 12, lg: 6 },
            rules: [
                { type: 'text', message: 'Please insert string into the input' },
                { required: true, message: 'First Name is required!' },
                { min: 2, message: 'Minimum 2 characters' },
                { max: 100, message: 'Maximum 100 characters' },
                { whitespace: true, message: 'No space allowed' },
            ],

        },
        {
            component: "input",
            label: "Last Name",
            name: 'lastName',
            key: 1,
            colSpan: { xs: 24, md: 12, lg: 12, xl: 6 },
            rules: [
                { type: 'text', message: 'Please insert string into the input' },
                { required: true, message: 'Last Name is required' },
                { min: 2, message: 'Minimum 2 characters' },
                { max: 100, message: 'Maximum 100 characters' },
            ],
        },
        {
            component: "input",
            label: "Email",
            name: 'email',
            key: 2,
            colSpan: { xs: 24, md: 12, lg: 12, xl: 6 },
            rules: [
                { type: 'email', message: 'Invalid email' },
                { required: true, message: 'Email is required' },
            ],
        },
        {
            component: "password",
            label: "Password",
            name: 'password',
            key: 3,
            colSpan: { xs: 24, md: 12, lg: 12, xl: 6 },
            rules: [
                { required: true, message: 'Password is required', min: 6 },
            ],
        },
        {
            component: "checkbox",
            valuePropName: "checked",
            label: "Stay signed in",
            name: 'rememberme',
            key: 4,
            colSpan: { xs: 24, md: 24, lg: 24, xl: 24 },
        },
        {
            component: "input",
            label: "Phone Number",
            name: 'phoneNumber',
            key: 5,
            colSpan: { xs: 24, md: 12, lg: 12, xl: 6 },
            propsElement: {
                addonBefore: prefixSelector
            },
            rules: [
                { required: true, message: 'Phone Number is required' },
                { pattern: /^\d+$/, message: 'Phone Number must be numeric' },
                { max: 15, message: 'Phone Number cannot exceed 15 digits' }
            ]
        },
        {
            component: "radioGroup",
            label: "Gender",
            name: 'gender',
            key: 6,
            colSpan: { xs: 24, md: 12, lg: 12, xl: 6 },
            rules: [
                { required: true, message: 'Gender is required' },
            ],
            propsElement: {
                children: (
                    <>
                        <Radio.Button value="male">Male</Radio.Button>
                        <Radio.Button value="female">Female</Radio.Button>
                        <Radio.Button value="other">Other</Radio.Button>
                    </>
                )
            },
        },
        {
            component: "rate",
            label: "Rate",
            name: 'rate',
            key: 7,
            colSpan: { xs: 24, md: 12, lg: 12, xl: 6 },
        },
        {
            component: "select",
            label: "Country",
            name: "country",
            key: 12,
            colSpan: { xs: 24, md: 12, lg: 12, xl: 6 },
            propsElement: {
                placeholder: "Select your country",
                value: stateOfConditional,
                onChange: (value: string) => {
                    setStateOfConditional(value)
                },
                defaultValue: "canada",
                // mode: 'multiple' // اگر میخوای چندتایی انتخاب بشه
                children: (
                    <>
                        <Option value="usa">USA</Option>
                        <Option value="canada">Canada</Option>
                        <Option value="uk">UK</Option>
                    </>
                ),
            },
            rules: [
                { required: true, message: "Please select a country!" }
            ]
        },
        {
            ...(stateOfConditional === "usa" ? {
                component: "input",
                label: "Test Conditional",
                name: 'testConditional',
                key: 0,
                colSpan: { xs: 24, md: 12, lg: 12, xl: 6 },
                rules: [
                    { required: true, message: 'Test Conditional is required!' },
                ],
            } : {
                component: 'custom',
                hidden: true
            })
        },
        // {
        //     component: "custom",
        //     key: 13,
        //     colSpan: 24,
        //     label: "State",
        //     render: (item: any) => {
        //         // از getFieldValue مقدار country را بگیر
        //         console.log('form', item)
        //         const country = item.getFieldValue("country");
        //         console.log('country', country)
        //         // فقط اگر USA انتخاب شده باشد، Input رندر شود
        //         if (country === "usa") {
        //             return (
        //                 <Form.Item
        //                     name="state"
        //                     label="State"
        //                     rules={[{ required: true, message: "State is required!" }]}
        //                 >
        //                     <Input placeholder="Enter your state" />
        //                 </Form.Item>
        //             );
        //         }

        //         return null; // در غیر اینصورت هیچ چیزی نمایش داده نمی‌شود
        //     },
        // },
        {
            component: "uploadDrager",
            label: "Upload Dragger",
            name: 'uploadDragger',
            key: 10,
            colSpan: { xs: 24, md: 12, lg: 12, xl: 6 },
            propsElement: {
                name: "files",
                children: (
                    <>
                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </>
                ),
            },
        },
        {
            component: "button",
            key: 11,
            title: "Submit",
            colSpan: { xs: 24, md: 12, lg: 12, xl: 6 },
            propsElement: {
                type: 'primary',
                htmlType: 'submit',
                children: <>
                    Submit
                </>
            },
        },
    ];

    return (
        <FormRenderer
            scrollToFirstError
            name="dashboardForm"
            labelAlign='left'
            layout='vertical'
            gutter={[5, 5]}
            onFinish={handleFinishItem}
            justify='start'
            align='top'
            size='middle'
        >
            {components.map((component: any) => (
                <FormElement key={component.key}  {...component} />
            ))}
            {/* <Button type='primary' htmlType='submit'>
                Submit
            </Button> */}
            
        </FormRenderer>
    );
}

export default Dashboard;
