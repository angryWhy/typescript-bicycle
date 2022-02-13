import styled from "styled-components"
export const FooterWrapper = styled.div`
.footer{
    padding-left: 100px;
    color: #999;
    .hello-inc{
        padding: 100px;
    }
    .footer-logo{
            margin-left: 10px;
            display: inline-block;
            width: 150px;
        }
    .about-hello{
        ul{list-style-type: none;}
        ul li:first-child{
            color: #333;
        }
        li{
            padding: 5px 0;
        }
        a{
            margin: 0 5px;
            display: inline-block;
            width: 30px;
            height: 30px;
            background-repeat: no-repeat;
            background-size: contain;
        }
        a:nth-child(1){
            background-image: url(../../Assets/Img/layout__footer--sina.png);
        }
        a:nth-child(2){
            background-image: url(../../Assets/Img/layout__footer--twitter.png);
        }
        a:nth-child(3){
            background-image: url(../../Assets/Img/layout__footer--facebook.png);
        }
        a:nth-child(4){
            background-image: url(../../Assets/Img/layout__footer--ins.png);
        }
    }
    .footer-content{
        padding-left: 10px;
        font-weight: 400;
        span{
            display: block;
        }    
    }
    .footer-about{
            padding: 20px 0;
        }
}
`
