
import React from 'react'
import { FormattedMessage } from 'react-intl'

const date = new Date('2017-11-16')
const expires = new Date(1459832991883)
const IntlExamples = () => (
  <div style={styles.container}>
    <div>
      <b>Format message:</b>&nbsp; <FormattedMessage id='examples.formatMessage' values={{ value: <b>foo</b> }} />
      <br />
      <br />
      <b>Format date:</b>&nbsp; <FormattedMessage id='examples.formatDate' values={{ when: date }} />
      <br />
      <br />
      <b>Format number:</b>&nbsp; <FormattedMessage id='examples.formatNumber' values={{ value: 1000, percentage: 0.51 }} />
      <br />
      <br />
      <b>Format plural:</b>&nbsp; <FormattedMessage id='examples.formatPlural' values={{ value: 1, values: 3 }} />
      <br />
      <br />
      <b>Format time:</b>&nbsp; <FormattedMessage id='examples.formatTime' values={{ expires }} />
    </div>
  </div>
)

const styles = {
  container: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem',
  },
}

export default IntlExamples
