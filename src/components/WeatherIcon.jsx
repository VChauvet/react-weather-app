import SvgIcon from '../components/SvgIcon';
import { weatherStylings } from '../data/weatherAssociatedList';

function WeatherIcon({ name, width = 200, fallBack = '00', className }) {
  let iconName = weatherStylings[name].img_name ?? weatherStylings[fallBack].img_name;  

  return (
    <div className={className}>
      <SvgIcon
          iconName={iconName}
          svgProp={{
          className: 'icon',
          width: width,
          }}
      />
    </div>
  )
}
  
export default WeatherIcon;