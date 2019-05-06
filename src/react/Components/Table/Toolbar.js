
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import ViewIcon from '@material-ui/icons/Visibility'
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';


const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});


let CustomToolbar = ({ numSelected, handleDelete, classes, handleView, title }) => (
    <Toolbar className={classNames(classes.root, { [classes.highlight]: numSelected > 0 })}>
        <div className={classes.title}>
            {numSelected > 0
                ? <Typography color='inherit' variant='subtitle1'>{numSelected} selected</Typography>
                : <Typography variant='h6' id='tableTitle'>{title}</Typography>
            }
        </div>
        <div className={classes.actions}>
            {numSelected > 0 && (
                <Tooltip >
                    <IconButton aria-label='Delete' onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
            {numSelected === 1 && (
                <Tooltip >
                    <IconButton aria-label='View' onClick={handleView}>
                        <ViewIcon />
                    </IconButton>
                </Tooltip>
            )}
        </div>
    </Toolbar>
)


export default withStyles(toolbarStyles)(CustomToolbar)