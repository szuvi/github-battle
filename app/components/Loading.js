import * as React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.text,
    };
  }

  componentDidMount() {
    const { content } = this.state;
    const { text, speed } = this.props;

    this.interval = window.setInterval(() => {
      // eslint-disable-next-line no-unused-expressions
      content === `${text}...`
        ? this.setState(() => this.setState({ content: text }))
        : // eslint-disable-next-line no-shadow
          this.setState(({ content }) => this.setState({ content: `${content}.` }));
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { content } = this.state;
    return <p style={styles.content}>{content}</p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
};
