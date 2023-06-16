import SvgIcon from '../components/SvgIcon';

const WeatherIcon = ({ name, width = 200, fallBack = '00' }) => {
    const enumIcon = {
    '00' : 'wind',
    '01d': 'clear_sky',
    '01n': 'clear_night',
    '02d': 'clouds',
    '02n': 'clouds',
    '03d': 'cloudy_sun',
    '03n': 'cloudy_moon',
    '04d': 'cloudy_sun',
    '04n': 'cloudy_moon',
    '09d': 'rain',
    '09n': 'rain',
    '10d': 'raindrops',
    '10n': 'raindrops',
    '11d': 'thunder',
    '11n': 'thunder',
    '13d': 'snow',
    '13n': 'snow',
    '50d': 'clouds',
    '50n': 'clouds',
    'wind_value'    : 'wind_value',
    'humidity_value': 'humidity_value',
    'sight_value'   : 'sight_value',
  };

  let iconName;
  enumIcon[name] == undefined ? 
    iconName = enumIcon[fallBack] : 
    iconName = enumIcon[name]; 

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
  