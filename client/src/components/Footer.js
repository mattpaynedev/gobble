import { Footer, Paragraph } from 'grommet'
import { useLocation } from 'react-router-dom'
function FooterComponent({ footerClass }) {

    const location = useLocation()
    const home = location.pathname === "/"

    return (
        <Footer
            as="footer"
            alignContent="center"
            justify="center"
            border="top"
            margin={{ top: "small" }}
            direction="row-responsive"
            gap="small"
            pad="xsmall"
            background={home ? null : "light-1"}
            color={home ? "black" : "white"}
        >
            <Paragraph
                textAlign="center"
                margin="auto"
                size="small"
            >Powered by&nbsp;<a href='https://golang.org/' target='_blank' rel='noreferrer'>Go</a>,&nbsp;<a href='https://reactjs.org/' target='_blank' rel='noreferrer'>React</a>, and a lot of white wine.</Paragraph>
            <Paragraph
                textAlign="center"
                margin="auto"
                size="small"
            >Copyright {new Date().getFullYear()}</Paragraph>
        </Footer>
    )
}

export default FooterComponent