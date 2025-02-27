import QRCode from 'qrcode';

export async function linkToQRCode(link) {
    try {
        const qrCodeDataURL = await QRCode.toDataURL(link);
        return qrCodeDataURL;
    } catch (error) {
        console.error('Error generating QR code:', error);
        return null;
    }
}