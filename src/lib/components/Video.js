import React, { Component } from "react";
import PropTypes from "prop-types";
import Pop from "./Pop";
import Overlay from "./Overlay";
class VideoPop extends Component {
  state = {
    show: true,
    top: null,
    currTime: null,
    popPlaying: true,
    play: this.props.autoplay,
    mute: this.props.mute,
    Vid: React.createRef(),
  };

  static defaultProps = {
    Src: null,
    root: null,
    Poster: null,
    mute: false,
    autoplay: true,
  };

  componentDidMount() {
    const node = this.state.Vid.current;
    this.state.mute ? (node.muted = true) : (node.muted = false);
    this.state.play ? node.play() : node.pause();
    this.setState({
      top: ~~(window.scrollY + node.top),
    });
    Object.defineProperty(HTMLMediaElement.prototype, "playing", {
      get: function () {
        return !!(
          this.currentTime > 0 &&
          !this.paused &&
          !this.ended &&
          this.readyState > 2
        );
      },
      configurable: true,
    });
  }

  handleChange = (time) => {
    const node = this.state.Vid.current;
    this.setState(
      {
        currTime: time,
      },
      () => {
        node.currentTime = this.state.currTime;
        node.play();
      }
    );
  };

  muteVids = () => {
    const node = this.state.Vid.current;
    const val = !this.state.mute;
    this.setState(
      {
        mute: val,
      },
      () => {
        node.muted = this.state.mute;
      }
    );
  };

  playVids = () => {
    const node = this.state.Vid.current;
    const val = !this.state.play;
    this.setState(
      {
        play: val,
        popPlaying: val,
      },
      () => {
        if (!this.state.popPlaying) {
          this.state.play ? node.play() : node.pause();
        }
      }
    );
  };

  closeVids = (time) => {
    const node = this.state.Vid.current;
    node.currentTime = time;
    this.setState({
      show: false,
      popPlaying: false,
    });
  };

  render() {
    const { Src, root, Poster, ratio } = this.props;
    const { Vid, show, currTime, mute, play } = this.state;
    return (
      <React.Fragment>
        {/* {show ? <Overlay /> : null} */}
        <Pop
          src={Src}
          vidRef={Vid}
          root={root}
          Show={show}
          currtime={currTime}
          change={this.handleChange}
          closeVid={this.closeVids}
          muteVid={this.muteVids}
          playVid={this.playVids}
          mute={mute}
          play={play}
          ratio={ratio}
        />
      </React.Fragment>
    );
  }
}

export default VideoPop;

VideoPop.propTypes = {
  Src: PropTypes.string,
  root: PropTypes.string,
  Poster: PropTypes.string,
  mute: PropTypes.bool,
  autoplay: PropTypes.bool,
  ratio: PropTypes.object,
};
