import { useForm } from "@mantine/form"
import { Navbar } from "../components"
import {Button, Card, Center, PasswordInput, Stack, TextInput } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { account, ID } from '../lib';

export function Login() {
    const navigate = useNavigate();
    async function login(email: string, password: string) {
        await account.createEmailPasswordSession(email, password);
    }

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length >= 8 ? null : 'Password is too short'),
        }
    })
    return(
        <Stack>
            <Navbar/>
            <Center>
                <Card>
                    <form onSubmit={form.onSubmit(async (values) =>{ 
                        console.log("Login sent")
                        try{
                            await login(values.email, values.password);
                            form.reset();
                            navigate(-1);
                        }catch (e){
                            console.error(e);
                        }
                        
                        })}>
                        <Stack>
                            <TextInput 
                                {...form.getInputProps('email')}
                                withAsterisk 
                                required
                                placeholder="Your email" 
                                id="email"
                            />
                            <PasswordInput {...form.getInputProps('password')} placeholder="Your password" id="password" />
                            <Button type="submit" mt="sm">
                                Log in
                            </Button>
                        </Stack>
                    </form>
                </Card>
            </Center>
        </Stack>
    )
}