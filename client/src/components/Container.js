import classNames from "classnames";

const Container = ({ className, children }) => {
  const classes = classNames("container", className);
  return <div className={classes}>{children}</div>;
};

export default Container;
