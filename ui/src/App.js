import './App.css';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import routes from "./Routes/routes";
import NotFoundPage from "./Pages/NotFound/notfound.page";
import HeaderComponent from "./Components/Header/header.component";

const client = new ApolloClient({
    uri: 'http://127.0.0.1:5000/graphql',
    cache: new InMemoryCache()
})

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        {
                            routes && routes.map(({id, path, component}) => (
                                <Route key={id} path={path} element={component}/>
                            ))
                        }
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
        </>
    );
}

export default App;
