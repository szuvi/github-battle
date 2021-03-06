/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

export default function withHover(Component, hoverProp = 'hovering') {
  return class WithHover extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        hovering: false,
      };

      this.mouseOver = this.mouseOver.bind(this);
      this.mouseOut = this.mouseOut.bind(this);
    }

    mouseOver() {
      this.setState({
        hovering: true,
      });
    }

    mouseOut() {
      this.setState({
        hovering: false,
      });
    }

    render() {
      const { hovering } = this.state;
      const props = {
        [hoverProp]: hovering,
        ...this.props,
      };

      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...props} />
        </div>
      );
    }
  };
}
