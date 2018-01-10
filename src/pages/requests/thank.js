import React from 'react'
import PageTitle from '../../components/PageTitle'

export default () => (
  <div>
    <PageTitle name="Information Requests" />
    <h1>Request Submitted</h1>
    <p>Thank you for your request submission</p>
    {typeof window !== 'undefined' &&
      window.location.hash && (
        <p>
          Your request has been assigned the ID number of {window.location.hash}.
        </p>
      )}
  </div>
)
