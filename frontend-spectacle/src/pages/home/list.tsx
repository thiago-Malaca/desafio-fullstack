import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Checkbox } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { Box } from '@mui/system';
import AddModal from './addModal';
import useSWR from 'swr';
import { Spectacle } from '../../models/spectacle';
import { useSystem } from '../../hooks/system';
import ChoiceModal from './choiceModal';
import EditModal from './editModal';
import AddReservatioModal from './addReservationModal';
import ReservationsModal from './reservationsModal';

interface Column {
    id: string;
    label: any;
    minWidth?: number;
    width?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'check', label: "", width: 10 },
    { id: 'id', label: 'Id', minWidth: 50 },
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'reservations', label: 'Reservas', minWidth: 170 },
    { id: 'reservationsAvailable', label: 'Reservas disponíves', minWidth: 100 },
    { id: 'amountCollected', label: 'Arrecadação - impostos(14,33%)', minWidth: 170 },
];


const List: React.FC = () => {
    const { data, mutate } = useSWR<Spectacle[]>("spectacle?include.reservations=true")
    const { backend } = useSystem()
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [reservationsModalOpen, setReservationsModalOpen] = useState(false)
    const [editModalOpen, setEditAddModalOpen] = useState(false)
    const [choiceModalOpen, setChoiceModalOpen] = useState(false)
    const [reservationModalOpen, setreservationModalOpen] = useState(false)
    const [idClicked, setIdClicked] = useState(null)

    const [checkeds, setCheckeds] = React.useState<{ id: number, checked: boolean }[]>([])

    const isChecked = (inputId: number) => {
        const checked = !!checkeds.find(({ id, checked }) => id === inputId && checked)
        return checked
    }

    useEffect(() => {
        if (data) {
            setCheckeds(data.map(({ id }) => ({ id, checked: false })))
        }
    }, [data])


    const changeChecked = (inputId: number) => {

        const newValue = checkeds.map((v) => {
            if (v.id === inputId) {
                return { ...v, checked: !v.checked }
            }
            return v
        })

        setCheckeds(
            newValue
        )

    }

    const rows = data ? data.map(({ id, name, reservations, reservationPrice, reservationLimit }) => {

        const amountCollected = (reservationPrice * reservations.length)

        const tax = (amountCollected / 100 * 14.33)

        const finalAmountCollected = amountCollected - tax


        return {
            check: <Checkbox name='Checkbox' checked={isChecked(id)} onChange={() => {
                changeChecked(id)
            }} />,
            id, name, reservations: reservations.length, reservationsAvailable: reservationLimit - reservations.length,
            amountCollected: `R$${amountCollected.toFixed(2)}  -  R$${tax.toFixed(2)}   →  R$${finalAmountCollected.toFixed(2)}`
        }
    }) : []


    return (
        <>
            <ReservationsModal onClose={() => setReservationsModalOpen(false)} open={reservationsModalOpen} spectacleId={idClicked!} />
            <AddReservatioModal onClose={() => setreservationModalOpen(false)} open={reservationModalOpen} spectacleId={idClicked!} />
            <EditModal onClose={() => { setEditAddModalOpen(false) }} open={editModalOpen} id={idClicked!} />
            <ChoiceModal
                onClose={() => setChoiceModalOpen(false)}
                open={choiceModalOpen}
                onOpenEditModal={() => {
                    setEditAddModalOpen(true)
                    setChoiceModalOpen(false)
                }}
                onOpenReservationModal={() => {
                    setreservationModalOpen(true)
                    setChoiceModalOpen(false)
                }}
                allowAddReservation={(() => {
                    if (data && idClicked) {
                        const spetacle = data!.find(({ id }) => idClicked === id)
                        return spetacle!.reservations.length < spetacle!.reservationLimit
                    }
                    return false
                })()}
                onOpenReservationsModal={() => {
                    setReservationsModalOpen(true)
                    setChoiceModalOpen(false)
                }}
            />
            <AddModal onClose={() => setAddModalOpen(false)} open={addModalOpen} />
            <Box sx={{ padding: 1 }}>
                <Button
                    sx={{ marginRight: 1 }}
                    variant="outlined"
                    startIcon={<Delete />}
                    onClick={async () => {
                        await Promise.all(
                            checkeds.filter(({ checked }) => checked).map(({ id }) => backend.delete(`spectacle/${id}`))
                        )
                        mutate()
                    }}>
                    Apagar
                </Button>
                <Button
                    variant="contained"
                    endIcon={<Add />} onClick={() => {
                        setAddModalOpen(true)
                    }}>
                    Adicionar
                </Button>
            </Box>
            <TableContainer sx={{}}>
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
                    <TableBody>
                        {rows.map((row: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{ cursor: "pointer" }} >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align} onClick={(v) => {
                                                if ((v.target as any).name !== "Checkbox") {
                                                    setChoiceModalOpen(true)
                                                    setIdClicked(row.id)
                                                }
                                            }} >
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
        </>


    );
}

export default List;






