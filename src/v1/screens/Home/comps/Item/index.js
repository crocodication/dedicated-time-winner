import React from 'react'


import { getInitial } from '../../../../helpers/Initial'


import './styles.css'


export default class extends React.Component {
    render() {
        const { isUseMarginRight, item } = this.props

        return (
            <a
                href = '/v1/#'
                onClick = {this.props.seeItem}
                ref = {ref => this.button = ref}
                style = {{
                    marginBottom: 20,
                    marginRight: isUseMarginRight ? 0 : 20
                }}
            >
                <div
                    className = "text-icon-container"
                    style = {{
                        backgroundColor: item.color
                    }}
                >
                    <p className = "text-icon">
                        {getInitial(item.name)}
                    </p>
                </div>

                <h2 className = "name">
                    {item.name}
                </h2>
            </a>
        )
    }
}