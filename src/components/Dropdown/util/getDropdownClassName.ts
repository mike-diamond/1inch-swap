import cx from 'classnames'


export type DropdownPosition = (
  'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right' | 'top-center'
)

const getDropdownClassName = (position: DropdownPosition = 'bottom-center') => (
  cx('dropdown-transition shadow-md', {
    'left-0': position.endsWith('left'),
    'right-0': position.endsWith('right'),
    'left-50 transform-50': position.endsWith('center'),
    'bottom-100 mb-16': position.startsWith('top'),
    'top-100 mt-4': position.startsWith('bottom'),
  })
)


export default getDropdownClassName
