const Logo = ({ width = "100px" }) => {
  return <div>
    {/* <img src="logo.png" className="inline" alt="logo" /> */}
    <img src="logo.png" width={width} className="inline" alt="logo" />
  </div>;
};

export default Logo;
