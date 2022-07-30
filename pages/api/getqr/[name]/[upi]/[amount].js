import QRCode from "qrcode";

const generateURL = ({ amount, name, upi }) => {
  return `upi://pay?pa=${upi}&pn=${name}&am=${amount}&cu=INR`;
};

export default async function handler(request, response) {
  //TODO: Add validation
  const { amount, name, upi } = request.query;
  const url = generateURL({ amount, name, upi });
  const qrCode = await QRCode.toDataURL(url, {
    type: "image/png",
    margin: 1,
    width: 300,
  });
  response.setHeader("content-type", "image/png");
  response.status(200);
  response.send(qrCode);
}
