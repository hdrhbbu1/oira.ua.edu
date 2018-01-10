import React from 'react'
import Image from './soilogo_large.jpg'

export default () => (
  <div>
    <h2>Student Opinions</h2>
    <a href="http://oira.ua.edu/soi/" target="_blank" rel="noopener">
      <img src={Image} alt="Student Opinions" />
    </a>
    <p>
      SOI online course evaluation surveys are available to students near the
      end of each semester, usually during the last two weeks of classes.
      Students receive an invitation email from Provost Kevin Whitaker with
      instructions at the beginning of each data collection cycle. Periodic
      reminders from Dr. Whitaker are sent until a student has completed all
      their surveys. Instructors can monitor response rates in all of their
      participating classes through the SOI website. Class reports are usually
      available to instructors several days after the due date for grades
      submission.
    </p>
  </div>
)
