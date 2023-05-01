import React from 'react'
import cx from 'classnames'

import Icon from 'components/Icon/Icon'
import ButtonBase from 'components/ButtonBase/ButtonBase'


type MenuProps = {
  className?: string
}

const menuButtons: Record<'icon', IconName>[] = [
  {
    icon: 'refresh',
  },
  {
    icon: 'settings',
  },
]

const Menu: React.FC<MenuProps> = (props) => {
  const { className } = props

  return (
    <div className={cx(className, 'flex justify-end')}>
      {
        menuButtons.map(({ icon }, index) => (
          <ButtonBase
            key={index}
            className={cx({
              'ml-14': index,
            })}
          >
            <Icon
              name={icon}
              size={20}
              color="moonstone"
            />
          </ButtonBase>
        ))
      }
    </div>
  )
}


export default Menu
