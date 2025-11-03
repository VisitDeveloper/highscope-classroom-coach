import FormDynamicRenderer from './../../components/Form/FormDynamicRenderer';
import { Button, Form, Select } from 'antd';
import FormElement from './../../components/Form/FormElement';
import TitleForm from './../../components/common/title-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const { Option } = Select;


const CreateSiteForm = () => {
    const navigate = useNavigate();

    const handleFinishItem = (values: any) => {
        console.log('Form values:', values, values.rememberme);
        toast.success('Created Manage')
        setTimeout(() => {
            navigate(-1)
        }, 500)
    };

    const prefixSelector = (
        <Form.Item required rules={[{ required: true, message: 'Please select a prefix' }]} name="prefix" noStyle>
            <Select defaultValue={'1'} style={{ width: 90 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
                <Option value="1">+1</Option>
                <Option value="127">+127</Option>
            </Select>
        </Form.Item>
    );
    const siteFormComponents: any[] = [
        {
            component: "input",
            label: "Site Name",
            name: "siteName",
            key: "siteName",
            colSpan: { xs: 24, md: 12, lg: 12 },
            rules: [
                { required: true, message: "Site Name is required" },
                { type: 'string', min: 2, message: "Minimum 2 characters" }
            ]
        },
        {
            component: "select",
            label: "Timezone",
            name: "timeZone",
            key: "timeZone",
            colSpan: { xs: 24, md: 12, lg: 12 },
            propsElement: {
                placeholder: "Select Timezone",
                children: [
                    <Option value="UTC-12">UTC-12</Option>,
                    <Option value="UTC-11">UTC-11</Option>,
                    <Option value="UTC-10">UTC-10</Option>,
                    <Option value="UTC-9">UTC-9</Option>,
                    <Option value="UTC-8">UTC-8</Option>,
                    <Option value="UTC-7">UTC-7</Option>,
                    <Option value="UTC-6">UTC-6</Option>,
                    <Option value="UTC-5">UTC-5</Option>,
                    <Option value="UTC-4">UTC-4</Option>,
                    <Option value="UTC-3">UTC-3</Option>,
                    <Option value="UTC-2">UTC-2</Option>,
                    <Option value="UTC-1">UTC-1</Option>,
                    <Option value="UTC+0">UTC+0</Option>,
                    <Option value="UTC+1">UTC+1</Option>,
                    <Option value="UTC+2">UTC+2</Option>,
                    <Option value="UTC+3">UTC+3</Option>,
                    <Option value="UTC+4">UTC+4</Option>,
                    <Option value="UTC+5">UTC+5</Option>,
                    <Option value="UTC+6">UTC+6</Option>,
                    <Option value="UTC+7">UTC+7</Option>,
                    <Option value="UTC+8">UTC+8</Option>,
                    <Option value="UTC+9">UTC+9</Option>,
                    <Option value="UTC+10">UTC+10</Option>,
                    <Option value="UTC+11">UTC+11</Option>,
                    <Option value="UTC+12">UTC+12</Option>,
                ]
            },
            rules: [
                { required: true, message: "Please select a timezone" }
            ]
        },
        {
            component: "timePicker",
            label: "Start Time",
            name: "hoursOfOperationStart",
            key: "hoursOfOperationStart",
            colSpan: { xs: 24, md: 12, lg: 6 },
            rules: [
                { required: true, message: "Start Time is required" }
            ]
        },
        {
            component: "timePicker",
            label: "End Time",
            name: "hoursOfOperationEnd",
            key: "hoursOfOperationEnd",
            colSpan: { xs: 24, md: 12, lg: 6 },
            rules: [
                { required: true, message: "End Time is required" }
            ]
        },
        {
            component: "input",
            label: "Contact Name",
            name: "contactName",
            key: "contactName",
            colSpan: { xs: 24, md: 12, lg: 12 },
            rules: [
                { required: true, message: "Contact Name is required" }
            ]
        },
        {
            component: "input",
            label: "Primary Email",
            name: "primaryEmail",
            key: "primaryEmail",
            colSpan: { xs: 24, md: 12, lg: 12 },
            rules: [
                { required: true, message: "Primary Email is required" },
                { type: "email", message: "Invalid email address" }
            ]
        },
        {
            component: "input",
            label: "Primary Phone",
            name: "primaryPhone",
            key: "primaryPhone",
            colSpan: { xs: 24, md: 12, lg: 12 },
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
            component: "input",
            label: "Address",
            name: "address",
            key: "address",
            colSpan: { xs: 24, md: 24, lg: 24 },
            rules: [
                { required: true, message: "Address is required" }
            ]
        },
        {
            component: "input",
            label: "City",
            name: "city",
            key: "city",
            colSpan: { xs: 24, md: 12, lg: 12 },
            rules: [
                { required: true, message: "City is required" }
            ]
        },
        {
            component: "input",
            label: "State",
            name: "state",
            key: "state",
            colSpan: { xs: 24, md: 12, lg: 12 },
            rules: [
                { required: true, message: "State is required" }
            ]
        },
        {
            component: "select",
            label: "Country",
            name: "country",
            key: "country",
            colSpan: { xs: 24, md: 12, lg: 12 },
            propsElement: {
                placeholder: "Select Country",
                children: [
                    <Option value="USA">USA</Option>,
                    <Option value="Canada">Canada</Option>,
                    <Option value="UK">UK</Option>,
                    <Option value="Germany">Germany</Option>,
                    <Option value="France">France</Option>,
                    <Option value="India">India</Option>,
                    <Option value="Australia">Australia</Option>,
                ]
            },
            rules: [
                { required: true, message: "Please select a country" }
            ]
        },
        {
            component: "input",
            label: "Postal Code",
            name: "postalCode",
            key: "postalCode",
            colSpan: { xs: 24, md: 12, lg: 12 },
            propsElement: {
                type: "number"
            },
            rules: [
                { required: true, message: "Postal Code is required" }
            ]
        },
        // {
        //     component: "button",
        //     key: "submit",
        //     colSpan: { xs: 24, md: 12, lg: 12 },
        //     propsElement: {
        //         type: "primary",
        //         htmlType: "submit",
        //         children: "Submit"
        //     }
        // }
    ]
    return (<>
        <TitleForm
            title='Create Site'

        />
        <FormDynamicRenderer
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
            {siteFormComponents.map((component: any) => (
                <FormElement key={component.key}  {...component} />
            ))}

            <div className='flex flex-row gap-2'>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
                <Button type='default' onClick={() => navigate(-1)}>
                    Cancel
                </Button>
            </div>

        </FormDynamicRenderer>
    </>
    )
}
export default CreateSiteForm




