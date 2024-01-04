import React, { Component } from 'react'
import SavedWordsList from '../components/SavedWordsList/SavedWordsList'

export default class Words extends Component {
  render() {
    return (
      <div>
        <SavedWordsList userId={this.props.userId} />
      </div>
    )
  }
}
