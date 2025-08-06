import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ViewPropTypes, AppState} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export class VideoTutorials extends Component {
  state = {fullscreen: false, appState: AppState.currentState};
  playerRef = React.createRef();

  onStateChange = state => {
    if (state === 'playing') {
      this.setState({fullscreen: true});
    } else {
      this.setState({fullscreen: false});
    }
  };

  onAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }
    this.setState({appState: nextAppState}, () => {
      if (this.playerRef.current) {
        this.playerRef.current.pause();
      }
    });
  };

  componentDidMount() {
    // AppState.addEventListener("change", this.onAppStateChange);
  }

  componentWillUnmount() {
    // AppState.removeEventListener("change", this.onAppStateChange);
  }

  componentDidUpdate(prevProps) {
    if (this.props.videoId !== prevProps.videoId) {
      if (this.playerRef.current) {
        this.playerRef.current.pause();
      }
    }
  }

  render() {
    const {videoId = '', autoPlay = false, style} = this.props;

    return (
      <YoutubePlayer
        ref={this.playerRef}
        height={450}
        width={450}
        videoId={videoId}
        play={autoPlay}
        onChangeState={this.onStateChange}
        webViewProps={{allowsFullscreenVideo: true}}
        style={style}
      />
    );
  }
}

VideoTutorials.propTypes = {
  videoId: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool,
  onReady: PropTypes.func,
  onError: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
VideoTutorials.defaultProps = {
  onReady: () => {},
  onError: () => {},
};
export default VideoTutorials;
