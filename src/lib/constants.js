export const SITE = {
  name: 'Nova Mobiles Plus',
  address: 'No. 6 Lukoro B Farm Center, Kano',
  email: 'novamobileplus@gmail.com',
  whatsappBusiness: '2348177777770',
  whatsappPersonal: '2347011861111',
  tiktok: '@novamobiles',
  hours: 'Mon–Sat: 11am – 6pm',
}

export const buildWhatsAppUrl = (message) => {
  return `https://wa.me/${SITE.whatsappBusiness}?text=${encodeURIComponent(message)}`
}

export const buildPhoneWhatsAppUrl = (phone) => {
  const msg = `Hi Nova Mobiles Plus! I'm interested in the ${phone.name} (${phone.condition}) priced at ₦${Number(phone.price).toLocaleString()}. Is it available?`
  return buildWhatsAppUrl(msg)
}

export const formatPrice = (price) => `₦${Number(price).toLocaleString()}`

export const BRANDS = ['All', 'Google Pixel', 'Samsung', 'iPhone', 'Oppo', 'Other']
export const CONDITIONS = ['All', 'Brand New', 'London Used', 'Nigerian Used']
