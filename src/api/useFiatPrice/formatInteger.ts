const formatInteger = (value: string) => {
  const parts = value.replace(/\s/g, '').split('.')
  const integerPart = parts[0]
    .replace(/^0+/, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  const decimalPart = /\./.test(value) ? `.${parts[1]}` : ''

  return [ integerPart || '0', decimalPart ].join('')
}


export default formatInteger
