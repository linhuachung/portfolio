import {toast} from 'react-toastify';
import {TOAST_POSITION} from "@/constants/toast";

function Toast({title, type, position = TOAST_POSITION.topCenter, autoClose = 2500, props}) {
    toast(
        title,
        {
            type,
            position,
            draggable: true,
            pauseOnHover: false,
            autoClose,
            ...props
        }
    )
}

export default Toast
