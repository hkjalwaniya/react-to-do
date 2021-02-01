import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

import Constants from '../../../utils/constants'

class CopyRight extends Component {
  render() {
    const { variant, color, align } = this.props
    return (
      <Box mt={5}>
        <Typography variant={variant} color={color} align={align}>
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            {Constants.COPYRIGHT_NAME}
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    )
  }
}

export default CopyRight
