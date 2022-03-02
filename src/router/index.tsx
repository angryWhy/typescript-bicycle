import * as React from 'react';
import { Route} from 'react-router-dom';
import Home from '../Components/Home';
import Poewman from  "../Components/power-manger/index"
import Line from '../Components/Echarts/Line';
import Pie from '../Components/Echarts/Pie';
import Bar from '../Components/Echarts/Bar';
import BikeMap from '../Components/bike-manger';
import User from '../Components/user-manger';
import Order from '../Components/Order-manger';
import CityCpn from '../Components/City-manager';
import HighTable from '../Components/Table/HighTable';
import BaseTable from '../Components/Table/BaseTable';
import Register from '../Components/Form/Register';
import Login from '../Components/Form/Login';
import CarSoule from '../Components/Ui/Carsoule';
import Gallery from '../Components/Ui/Gallery';
import Tabui from '../Components/Ui/Tab';
import All from '../Components/Ui/ALL_message';
import Messageinfo from '../Components/Ui/MessageInfo';
import Load from '../Components/Ui/Loading';
import Alert from '../Components/Ui/Dialog';
import ButtonPage from '../Components/Ui/Button/index';
interface IRouterProps {
}

const RouterPage: React.FunctionComponent<IRouterProps> = (props) => {
    return (
        <div>
            <Route path="/ui/buttons" component={ButtonPage} exact/>
            <Route path="/ui/modals" component={Alert} exact/>
            <Route path="/ui/loadings" component={Load} exact/>
            <Route path="/ui/notification" component={All} exact/>
            <Route path="/ui/messages" component={Messageinfo} exact/>
            <Route path="/ui/tabs" component={Tabui} exact/>
            <Route path="/ui/gallery" component={Gallery} exact/>
            <Route path="/ui/carousel" component={CarSoule} exact/>
            <Route path="/ui/carousel" component={CarSoule} exact/>
            <Route path="/form/login" component={Login} exact/>
            <Route path="/form/reg" component={Register} exact/>
            <Route path="/table/basic" component={BaseTable} exact/>
            <Route path="/table/high" component={HighTable} exact/>
            <Route path="/city" component={CityCpn} exact/>
            <Route path="/order" component={Order} exact/>
            <Route path="/user" component={User} exact/>
            <Route path="/bikeMap" component={BikeMap} exact/>
            <Route path="/charts/bar" component={Bar} exact/>
            <Route path="/charts/pie" component={Pie} exact/>
            <Route path="/charts/line" component={Line} exact/>
            <Route path="/permission" component={Poewman} exact/>
            <Route path="/" component={ButtonPage} exact/>
            <Route path="/home" component={Home} exact/>
            <Route path="/ui" component={ButtonPage} exact/>
            <Route path="/form" component={ButtonPage} exact/>
            <Route path="/table" component={ButtonPage} exact/>
            <Route path="/charts" component={ButtonPage} exact/>
        </div>
    );
};

export default RouterPage;
