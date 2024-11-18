import { Button, Card, Group, Image, Stack, Text } from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}


export function ProductCard(props: ProductCardProps) {
    const navigate = useNavigate();
    const { name, description, price, image } = props;
    return (
        <Card 
            shadow="sm" 
            radius="md" 
            withBorder 
            style={{ cursor: 'pointer' }} 
            onClick={() => {navigate(`/products`)}}
        >
            <Card.Section>
                <Image src={image} alt={name} height={180}/>
            </Card.Section>

            <Card.Section>
                <Stack justify="center" pl="md">
                    <Text fz="lg" fw={500}>
                        {name}
                    </Text>
                    <Text fz="sm" mt="sm">
                        {description}
                    </Text>
                    <Text mt="sm" fw={700}>
                        ${price}
                    </Text>
                </Stack> 
            </Card.Section>

            <Group mt="sm">
                <Button color="green" style={{ flex: 1 }} rightSection={<IconShoppingCartPlus/>}>
                    Add to cart
                </Button>
            </Group>
        </Card>
    )
}