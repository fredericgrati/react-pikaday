'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pikaday = require('pikaday');

var _pikaday2 = _interopRequireDefault(_pikaday);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactPikaday = _react2.default.createClass({
  displayName: 'ReactPikaday',


  propTypes: {
    value: _react2.default.PropTypes.instanceOf(Date),
    onChange: _react2.default.PropTypes.func,

    valueLink: _react2.default.PropTypes.shape({
      value: _react2.default.PropTypes.instanceOf(Date),
      requestChange: _react2.default.PropTypes.func.isRequired
    })
  },

  getValueLink: function getValueLink(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange
    };
  },

  setDateIfChanged: function setDateIfChanged(newDate, prevDate) {
    var newTime = newDate ? newDate.getTime() : null;
    var prevTime = prevDate ? prevDate.getTime() : null;

    if (newTime !== prevTime) {
      if (newDate === null) {
        // Workaround for pikaday not clearing value when date set to falsey
        this.refs.pikaday.value = '';
      }
      this._picker.setDate(newDate, true); // 2nd param = don't call onSelect
    }
  },

  componentDidMount: function componentDidMount() {
    var el = this.refs.pikaday;

    this._picker = new _pikaday2.default({
      field: el,
      onSelect: this.getValueLink(this.props).requestChange
    });

    this.setDateIfChanged(this.getValueLink(this.props).value);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var newDate = this.getValueLink(nextProps).value;
    var lastDate = this.getValueLink(this.props).value;

    this.setDateIfChanged(newDate, lastDate);
  },

  render: function render() {
    return _react2.default.createElement('input', { type: 'text', ref: 'pikaday', className: this.props.className,
      placeholder: this.props.placeholder, disabled: this.props.disabled });
  }
});

exports.default = ReactPikaday;