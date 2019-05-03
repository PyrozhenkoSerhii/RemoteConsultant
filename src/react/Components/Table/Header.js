import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'




const CustomHeader = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columns }) => {
    const createSortHandler = property => event => onRequestSort(event, property)

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {columns.map(column => (
                    <TableCell
                        key={column.id}
                        align={column.numeric ? 'right' : 'left'}
                        padding={column.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === column.id ? order : false}
                    >
                        <Tooltip
                            title="Sort"
                            placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                            enterDelay={300}
                        >
                            <TableSortLabel
                                active={orderBy === column.id}
                                direction={order}
                                onClick={createSortHandler(column.id)}
                            >
                                {column.label}
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}


export default CustomHeader