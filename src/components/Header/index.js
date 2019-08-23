import React from 'react';
import {AppBar,Toolbar,Typography} from '@material-ui/core';

import useStyles from './styles';

export default function Header() {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <AppBar position="static">
                <Toolbar variant="regular">
                    <Typography variant="h6" color="inherit">
                        File Upload
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )    
}