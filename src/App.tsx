import Header from "./Common/Header/index";
import Footer from "./Common/Footer/index";
import Nav from "./Common/Nav/index";

import { Row, Col } from "antd";
import 'antd/dist/antd.css';
import "antd/dist/antd.less"

import {AppWrapper} from "./app-style"
function App() {
  return (
    <AppWrapper className="App">
      <Row>
        <Col span={4}>
          <Nav className="navleft"/>
        </Col>
        <Col span={20} className="main">
          <Header />
          <Row>
            <Footer />
          </Row>
        </Col>
      </Row>
    </AppWrapper>
  );
}

export default App;
