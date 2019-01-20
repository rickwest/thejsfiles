import React from 'react'

import { rhythm } from '../utils/typography'

class Newsletter extends React.Component {
  render() {
    return (
      <form
        style={{textAlign: 'center'}}
        action="https://tinyletter.com/thejsfiles"
        method="post"
        target="popupwindow"
        onSubmit="window.open('https://tinyletter.com/thejsfiles', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
      >
        <h4>Stay in touch!</h4>
        <p>
          <label htmlFor="tlemail">Enter your email address to get notified when a new interview is published.</label>
        </p>
        <input type="text" style={{ width: '100%', marginBottom: rhythm(0.5), }} name="email" id="tlemail" placeholder={' Email address'}/>
        <input type="hidden" value="1" name="embed"/>
        <input type="submit" value="Subscribe" style={{
          width: '100%',
          backgroundColor: '#323330',
          color: '#fff',
          cursor: 'pointer',
          borderColor: '#323330',
        }} />
      </form>
    )
  }
}

export default Newsletter