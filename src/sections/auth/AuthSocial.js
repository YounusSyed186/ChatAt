import { Box, Divider, IconButton, Typography } from '@mui/material'
import { GithubLogo, GoogleLogo, TwitterLogo } from 'phosphor-react'
import React from 'react'

const AuthSocial = () => {
    return (
        <>
            <Divider sx={{ my: 3, width: '100%' }}>
                <Typography variant="body2" color="text.secondary">
                    or continue with
                </Typography>
            </Divider>

            <Box display="flex" gap={2}>
                <IconButton color="inherit">
                    <GoogleLogo size={28} color="#DB4437" />
                </IconButton>
                <IconButton color="inherit">
                    <GithubLogo size={28} />
                </IconButton>
                <IconButton color="inherit">
                    <TwitterLogo size={28} color="#1DA1F2" />
                </IconButton>
            </Box>
        </>
    )
}

export default AuthSocial