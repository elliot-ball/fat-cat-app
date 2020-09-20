import React, { Component } from 'react';
import { connect } from "react-redux";
import { updatePreferences } from "../../redux/actions";
// import { Link } from '@reach/router';
import Slider, { Range } from 'rc-slider';
import Div100vh from 'react-div-100vh';
import { NavLink as RouterNavLink } from "react-router-dom";


import './slider.css';

import fatCat1 from '../../images/fat-cat-1.png';
// import SpeechBubble from '../SpeechBubble/SpeechBubble.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastTouched: 'lootBoxTier',
      descriptionClasses: 'slider-description radius-right',
      activeSpeech: "Hey looks like you are new here. Do you want me to teach you how to find free mobile games that aren't ruined by overly aggressive money making tactics?",
      lootBoxTiers: { 
        1: {
          name: 'None',
          description: "gameplay isn't progressed by chance (no slot machines, you progress with your own choices)"
        },
        2: {
          name: 'Cosmetic',
          description: 'contains no items that impact gameplay (e.g. weapon skins, emotes, emblems)'
        },
        3: {
          name: 'Inoffensive',
          description: 'contains items important to the game but can be earned reasonably'
        },
        4: {
          name: 'Annoying/\nGrindy',
          description: 'contains items important to the game and take too long to earn in order to encourage the player engaging in microtransactions'
        },
        5: {
          name: 'Unfair',
          description: 'Gameplay progression happens through random chance events (loot boxes, slot machines, etc) and users who pay have an unfair advantage in order to encourage you to engage in microtransactions'
          // description: 'contains weapons/items/consumables important to the game and take too long to earn in order to encourage the player to engage in microtransactions'
        }
      },
      lootBoxTier: 5,
      adTiers: {
        1: {
          name: 'None',
          description: 'No ads at all'
        },
        2: {
          name: 'Optional',
          description: 'an option to watch an ad to gain an item'
        },
        3: {
          name: 'Skippable',
          description: 'ads that you can skip up to a Max of 5 seconds in, any more and its classed as obsessive'
        },
        4: {
          name: 'Obtrusive/ infrequent',
          description: "ads take up part of the screen during gameplay or ads appear only every few levels, they aren't every time you level up or die"
        },
        5: {
          name: 'Obsessive',
          description: 'ads after every level even if they are partially skippable'
        }
      },
      adTier: 5,
      timerTiers: {
        1: {
          name: 'None',
          description: 'No forcing the player to wait or pay to bypass'
        },
        2: {
          name: 'Upgrades',
          description: 'requires you to wait or speed up an upgrade by paying a cost with a rare resource that the user usually has to pay for'
        },
        3: {
          name: 'Energy',
          description: 'requires you to some of your limited supply of "energy" to play'
        },
      },
      timerTier: 3,
    };
    this.handleSlide = this.handleSlide.bind(this);
    this.speechNext = this.speechNext.bind(this);

  }

  handleSlide(e, tier) {
    
    console.log(e);
    let borderDirection = 'radius-right';
    if(tier === 'adTier') {
      borderDirection = 'radius-right radius-left';
    } else if(tier === 'timerTier') {
      borderDirection = 'radius-left';
    }
    // this.state.handleSlide(e, tier);
    this.setState({
      [tier]: e,
      lastTouched: tier,
      descriptionClasses: 'slider-description ' + borderDirection
    });

  }

  speechNext() {
    this.setState({
      activeSpeech: "s"
    });
  }

  // handleSlide = (e, tier) => {
  //   this.setState({
  //     [tier]: e,
  //     // lastTouched: tier,
  //     // descriptionClasses: 'slider-description ' + borderDirection
  //   });
  // }

  submit() {
    const preferences = {
      lootBoxTier: this.state.lootBoxTier,
      adTier: this.state.adTier,
      timerTier: this.state.timerTier
    };
    this.props.updatePreferences(preferences);
    console.log(preferences);
  }

  render() {
    console.log(this.state.lastTouched);
    const { user } = this.props;
    var intViewportHeight = window.innerHeight;
    console.log(intViewportHeight/4);
    const wrapperStyle = {
      height: (intViewportHeight/5) - 20,
      width: 30,
      marginTop: 10,
      marginLeft: 40,
      marginRight: 30,
      marginBottom: 30,
    };

    document.ontouchmove = (e) => {
      e.preventDefault();
    }

    return (
      <Div100vh className="app-container">
        <nav className="grid-nav">
          {/* <Link to="/" className="nav-brand">
            Fat-cat.io
          </Link>
          <Link to="/contribute" className="pull-right yellow-btn">
            Submit your games
          </Link> */}
        </nav>

        <div className="cat-container">
            <img className="fat-cat" src={fatCat1} alt="Illustration of a greedy cat"/>
        </div>
        {/* <SpeechBubble></SpeechBubble> */}

        {/* <div className="shadow"></div> */}

        <div className="bg-row bg-left"></div>
        <div className="bg-row bg-middle"></div>
        <div className="bg-row bg-right"></div>

        <div className="attribute-name-row loot-boxes-column">
          <div className="slider-name">Loot Boxes</div>
        </div>

        <div className="attribute-value-row loot-boxes-column">
          <div className={(this.state.lastTouched === 'lootBoxTier' 
            ? 'slider-value slider-value-active'
            : 'slider-value')
          }>
            {(
              this.state.lootBoxTiers[this.state.lootBoxTier].name === 'Game Breaking'
              ? (<span>Game <br></br>Breaking</span>)
              : this.state.lootBoxTiers[this.state.lootBoxTier].name
            )}
            {/* {this.state.lootBoxTiers[this.state.lootBoxTier].name} */}
          </div>
        </div>

        <div className="attribute-name-row ads-column">
          <div className="slider-name">ADs</div>
        </div>

        <div className="attribute-value-row ads-column">
          <div className={
            (this.state.lastTouched === 'adTier' 
            ? 'slider-value slider-value-active'
            : 'slider-value')
          }>
            {this.state.adTiers[this.state.adTier].name}
          </div>
        </div>

        <div className="attribute-name-row timers-column">
          <div className="slider-name">Timers</div>
        </div>
        <div className="attribute-value-row timers-column">
          <div className={
            (this.state.lastTouched === 'timerTier' 
            ? 'slider-value slider-value-active'
            : 'slider-value')
          }>
            {this.state.timerTiers[this.state.timerTier].name}
          </div>
        </div>

        <div className="tier-description-container">
          <div className={this.state.descriptionClasses}>
            {this.state[this.state.lastTouched + 's'][this.state[this.state.lastTouched]].description}
          </div>
        </div>
      
        <div className="slider-row loot-boxes-slider">
          <Slider 
            min={1}
            max={5}
            defaultValue={this.state.lootBoxTier}
            marks={{ 1: 'None', 2: 'Cosmetic', 3: 'Inoffensive', 4: 'Annoying/Grindy', 5: 'Game Breaking' }}
            step={null}
            vertical={true}
            onChange={(e) => this.handleSlide(e, 'lootBoxTier')}
            onBeforeChange={(e) => this.handleSlide(e, 'lootBoxTier')}
          />
        </div>

        <div className="slider-row ads-slider">                
          <Slider 
            min={1}
            max={5}
            defaultValue={this.state.adTier}
            marks={{ 1: 'None', 2: 'Optional', 3: 'Skippable', 4: 'Obtrusive or infrequent', 5: 'Obsessive' }}
            step={null}
            vertical={true}
            onChange={(e) => this.handleSlide(e, 'adTier')}
            onBeforeChange={(e) => this.handleSlide(e, 'adTier')}
          />
        </div>

        <div className="slider-row timers-slider">
          <Slider 
            min={1}
            max={3}
            defaultValue={this.state.timerTier}
            marks={{ 1: 'None', 2: 'Upgrades', 3: 'Energy' }}
            step={null}
            vertical={true}
            onChange={(e) => this.handleSlide(e, 'timerTier')}
            onBeforeChange={(e) => this.handleSlide(e, 'timerTier')}
          />
        </div>

        <div className="grid-search-button">
          <div className="search-button">
            {/* <Link to="/results">
              Find games
            </Link> */}
            <RouterNavLink
              to="/results"
              exact
              onClick={(e) => this.submit(e)}
              // activeClassName="router-link-exact-active"
            >
              Find games
            </RouterNavLink>
          </div>
        </div>

      </Div100vh>        
    );
  }
}


export default connect(
  null,
  { updatePreferences }
  )(Home);

// export default Home;