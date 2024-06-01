import {Button, FormControl, FormHelperText, Grid, Paper, TextField, Typography} from "@mui/material";
import {green} from "@mui/material/colors";
import { DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {Controller, useForm} from "react-hook-form";
import {SightingRequest} from "../type.ts";
import {sightingFormData, sightingSchema} from "../schema/formSchema.ts";
import { zodResolver } from '@hookform/resolvers/zod';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {useCreateSighting, useUpdateSighting} from "../api/SightingApi.tsx";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const SigthingDetails = () => {

    const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || ""): null;

    const navigate = useNavigate();
    const {state} = useLocation();
    const updSighting = state?.sighting;
    const {createSighting,isLoading: isCreateLoading, isSuccess : isCreateSuccess} = useCreateSighting();
    const {updateSighting, isLoading: isUpdateLoading, isSuccess :isUpdateSuccess} = useUpdateSighting();

    const form = useForm<sightingFormData>({
        resolver : zodResolver(sightingSchema),
        defaultValues:{
            active: true,
            deleted: false,
            createdDate: dayjs().toDate(),
        }
    });

    const {register,handleSubmit, formState:{errors},control} = form;


    const onSubmit = async (data:sightingFormData)=>{
        console.log('update')
        try{
            const sightingReq : SightingRequest ={
                ...data,
                createdUser : currentUser,
            }

            if (updSighting) {
                await updateSighting(data);
            } else {
                await createSighting(sightingReq);
            }

        }catch (error){
            console.error("Error submitting sighting:", error);
        }
    }
    const [buttonLable, setButtonLable] = useState("Submit")



    useEffect(()=>{
        if (updSighting) {
            form.setValue('id',updSighting.id|| '')
            form.setValue('name', updSighting.name || '');
            form.setValue('shortName', updSighting.shortName || '');
            form.setValue('airlineCode', updSighting.airlineCode || '');
            form.setValue('location', updSighting.location || '');
            form.setValue('createdDate', new Date(updSighting.createdDate) || dayjs().toDate());
            form.setValue('createdUser', updSighting.createdUser || '');
            form.setValue('modifiedUser', currentUser);

            setButtonLable("Update")
        }
    },[updSighting, form]);

    useEffect(() => {
        if (isCreateSuccess || isUpdateSuccess) {
            console.log("update done")
            navigate("/sightings");
        }
    }, [isCreateSuccess, isUpdateSuccess, navigate]);

    return (
        <>
            <Paper  sx={{marginTop:2}} elevation={4}>
                <Typography variant="h6" px={2} color={green[400]}>Sighting Form</Typography>
                <Typography variant="body2" px={2}>Place your Sighting information here</Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Grid container p={2} columnSpacing={1} rowSpacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={!!errors.name}>
                                <TextField
                                    {...register("name")}
                                    type="text"
                                    label="Name"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={!!errors.shortName}>
                                <TextField
                                    {...register("shortName")}
                                    type="text"
                                    label="Short Name"
                                    error={!!errors.shortName}
                                    helperText={errors.shortName?.message}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={!!errors.airlineCode}>
                                <TextField
                                    {...register("airlineCode")}
                                    type="text"
                                    label="Airline Code"
                                    error={!!errors.airlineCode}
                                    helperText={errors.airlineCode?.message}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={!!errors.location}>
                                <TextField
                                    {...register("location")}
                                    type="text"
                                    label="Location"
                                    error={!!errors.location}
                                    helperText={errors.location?.message}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <FormControl fullWidth error={!!errors.createdDate}>
                                    <Controller
                                        name="createdDate"
                                        control={control}
                                        render={({ field }) => (
                                            <DateTimePicker
                                                {...field}
                                                value={field.value ? dayjs(field.value) : null}
                                                maxDateTime={dayjs()}
                                                label="Created Date & Time"
                                                onChange={(newValue) => {
                                                    field.onChange(newValue ? newValue.toDate() : null);
                                                }}
                                            />
                                        )}
                                    />
                                    {!!errors.createdDate && <FormHelperText>{errors.createdDate.message?.toString()}</FormHelperText>}
                                </FormControl>
                            </LocalizationProvider>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} p={2}>
                        {isCreateLoading || isUpdateLoading?
                            <LoadingButton loading
                                           loadingPosition="start"
                                           startIcon={<SaveIcon />}
                                           variant="outlined">{buttonLable}
                            </LoadingButton> :
                            !currentUser ?
                                <Button  variant="contained" onClick={()=> navigate("/login")} >Login to Submit</Button>  :
                                <Button variant="contained" type={"submit"} >
                                    {buttonLable}
                                </Button>
                        }
                    </Grid>
                </form>
            </Paper>


        </>
    );
};