import React from 'react';

type Props = {
  render: boolean,
  children: Node
};

export default class ConditionalRender extends React.PureComponent<Props> {
  render() {
    return this.props.render ? this.props.children : null;
  }
}
