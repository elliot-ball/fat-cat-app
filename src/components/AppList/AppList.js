import React, { useState, useEffect, ReactDOM} from 'react';
import { FaGooglePlay, FaBan, FaMoneyBillAlt, FaBoxOpen, FaNewspaper, FaStopwatch, FaStar } from 'react-icons/fa';
import obsessiveAdsIcon from '../../images/obsessive-ads.png';
import obtrusiveAdsIcon from '../../images/obtrusive-or-infrequent-ads.png';
import skippableAdsIcon from '../../images/skippable-ads.png';
import optionalAdsIcon from '../../images/optional-ads.png';

import '../AppList/appList.css';

import { connect } from "react-redux";
import { getPreferencesState } from "../../redux/selectors";

// class AppList extends Component {
const AppList = ({preferences}) => {
  // constructor(props) {
  //   super(props);
    // this.state = {
    //   meetingName: ''
    // };
    // console.log(props);

    const icons = {FaGooglePlay, FaBan, FaMoneyBillAlt, FaBoxOpen, FaNewspaper, FaStopwatch}

    let { lootBoxTier, adTier, timerTier } = preferences;

    // console.log(preferences);

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  // }

  const [message, setMessage] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const snakeKeysToCamel = (snakeObject) => {
    var camelObject = {};
    for (var snakeKey in snakeObject) {
        if (snakeObject.hasOwnProperty(snakeKey)) {
            const camelKey = snakeKey.replace(/_\w/g, function(match) {
                return match[1].toUpperCase();
            });
            camelObject[camelKey] = snakeObject[snakeKey];
            if (camelObject[camelKey] !== null && typeof camelObject[camelKey] === 'object') {
                camelObject[camelKey] = snakeKeysToCamel(camelObject[camelKey]);
            }
        }
    }
    return camelObject;
  };

  const callApi = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{
          lootBoxTier: lootBoxTier,
          adTier: adTier,
          timerTier: timerTier
        }])
    };
      // const response = await fetch(`${apiUrl}/api/public-message`);
      const response = await fetch(`http://localhost:7000/api/list`, requestOptions);

      const responseData = await response.json();
      
      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleChange = (e) => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    this.props.addMeeting(this.state.meetingName);
    this.setState({ meetingName: '' });
  }

  const calculateScore = (item) => {
    return item.adTier;
  }

  const getTags = (app) => {
    const icons = {
      FaMoneyBillAlt: FaMoneyBillAlt, FaBoxOpen: FaBoxOpen,
      FaNewspaper: FaNewspaper, FaStopwatch: FaStopwatch
    };
    const tagDefinitions = [
      { name: 'No In App Purchases', icon: 'FaMoneyBillAlt', propName: 'offersIap', matchCriteria: false, class: 'good' },
      { name: 'One Time Purchase', icon: 'FaMoneyBillAlt', propName: 'fixedRateIap', matchCriteria: true, class: 'good' },
      { name: 'In App Purchases', icon: 'FaMoneyBillAlt', propName: 'fixedRateIap', matchCriteria: false, class: 'terrible' },
      { name: 'No Lootboxes', icon: 'FaBoxOpen', propName: 'lootBoxTier', matchCriteria: '1', class: 'good' },
      { name: 'Cosmetic Lootboxes', icon: 'FaBoxOpen', propName: 'lootBoxTier', matchCriteria: '2', class: 'ok' },
      { name: 'Inoffensive Lootboxes', icon: 'FaBoxOpen', propName: 'lootBoxTier', matchCriteria: '3', class: 'bad' },
      { name: 'Grindy Lootboxes', icon: 'FaBoxOpen', propName: 'lootBoxTier', matchCriteria: '4', class: 'terrible' },
      { name: 'Unfair Lootboxes', icon: 'FaBoxOpen', propName: 'lootBoxTier', matchCriteria: '5', class: 'worst' },
      { name: 'No Ads', icon: 'FaNewspaper', propName: 'adTier', matchCriteria: '1', class: 'good' },
      { name: 'Optional Ads', icon: 'FaNewspaper', propName: 'adTier', matchCriteria: '2', class: 'ok' },
      { name: 'Skippable Ads', icon: 'FaNewspaper', propName: 'adTier', matchCriteria: '3', class: 'bad' },
      { name: 'Infrequent Ads', icon: 'FaNewspaper', propName: 'adTier', matchCriteria: '4', class: 'terrible' },
      { name: 'Obsessive Ads', icon: 'FaNewspaper', propName: 'adTier', matchCriteria: '5', class: 'worst' },
      { name: 'No Timers', icon: 'FaStopwatch', propName: 'timerTier', matchCriteria: '1', class: 'good' },
      { name: 'Upgrade Timers', icon: 'FaStopwatch', propName: 'timerTier', matchCriteria: '2', class: 'bad' },
      { name: 'Energy Timers', icon: 'FaStopwatch', propName: 'timerTier', matchCriteria: '3', class: 'worst' },
    ];
    return tagDefinitions.map((tagDef) => {
      let icon = React.createElement(icons[tagDef.icon]);
      if (app[tagDef.propName] === tagDef.matchCriteria) {
        console.log(tagDef.icon);
        return <div className={'item-tag ' + tagDef.class}>{icon} {tagDef.name}</div>;
      }
    });
  }

  useEffect(() => {
    callApi();
    console.log(message);
  }, []);

  if (message) {
    
    const appList = message.map((item, index) => {

      let app = snakeKeysToCamel(item);
      let tags = getTags(app);
      let tier = Math.floor(app.fcScore / 10);
      console.log(app);
      return (
        <div className="list-item-container d-flex" key={index}>
          <div className="list-item">
            <div className="item-fc-score">
              <div className="score-container">
                {/* <div className="score-label">SCORE</div> */}
                <div className={'score tier-' + tier}>{app.fcScore - 1}</div>
              </div>
            </div>
            <div className="item-title-container">
              <div>
                <div className="app-icon">
                  <img src={app.icon}/>
                </div>
                <div>
                  <div className="item-name text-left align-self-start">
                    {app.title}
                  </div>
                </div>
              </div>
            </div>          
            
            <div>
                  {/* <div className="item-gp-score">
                  </div> */}
              <div className="item-genre">
                <FaStar className="icon-adjust" /> {app.genre} <FaStar className="icon-adjust" /> {app.scoreText}
              </div>
              <div className="item-summary">
                {app.summary}
              </div>
              <div className="tag-container">{tags}</div>
              {/* <div>
                Contains:
                <div className="flex">{tags}</div>
              </div> */}
            </div>
          </div>
          {/* <div
            className="btn-group align-self-end playstore-btn"
            role="group"
            aria-label="Meeting Options"
          >
            <a
              className="btn btn-sm btn-outline-light"
              title="View in Google playstore"
              href={app.url}
              target="_BLANK"
            >
              <FaGooglePlay />
            </a>

          </div> */}
        </div>
      );
    });
    return appList;
  }
  else {
    return (
      <div></div>
    );
  }
  
};

const mapStateToProps = state => {
  console.log(state);
  const preferences = getPreferencesState(state);
  console.log(preferences);
  return { preferences };
};

export default connect(mapStateToProps)(AppList);
// export default AppList;
