import { Footer, Paragraph } from 'grommet'
function FooterComponent({ footerClass }) {
    return (
        <Footer
            as="footer"
            alignContent="center"
            justify="center"
            border="top"
            direction="row-responsive"
            gap="small"
            pad="xsmall"
        >
            <Paragraph
                textAlign="center"
                margin="auto"
                size="small"
            >Powered by&nbsp;<a href='https://golang.org/' target='_blank'>Go</a>,&nbsp;<a href='https://reactjs.org/' target='_blank'>React</a>, and a lot of white wine.</Paragraph>
            <Paragraph
                textAlign="center"
                margin="auto"
                size="small"
            >Copyright {new Date().getFullYear()}</Paragraph>


        </Footer>
    )
}

export default FooterComponent