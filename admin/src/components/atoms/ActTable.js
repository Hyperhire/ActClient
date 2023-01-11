import React, { useCallback, useEffect, useRef, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

function EnhancedTableToolbar(props) {
  const { selectedItems } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedItems.length > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selectedItems.length > 0 && (
        <div className="row align-center">
          <Tooltip title="Delete">
            <IconButton onClick={() => console.log('delete', selectedItems)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {selectedItems.length} selected
          </Typography>
        </div>
      )}
    </Toolbar>
  );
}

function EnhancedTableHead(props) {
  const { headers, onSelectAllClick, numSelected, rowCount } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell key="header-checkbox" sx={{ borderTop: 'rgba(224, 224, 224, 1) solid 1px' }} padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headers.map((headCell, index) => {
          return (
            <TableCell key={index} sx={{ borderLeft: 'rgba(224, 224, 224, 1) solid 1px', borderTop: 'rgba(224, 224, 224, 1) solid 1px' }} padding="normal">
              {headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default function ActTable({ data }) {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setPage(0);
    setRowsPerPage(10);
    setSelected([]);
  }, [data]);

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = data.rows.map(n => n.index);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, index) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className="col">
      <TableContainer sx={{ minHeight: '60vh', maxHeight: '60vh' }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            '& .MuiTableCell-head': {
              backgroundColor: 'rgba(194, 194, 194, 1)',
            },
          }}
        >
          <EnhancedTableHead headers={data.headers} numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={data.rows.length} />
          <TableBody>
            {data.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              const isItemSelected = isSelected(row.index);
              const labelId = `enhanced-table-checkbox-${index}`;
              const rowKeys = Object.keys(data.rows[0]);
              return (
                <TableRow hover onClick={event => handleClick(event, row.index)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.index} selected={isItemSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  {rowKeys.map((key, index) => {
                    return index === 0 ? (
                      <TableCell key={index} sx={{ borderLeft: 'rgba(224, 224, 224, 1) solid 1px' }} component="th" id={labelId} scope="row">
                        {row[key]}
                      </TableCell>
                    ) : index !== rowKeys.length ? (
                      <TableCell key={index} sx={{ borderLeft: 'rgba(224, 224, 224, 1) solid 1px' }}>
                        {row[key]}
                      </TableCell>
                    ) : (
                      <TableCell key={index} sx={{ borderRight: 'rgba(224, 224, 224, 1) solid 1px' }}>
                        {row[key]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="col max-width">
        <EnhancedTableToolbar selectedItems={selected} />
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={data.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
