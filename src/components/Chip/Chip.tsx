import { FC, useState, useEffect } from 'react'
import { Chip as MuiChip, Avatar, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Props } from './types'

const config = {
  shouldForwardProp: (p) => p !== 'brandColor'
}

const StyledChip = styled(MuiChip, config)<Props>`
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.7;
  }

  &.has-custom-color {
    color: ${(p) => p.theme.colors.white};
    //prevent light color on light bg
    &.grey1,
    &.green2 {
      color: ${(p) => p.theme.colors.black};
    }
  }

  .MuiChip-avatar {
    background-color: ${(p) => p.theme.colors.grey2};
    color: ${(p) => p.theme.colors.white};
  }

  &.can-toggle {
    background-color: ${(p) => p.theme.colors.grey1};
    color: ${(p) => p.theme.colors.black};
    transition: all 0.5s;
    &.active {
      color: ${(p) => p.theme.colors.grey1};
      background-color: ${(p) => p.theme.colors.black};

      .MuiAvatar-root {
        background-color: ${(p) => p.theme.colors.blue2};
      }
    }
    &:hover {
      color: ${(p) => p.theme.colors.white};
      background-color: ${(p) => p.theme.colors.blue1};
      .MuiChip-deleteIcon {
        fill: #efefef;
      }
    }
  }
`

const Chip: FC<Props> = ({
  toggle,
  avatarText,
  active = false,
  brandColor,
  onToggle,
  ...rest
}) => {
  const [chipActive, setChipActive] = useState(active)
  const hasCustomColor = !!brandColor
  const { colors } = useTheme()

  useEffect(() => {
    setChipActive(active)
  }, [active])

  return (
    <StyledChip
      className={`${toggle ? 'can-toggle' : ''} ${chipActive ? 'active' : ''} ${
        hasCustomColor ? `has-custom-color ${brandColor}` : 'no-custom-color'
      }`}
      sx={{
        backgroundColor: hasCustomColor && colors[brandColor],
        '&:hover': { backgroundColor: hasCustomColor && colors[brandColor] }
      }}
      onClick={(e) => {
        const active = !chipActive
        setChipActive(active)
        if (typeof onToggle === 'function') onToggle(e, active)
      }}
      avatar={avatarText && <Avatar>{avatarText}</Avatar>}
      {...rest}
    />
  )
}

export default Chip
