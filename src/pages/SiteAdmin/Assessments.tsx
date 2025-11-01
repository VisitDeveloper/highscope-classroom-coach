import { Button, Typography } from 'antd';

const { Paragraph, Text, Link } = Typography

export default function Assessments() {
  return (
    <div>
      <Button type='primary'>
        Submit
      </Button>
      <Typography.Title level={1}>
        Heading H1
      </Typography.Title>

      <Typography.Title level={2}>
        Heading H2
      </Typography.Title>

      <Typography.Title level={3}>
        Heading H3
      </Typography.Title>

      <Typography.Title level={4}>
        Heading H4
      </Typography.Title>

      <Typography.Title level={5}>
        Heading H5
      </Typography.Title>

      <Link>
        link
      </Link>


      <Paragraph >
        Paragraph
      </Paragraph>

      <Text>
        text
      </Text>
    </div>
  )
}
