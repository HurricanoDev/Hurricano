const React = require("react");

export default class App extends React.Component {
  constructor(props) {
    this.props = props;
    super(props);
  }

  render(props = null) {
    if (props == null) props = this.props;
    return <p>props.description</p>;
  }
}
