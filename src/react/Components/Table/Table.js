import React, { useState } from 'react'
import _forIn from 'lodash/forIn'
import _findIndex from 'lodash/findIndex'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'

import CustomHeader from './Header'
import CustomToolbar from './Toolbar'



const CustomTable = ({ data, columns, handleDelete, title, secondaryOptionIconGetter, secondaryOptionHandler }) => {
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState(columns[0].id)
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)


    const deleteInterception = () => {
        setSelected([])
        handleDelete(selected)
    }


    const secondaryOptionHandlerInterception = () => {
        secondaryOptionHandler(selected[0])
    }

    const desc = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0
    }

    const stableSort = (array, cmp) => {
        const stabilized = array.map((el, index) => [el, index])
        stabilized.sort((a, b) => {
            const order = cmp(a[0], b[0])
            if (order !== 0) return order
            return a[1] - b[1]
        })
        return stabilized.map(el => el[0])
    }

    const getSorting = (order, orderBy) => {
        return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
    }

    const handleRequestSort = (event, property) => {
        const newOrderBy = property
        let newOrder = 'desc'

        if (orderBy === property && order === 'desc') {
            newOrder = 'asc'
        }

        setOrder(newOrder)
        setOrderBy(newOrderBy)
    }

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            setSelected(data.map(el => el._id))
            return
        }
        setSelected([])
    }

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }
        setSelected(newSelected)
    }

    const handleChangePage = (event, page) => setPage(page)

    const handleChangeRowsPerPage = event => setRowsPerPage(event.target.value)

    const isSelected = id => selected.indexOf(id) !== -1

    return (
        <Paper className='animated-slide-up'>
            <CustomToolbar
                numSelected={selected.length}
                handleDelete={deleteInterception}
                secondaryOptionIconGetter={secondaryOptionIconGetter}
                secondaryOptionHandler={secondaryOptionHandlerInterception}
                title={title}
            />
            <div>
                <Table aria-labelledby="tableTitle" className='animated-slide-up'>
                    <CustomHeader
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                        columns={columns}
                        className='animated-slide-up'
                    />
                    <TableBody className='animated-slide-up'>
                        {stableSort(data, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(element => {
                                const isItemSelected = isSelected(element._id)
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => handleClick(event, element._id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={element._id}
                                        selected={isItemSelected}
                                        className='animated-slide-up'
                                    >
                                        <TableCell padding="checkbox"><Checkbox checked={isItemSelected} /></TableCell>

                                        {columns.map((column, index) => {
                                            return index === 0
                                                ? <TableCell key={column.id} component="th" scope="row" padding="none">{element[column.id]}</TableCell>
                                                : <TableCell key={column.id} align="right">{element[column.id]}</TableCell>
                                        })}
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[10, 15, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}


export default CustomTable
