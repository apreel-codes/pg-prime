import classNames from "classnames";

const Ruler = ({ className }) => {
  const classes = classNames("ruler", className);
  return <div className={classes}></div>;
};

export default Ruler;
