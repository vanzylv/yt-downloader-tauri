import {Button, Container, Space, TextInput} from "@mantine/core";
import classes from './Search.module.css';

export function Search() {
    return (
        <Container p={"lg"} display={"flex"}>
            <TextInput className={classes.input} placeholder="Input placeholder"/>
            <Space w="md" />
            <Button variant="filled" color="teal">Search</Button>
        </Container>
    );
}