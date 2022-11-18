const Text = props => {
  return (
    <span className="text-container" {...props}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </span>
  );
};

export default Text;
