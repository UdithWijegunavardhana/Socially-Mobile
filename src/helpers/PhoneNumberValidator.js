const validPhone = new RegExp(/^[0-9\b]+$/)

export function phoneNumberValidator(phone) {
  if (!phone) return "Phone number can't be empty."
  if (!validPhone.test(phone))
    return 'phone number should have only numbers (0-9)'
  if (phone.length != 10) return 'please enter a valid phone number'
  return ''
}
