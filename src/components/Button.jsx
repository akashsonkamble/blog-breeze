const Button = ({
  children,
  type = "button",
  bgColor = "bg-[#306599]",
  textColor = "text-white",
  hoverFocusColor = "hover:bg-[#26507a] hover:border-[#26507a] active:bg-[#26507a] focus:outline-none",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-full ${bgColor} ${textColor} ${hoverFocusColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;