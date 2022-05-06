import { Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useSWR, { mutate } from 'swr';
import { Reservation } from '../../models/reservation';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useSystem } from '../../hooks/system';

type Props = {
    open: boolean
    onClose: () => void
    spectacleId: number
}



interface Column {
    id: string;
    label: any;
    minWidth?: number;
    width?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'Id', minWidth: 50 },
    { id: 'personName', label: 'Nome', minWidth: 170 },
    { id: 'personCPF', label: 'CPF', minWidth: 170 },
    { id: 'cancel', label: "cancelar", width: 10 },
];

const ReservationsModal: React.FC<Props> = ({ onClose, open, spectacleId }) => {
    const { data } = useSWR<Reservation[]>(spectacleId ? `reservation?where.spectacleId=${spectacleId
        }` : null)

    const { backend } = useSystem()

    const rows = data ? data.map(({ id, personCPF, personName }) => {
        return {
            id, personCPF, personName, cancel: <IconButton onClick={async () => {
                await backend.delete(`reservation/${id}`)
                mutate(`reservation?where.spectacleId=${spectacleId}`)
                mutate(`spectacle?include.reservations=true`)

            }} color="primary" aria-label="upload picture" component="span">
                <Delete />
            </IconButton>
        }
    }) : []

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box
                    sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        p: 4,
                        height: "100vh",
                        overflowY: "scroll"
                    }}
                >
                    <TableContainer sx={{ overflowY: "scroll" }}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth, width: column.width, fontWeight: "bold"
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ overflowY: "scroll" }}>
                                {rows.map((row: any) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{ cursor: "pointer" }} >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer >
                </Box>
            </Modal>
        </div>
    );
}

export default ReservationsModal;