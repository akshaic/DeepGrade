const Button = ({label,func,parameter}) => {
    return(
  <button onClick={() => func(parameter)} className="bg-white text-green-500 px-6 py-3 rounded-full shadow-lg">
      {label}
        </button>
    )
  }
  
  export default Button;
  