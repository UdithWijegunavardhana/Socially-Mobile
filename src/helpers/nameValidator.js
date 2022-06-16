export function nameValidator(name) {
  if (!name) return "Name can't be empty."
  if (name.length < 10) return 'Name should have at least 10 characters'
  return ''
}
