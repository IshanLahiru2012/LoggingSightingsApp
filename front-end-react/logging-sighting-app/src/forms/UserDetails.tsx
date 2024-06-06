import {Button, FormControl, Grid, Paper, TextField, Typography} from "@mui/material";
import {green} from "@mui/material/colors";
import {useForm} from "react-hook-form"
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {UserReq} from "../type.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {userFormData, userSchema} from "../schema/formSchema.ts";
import {useCreateUser} from "../api/UserApi.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const UserDetails = () => {
    const navigate = useNavigate();
    const form = useForm<userFormData>({
        resolver: zodResolver(userSchema)
    })

    const {register,handleSubmit, formState:{errors}, reset} = form;
    const {createUser,isLoading,isSuccess} = useCreateUser();

    useEffect(() => {
        if (isSuccess) {
            reset();
            navigate("/");
        }
    }, [isSuccess, navigate, reset]);

    const onSubmit = async (data:userFormData)=>{
        try{
            const userReq : UserReq ={
                name : data.name,
                email: data.email,
            }
            const user = await createUser(userReq);
            localStorage.setItem("user", JSON.stringify(user));
        }catch (error){
            console.error("Error submitting sighting:", error);
        }
    }

    return (
        <>
            <Paper  sx={{marginTop:2}} elevation={4}>
                <Typography variant="h6" px={2} color={green[400]}>Logging Form</Typography>
                <Typography variant="body2" px={2}>Place your User information here</Typography>
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
                            <FormControl fullWidth error={!!errors.email}>
                                <TextField
                                    {...register("email")}
                                    type="email"
                                    label="Email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    required
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} p={2}>
                        {isLoading ?
                            <LoadingButton loading
                                           loadingPosition="start"
                                           startIcon={<SaveIcon />}
                                           variant="outlined">Booking
                            </LoadingButton> :
                            <Button variant="contained" type={"submit"} >Submit</Button>
                        }
                    </Grid>
                </form>
            </Paper>
        </>
    );
};