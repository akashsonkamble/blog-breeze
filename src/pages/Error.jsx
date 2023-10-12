import { Footer, Container, Logo, Button } from "../components";

import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <>
            <header className="py-3 bg-#d2e2f2 border-b-2 border-500">
                <Container>
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="150px" />
                        </Link>
                    </div>
                </Container>
            </header>
            <div className="w-full py-8 mt-4 text-center">
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-4xl font-bold">
                                Something went wrong!
                        </h1>
                        &nbsp;
                        <p className="text-lg">
                            Could not find the page you were looking for.
                        </p>
                        <Button className="mt-6">
                            <Link to="/">Back to Home</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ErrorPage;