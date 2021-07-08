function Footer({ footerClass }) {
    return (
        <footer className={footerClass}>

            <p>Powered by&nbsp;<a href='https://golang.org/' target='_blank'>Go</a>,&nbsp;<a href='https://reactjs.org/' target='_blank'>React</a>, and a lot of white wine.</p>
            <p>Copyright {new Date().getFullYear()}</p>

        </footer>
    )
}

export default Footer