import React, { createElement } from 'react';

class Counter extends React.Component {
    state = { count: this.props.count || 0 }
    increment = () => {
        this.setState(prevState => ({count: prevState.count + 1}))
    }
    decrement = () => {
        this.setState(prevState => ({count: prevState.count - 1}))
    }

    render () {
        return createElement(
            'div',
            { className: 'counter'},
            createElement(
                'button',
                { className: 'counter-increment', onClick: this.increment},
                '+'
            ),
            createElement(
                'div',
                {className: 'counter-count'},
                createElement(
                    'h1',
                    {},
                    this.state.count
                )
            ),
            createElement(
                'button',
                { className: 'counter-decrement', onClick: this.decrement},
                '-'
            )
        )
    }
}

export default Counter;
