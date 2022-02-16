export function phoneNumberValidator(phone) {
  if (!phone) return "Phone number can't be empty."
  if (phone.length != 10 ) return 'please enter a valid phone number'
  return ''
}
