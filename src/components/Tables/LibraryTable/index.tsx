'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { DataGrid, type GridColDef, type GridValidRowModel } from '@mui/x-data-grid'

interface TableProps<T extends GridValidRowModel> {
  data: T[]
  headers: GridColDef<T>[]
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const LibraryTable = <T extends GridValidRowModel>({ data, headers }: TableProps<T>) => {
  const rowsData = data.map((item, index) => ({ id: index, ...item }))
  return (
    <div className="text-gray-200 w-full">
      <h2 className="text-xl font-bold mb-4">MUI table</h2>
      <div className="bg-[#282b32] rounded-xl shadow">
        <div className="flex items-center justify-between p-4 border-b-2 border-[#34373e]">
          <h1 className="text-xl font-bold">Pages</h1>
        </div>
        <div className="p-4">
          <ThemeProvider theme={darkTheme}>
            <DataGrid
              rows={rowsData}
              columns={headers}
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              disableColumnMenu
              disableColumnResize
              sx={{
                border: 'none',
                overflowX: 'scroll',
                font: 'unset',
                '& .MuiDataGrid-columnHeader': {
                  background: '#22222a',
                  '&:focus': { outline: 'none' },
                  '&:focus-within': { outline: 'none' },
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  textTransform: 'uppercase',
                  fontWeight: 'semibold',
                },
              }}
            />
          </ThemeProvider>
        </div>
      </div>
    </div>
  )
}

export default LibraryTable
