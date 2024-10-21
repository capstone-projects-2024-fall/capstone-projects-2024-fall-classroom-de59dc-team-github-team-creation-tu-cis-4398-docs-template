//import HUD from "../../components/HUD/HUD";
import squareImg from './square.png';
import circleImg from './circle.png';
import triangleImg from './triangle.png';


const AvatarPage = () => (
    <div>
        <h1> Avatar Page </h1>
        {/*<HUD />*/}
        <div>
            <img src={squareImg} alt ="Square Shape" style = {{ width:'100px'}} />
            <img src={circleImg} alt ="Circle Shape" style = {{ width:'100px', marginLeft: '10px'}} />
            <img src={triangleImg} alt ="Triangle Shape" style = {{ width:'100px', marginLeft: '10px'}} />
        </div>

    </div>
);

export default AvatarPage;