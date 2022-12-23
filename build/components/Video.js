"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Pop = require("./Pop");

var _Pop2 = _interopRequireDefault(_Pop);

var _Overlay = require("./Overlay");

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoPop = function (_Component) {
  _inherits(VideoPop, _Component);

  function VideoPop() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VideoPop);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoPop.__proto__ || Object.getPrototypeOf(VideoPop)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      show: true,
      top: null,
      currTime: null,
      popPlaying: true,
      play: _this.props.autoplay,
      mute: _this.props.mute,
      Vid: _react2.default.createRef()
    }, _this.handleChange = function (time) {
      var node = _this.state.Vid.current;
      _this.setState({
        currTime: time
      }, function () {
        node.currentTime = _this.state.currTime;
        node.play();
      });
    }, _this.muteVids = function () {
      var node = _this.state.Vid.current;
      var val = !_this.state.mute;
      _this.setState({
        mute: val
      }, function () {
        node.muted = _this.state.mute;
      });
    }, _this.playVids = function () {
      var node = _this.state.Vid.current;
      var val = !_this.state.play;
      _this.setState({
        play: val,
        popPlaying: val
      }, function () {
        if (!_this.state.popPlaying) {
          _this.state.play ? node.play() : node.pause();
        }
      });
    }, _this.closeVids = function (time) {
      var node = _this.state.Vid.current;
      node.currentTime = time;
      _this.setState({
        show: false,
        popPlaying: false
      });
      _this.props.onClose && _this.props.onClose();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VideoPop, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var node = this.state.Vid.current;
      this.state.mute ? node.muted = true : node.muted = false;
      this.state.play ? node.play() : node.pause();
      this.setState({
        top: ~~(window.scrollY + node.top)
      });
      Object.defineProperty(HTMLMediaElement.prototype, "playing", {
        get: function get() {
          return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
        },
        configurable: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          Src = _props.Src,
          root = _props.root,
          Poster = _props.Poster,
          ratio = _props.ratio;
      var _state = this.state,
          Vid = _state.Vid,
          show = _state.show,
          currTime = _state.currTime,
          mute = _state.mute,
          play = _state.play;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_Pop2.default, {
          src: Src,
          vidRef: Vid,
          root: root,
          Show: show,
          currtime: currTime,
          change: this.handleChange,
          closeVid: this.closeVids,
          muteVid: this.muteVids,
          playVid: this.playVids,
          mute: mute,
          play: play,
          ratio: ratio
        })
      );
    }
  }]);

  return VideoPop;
}(_react.Component);

VideoPop.defaultProps = {
  Src: null,
  root: null,
  Poster: null,
  mute: false,
  autoplay: true
};
exports.default = VideoPop;


VideoPop.propTypes = {
  Src: _propTypes2.default.string,
  root: _propTypes2.default.string,
  Poster: _propTypes2.default.string,
  mute: _propTypes2.default.bool,
  autoplay: _propTypes2.default.bool,
  ratio: _propTypes2.default.object,
  onClose: _propTypes2.default.func
};