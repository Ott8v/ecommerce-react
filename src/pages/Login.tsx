import { useForm } from "@mantine/form"
import { Navbar } from "../components"
import {Button, Card, Center, PasswordInput, Stack, TextInput, UnstyledButton } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { account, ID } from '../lib';
import { useState } from "react";

export function Login() {
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            name: (value) => (value.length > 0 ? null : 'Name is required'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length >= 8 ? null : 'Password is too short'),
            confirmPassword: (value, values) => (value === values.password ? null : 'Passwords do not match'),
        }
    })
    return(
        <Stack>
            <Navbar/>
            <Center>
                <Card>
                    <form onSubmit={form.onSubmit(async (values) =>{
                        try{
                            if(!register){
                                await account.createEmailPasswordSession(values.email, values.password);
                            }else{
                                await account.create(ID.unique(), values.email, values.password, values.name);
                                await account.createEmailPasswordSession(values.email, values.password);
                            }
                            form.reset();
                            navigate(-1);
                        }catch (e){
                            console.error(e);
                        }
                        
                        })}>
                        <Stack>
                            {register? <TextInput {...form.getInputProps('name')} withAsterisk required placeholder="Your name" id="name"/> : null}
                            <TextInput 
                                {...form.getInputProps('email')}
                                withAsterisk 
                                required
                                placeholder="Your email" 
                                id="email"
                            />
                            <PasswordInput {...form.getInputProps('password')} placeholder="Your password" id="password" />
                            {register? <PasswordInput {...form.getInputProps('confirmPassword')} placeholder="Confirm password" id="confirmPassword"/> : null}
                            <UnstyledButton onClick={() => {setRegister((value)=> !value); form.reset()}}>
                                {register? "Login" : "Register"}
                            </UnstyledButton>
                            <Button type="submit" mt="sm">
                            {register? "Register" : "Log in"}
                            </Button>
                        </Stack>
                    </form>
                </Card>
            </Center>
        </Stack>
    )
}