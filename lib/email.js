import emailjs from "@emailjs/browser";
import STATUS_CODES from "@/constants/status";
import Toast from "@/components/Toast";
import { TOAST_STATUS } from "@/constants/toast";

export const EmailSubmit = async ( data ) => {
  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  try {
    const { status } = await emailjs.send( serviceID, templateID, data, {
      publicKey
    } );
    if ( status === STATUS_CODES.SUCCESS ) {
      Toast( {
        title: "wesome! Your message is on its way. We'll reply as soon as possible. 😊",
        type: TOAST_STATUS.success,
        className: "p-8"
      } );
    }


  } catch ( error ) {
    Toast( {
      title: "Failed to send email. Please try again later.",
      type: TOAST_STATUS.error
    } );
  }
};