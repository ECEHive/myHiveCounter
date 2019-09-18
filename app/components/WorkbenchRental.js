import React from 'react';

export default class WorkbenchRental extends React.Component {
  componentDidMount (): void {
    document.addEventListener('keydown', (e) => {
      console.log(e)
    })
  }

  render() {
    return (
      <div>Yeet</div>
    )
  }
}
