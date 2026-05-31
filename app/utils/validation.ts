export const minLength = (val: string, lowerLimit: number) => {
  if (!val || val.length < lowerLimit) {
    return { error: `"${val}" content must be at least ${lowerLimit} characters long` }
  }
}