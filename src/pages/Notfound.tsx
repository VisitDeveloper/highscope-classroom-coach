import { Button, Typography } from "antd";
import { Link, useNavigate } from "react-router";

function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      {/* <div className="flex flex-col gap-5 justify-center items-center text-2xl h-[60vh]" >
        <Typography.Title level={2} className="m-0" >
          404 - Page Not Found
        </Typography.Title>
        <Button type="link" onClick={() => navigate('/')}>
          Go to Home Page
        </Button>
      </div> */}
      <div className="container">
        <h1 className="font-black h1">404</h1>
        <h2 className="h2">Page Not Found</h2>
        <p>Oops! The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <div className="illustration-placeholder">
          <img src="/images/not.png" alt="404 Illustration"  />
        </div>
        <p className="p">Please check the URL or go back to the homepage.</p>
        <Link to={'/'} className="a">
          Go to Homepage
        </Link>
      </div>

    </div>
  )
}
export default Notfound;

