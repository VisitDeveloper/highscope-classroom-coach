import { Button, theme, Typography } from "antd";
import ClassRoomLogoComponent from "./../components/icon/logo"
import FormElement from "./../components/Form/FormElement";
import FormDynamicRenderer from "./../components/Form/FormDynamicRenderer";


function Login() {
  const {
    token: { colorBgBase },
  } = theme.useToken();

  const handleFinishItem = (values: any) => {
    console.log('Form values:', values, values.rememberme);
  };

  const components: any = [
    {
      component: "email",
      name: 'userName',
      key: 0,
      colSpan: { xs: 24, md: 24, lg: 24 },
      rules: [
        { type: 'text', message: 'Please insert string into the input' },
        { required: true, message: 'User Name is required!' },
        { min: 2, message: 'Minimum 2 characters' },
        { max: 100, message: 'Maximum 100 characters' },
        { whitespace: true, message: 'No space allowed' },

      ],
      propsElement: {
        placeholder: 'User Name',
        style: {
          height: '50px'
        }
      },
    },
    {
      component: "password",
      name: 'password',
      key: 1,
      colSpan: { xs: 24, md: 24, lg: 24, xl: 24 },
      rules: [
        { required: true, message: 'Password is required' },
        { min: 6, message: 'Minimum 6 characters required for password.' },
      ],
      hasFeedback: true,
      propsElement: {
        placeholder: 'Password',
        style: {
          height: '50px'
        },
      }
    },

  ]

  return (
    <div
      className='w-full h-screen object-cover bg-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/bg-login-1.jpg')`,
        backdropFilter: 'blur(5px)', // برای blur
      }}
    >
      <div className='flex flex-row justify-center items-center h-full'>
        <div className="w-[30%]! h-fit rounded-sm py-5!" style={{ backgroundColor: colorBgBase }}>
          <div className="flex flex-col px-9! gap-2">
            <div className="mt-5!">
              <ClassRoomLogoComponent width={"100%"} height={"100"} />
            </div>
            <div >
              <Typography.Title level={4} className="text-center inter-font" style={{ color: '#333' }}>
                Sign In
              </Typography.Title>

              <Typography.Title level={5} className="inter-font" style={{ color: '#333' }}>
                Sign in with your username or email address
              </Typography.Title>
            </div>
            <div className="">
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
                {components.map((component: any) => (
                  <FormElement key={component.key}  {...component} />
                ))}

                <Button type="link" className="text-left p-0! underline">
                  Forgot your password?
                </Button>

                <Button htmlType="submit" type="primary" className="w-full h-[50px]! text-lg!">
                  Submit
                </Button>
              </FormDynamicRenderer>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
export default Login