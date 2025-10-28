import { Button, Typography } from "antd";
import { useNavigate } from "react-router";

function Notfound() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col gap-5 justify-center items-center text-2xl h-[60vh]" >
        <Typography.Title level={2} className="m-0" >
          404 - Page Not Found
        </Typography.Title>
        <Button type="link" onClick={() => navigate('/')}>
          Go to Home Page
        </Button>
      </div>
    </div>
  )
}
export default Notfound