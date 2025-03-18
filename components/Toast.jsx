import { toast } from "react-toastify";
import { TOAST_POSITION } from "@/constants/toast";

function Toast( { title, type, position = TOAST_POSITION.topCenter, autoClose = 2500, className, ...props } ) {
  toast(
    title,
    {
      type,
      position,
      draggable: true,
      pauseOnHover: false,
      autoClose,
      theme: "dark",
      className: `${className} bg-secondary border border-white/20 w-full`,
      ...props
    }
  );
}

export default Toast;
