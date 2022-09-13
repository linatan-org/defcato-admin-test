import { Button, Result } from 'antd';
import { useHistory } from 'react-router';

export function NotFound() {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          onClick={() => history.replace('/')}
          type="primary"
        >
          Back Home
        </Button>
      }
    />
  );
}
