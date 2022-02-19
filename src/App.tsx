import Header from "./Common/Header/index";
import Footer from "./Common/Footer/index";
import Nav from "./Common/Nav/index";

import { Row, Col } from "antd";
import 'antd/dist/antd.css';
import "antd/dist/antd.less"

import { AppWrapper } from "./app-style"
import Alert from "./Common/BaseTable(工程化)/index";
function App() {
  return (
    <AppWrapper className="App">
      <Row>
        <Col span={4}>
          <Nav className="navleft" />
        </Col>
        <Col span={20} >
          <Header />
          <Row className="content main">
            <Col span={24}>
              <Alert />
            </Col>
          </Row>
          <Footer className="footer" />
        </Col>
      </Row>
    </AppWrapper>
  );
}

export default App;
