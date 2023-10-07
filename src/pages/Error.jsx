import { Header, Footer, Container } from "../components";

const ErrorPage = () => {
    return (
        <>
            <Header />
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">
                                An error occurred!
                            </h1>
                            &nbsp;
                            <p className="text-lg">
                                Could not find the page you were looking for.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default ErrorPage;