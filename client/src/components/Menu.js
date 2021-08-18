import { Anchor, Box, Text } from "grommet";



export default function Menu() {


    return (
        <Box
            direction='column'
            background='light-2'
            width='200px'
            height='200px'
        >
            <Anchor
                href='/'
                label={
                    <Text
                        size='medium'
                        color='black'
                    >Home</Text>
                }
            />

        </Box>
    )
}