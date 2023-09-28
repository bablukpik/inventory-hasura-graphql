import { useState } from "react";
import { Layout, Typography } from "antd";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import Products from "./components/Products";
import "./App.css";

const { Header, Content } = Layout;
const { Title } = Typography;
const GRAPHQL_API_URI =
  process.env.GRAPHQL_API_URI || "http://localhost:8080/v1/graphql";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_API_URI,
    }),
    cache: new InMemoryCache(),
  });
};

function App() {
  const [client] = useState(createApolloClient());

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Layout style={{ height: "100vh" }}>
          <Header style={{ display: "flex", alignItems: "center" }}>
            <Title style={{ color: "white", margin: 0, textAlign: "left" }}>
              Inventory App
            </Title>
          </Header>
          <Content style={{ padding: "1em" }}>
            <Products />
          </Content>
        </Layout>
      </div>
    </ApolloProvider>
  );
}

export default App;
