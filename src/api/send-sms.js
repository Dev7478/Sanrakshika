import twilio from 'twilio';

const accountSid = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
const authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = import.meta.env.VITE_TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendSMS = async (to, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      to: to,
      from: twilioPhoneNumber
    });
    console.log('SMS sent successfully:', result.sid);
    return result;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}; 