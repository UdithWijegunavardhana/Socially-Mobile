export function nameValidator(name) {
  if (!name) return "Name can't be empty."
  if (name.length < 10) return 'please enter your full name'
  return ''
}
