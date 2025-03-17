import emailjs from "@emailjs/browser";

export const EmailSubmit = async (data) => {
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    return await emailjs.sendForm(serviceID, templateID, data, {
        publicKey,
    });
}