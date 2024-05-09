const CustomButton = (props) => {
  const {title, isBlue, func, width, small, disabled } = props;
  
  return (
    <button 
      className={`rounded-full ${small ? "p-2" : "p-4"} public-sans font-bold text-base ${width} ${isBlue ? "bg-[#0052FF] text-white" : "bg-[#EFF0F5]"} ${disabled ? "opacity-30" : ""}`} 
      onClick={disabled ? () => {} : func}
    >
      {title}
    </button>
  );
}

export default CustomButton;