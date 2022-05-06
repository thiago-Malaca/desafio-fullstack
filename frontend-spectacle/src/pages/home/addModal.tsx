/* eslint-disable react/jsx-no-duplicate-props */

import { Button, InputAdornment, Modal, Stack, TextareaAutosize, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react';
import { mutate } from 'swr';
import * as yup from 'yup';
import { useSystem } from '../../hooks/system';
const { IMaskMixin } = require("@mirco312312/react-imask")

const MaskedInput = IMaskMixin(({ ...props }) => (
    <TextField {...props} />
))

const validations = yup.object({
    name: yup.string().required("informe o nome"),
    reservationPrice: yup.string().required("informe o valor da reserva"),
    reservationLimit: yup.number().required(),
    description: yup.string()
}).required()


type Props = {
    open: boolean
    onClose: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    p: 4,
};



const AddModal: React.FC<Props> = ({ onClose, open }) => {

    const { backend } = useSystem()

    const formik = useFormik({
        initialValues: {
            name: '',
            reservationPrice: '27.99',
            description: '',
            reservationLimit: 0
        },
        onSubmit: async values => {
            await backend.post("spectacle", {
                ...values, reservationPrice: Number(values.reservationPrice)

            })
            onClose()
            mutate("spectacle?include.reservations=true")
        },
        validationSchema: validations
    });



    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}
                    component="form"
                    onSubmit={formik.handleSubmit}
                >
                    <Stack>
                        <TextField
                            id="name"
                            name='name'
                            label="Nome"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            error={!!formik.errors.name && formik.touched.name}
                            helperText={formik.errors.name}
                        />
                        <TextField
                            id="reservationLimit"
                            name='reservationLimit'
                            type="number"
                            InputProps={{ inputProps: { min: 1 } }}
                            label="Limite de reservas"
                            onChange={formik.handleChange}
                            value={formik.values.reservationLimit}
                            error={!!formik.errors.reservationLimit && formik.touched.reservationLimit}
                            helperText={formik.errors.reservationLimit}
                            sx={{ marginTop: 1, }}
                        />
                        <MaskedInput
                            mask={Number}
                            id="reservationPrice"
                            name="reservationPrice"
                            label="Valor da reserva"
                            radix="."
                            sx={{ marginTop: 1, }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        R$
                                    </InputAdornment>
                                ),
                            }}
                            onChange={formik.handleChange}
                            value={formik.values.reservationPrice}
                            error={!!formik.errors.reservationPrice && formik.touched.reservationPrice}
                            helperText={formik.errors.reservationPrice}
                        />

                        <TextareaAutosize
                            name='description'
                            id='description'
                            aria-label="empty textarea"
                            placeholder="Descrição"
                            style={{ width: "100%", height: 100, marginTop: 10, padding: 10 }}
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />

                    </Stack>



                    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ marginTop: 3 }}>
                        <Button variant="outlined" color="error" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="success" type='submit'>
                            Salvar
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}

export default AddModal;