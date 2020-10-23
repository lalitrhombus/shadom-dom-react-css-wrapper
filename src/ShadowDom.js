import React, { Component, Fragment } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import PropTypes from 'prop-types';


export default class ShadowDom extends Component {
  constructor(props){
    super(props)
    this.getTargetRef = this.getTargetRef.bind(this);
  }
  componentDidMount() {
    const { children, delegatesFocus } = this.props;
    this.shadowRoot = this.target.attachShadow({ mode: 'open', delegatesFocus });
    const styleDiv = document.createElement('div');
    styleDiv.innerHTML = document.getElementById(window.styleLocation).shadowRoot.innerHTML;
    const conentDiv = document.createElement('div');
    this.shadowRoot.appendChild(conentDiv);
    this.shadowRoot.appendChild(styleDiv);

    render(<Fragment>{ children }</Fragment>, conentDiv)
  }
  componentDidUpdate() {
    const { children } = this.props;
    render(<Fragment>{ children }</Fragment>, this.shadowRoot);
  }
  componentWillUnmount() {
    unmountComponentAtNode(this.shadowRoot);
  }
  getTargetRef(c) {
    const { nodeRef } = this.props;
    this.target = c;
    nodeRef && nodeRef(c);
  }
  render() {
    // Don't pass children and delegatesFocus with spread.
    const { tag, delegatesFocus, children, lightDom, ...rest } = this.props;
    const ShadowDomTag = tag;
    return (
      <ShadowDomTag id="mainContainer" ref={ this.getTargetRef } { ... rest }>
        { lightDom() }
      </ShadowDomTag>
    );
  }
}
ShadowDom.propTypes = {
  tag: PropTypes.string,
  delegatesFocus: PropTypes.bool,
  nodeRef: PropTypes.func,
  lightDom: PropTypes.func,
}
ShadowDom.defaultProps = {
  tag: 'div',
  delegatesFocus: false,
  lightDom: () => null
}
