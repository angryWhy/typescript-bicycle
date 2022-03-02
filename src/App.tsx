import Header from "./Common/Header/index";
import Footer from "./Common/Footer/index";
import Nav from "./Common/Nav/index";
import {HashRouter} from "react-router-dom"
import { Row, Col } from "antd";
import 'antd/dist/antd.css';
import "antd/dist/antd.less"

import { AppWrapper } from "./app-style"
import Main from "./router/index";
function App() {
  return (
    <AppWrapper className="App">
       <HashRouter>
      <Row>
        <Col span={4}>
          <Nav className="navleft" />
        </Col>
        <Col span={20} >
          <Header />
          <Row className="content main">
            <Col span={24}>
              <Main />
            </Col>
          </Row>
          <Footer className="footer" />
        </Col>
      </Row>
      </HashRouter>
    </AppWrapper>
  );
}

export default App;
