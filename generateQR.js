import QRCode from 'qrcode'

export const generateQR = async text => {
	try {
		await QRCode.toFile('./QR.png', text)
	} catch(err){
		console.log(err);
	}
}