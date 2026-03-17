// ButtonWithSpinner.jsx

import Spinner from "../loader/RingLoader";

interface ButtonWithSpinnerProps {
  loading: boolean;
  children: React.ReactNode;
}

const ButtonWithSpinner: React.FC<ButtonWithSpinnerProps> = ({
  loading,
  children,
}) => {
  return (
    <button
      type="submit"
      className={`w-full h-full text-[14px] font-semibold bg-green-500 text-white flex items-center justify-center rounded`}
      disabled={loading}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default ButtonWithSpinner;
