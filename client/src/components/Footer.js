function Footer({ footerClass }) {
    return (
        <footer className={footerClass}>
            <div>
                Powered by&nbsp;<a href='https://golang.org/' target='_blank'> Go </a>,&nbsp;<a href='https://reactjs.org/' target='_blank'>React</a>, and a lot of white wine. Copyright {new Date().getFullYear()}
            </div>
        </footer>
    )
}

export default Footer