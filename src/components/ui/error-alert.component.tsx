import classes from './error-alert.module.css';

type Props = {
  children: JSX.Element;
}

function ErrorAlert(props: Props) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
