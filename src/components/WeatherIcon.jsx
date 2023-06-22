import SvgIcon from '../components/SvgIcon';
import { weatherStylings } from '../data/weatherAssociatedList';

const WeatherIcon = ({ name, width = 200, fallBack = '00' }) => {
  let iconName;
  weatherStylings[name] == undefined ? 
    iconName = weatherStylings[fallBack].img_name : 
    iconName = weatherStylings[name].img_name; 

  return (
    <SvgIcon
        iconName={iconName}
        svgProp={{
        className: 'icon',
        width: width,
        }}
    />
  )
}
  
export default WeatherIcon;
  