'use client'
import React, { useEffect, useState } from 'react'

import classes from './index.module.scss'
const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Calculate the target date as current date + 7 days
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 7)

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the time remaining
      const now = new Date()
      const remaining = Math.max(Number(targetDate) - Number(now), 0) // Ensure remaining time is non-negative

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((remaining / (1000 * 60)) % 60)
      const seconds = Math.floor((remaining / 1000) % 60)

      // Update the state with the calculated time
      setTime({ days, hours, minutes, seconds })

      // Clear the interval when the target date is reached
      if (remaining === 0) {
        clearInterval(interval)
      }
    }, 1000)

    // Clean up the interval when the component unmounts or when the target date is reached
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Deals of the month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals of the Month! Every
          purchase comes with exclusive perks and offers, making this month a celebration of savvy
          choices and amazing deals. Don't miss it out! 🎁 🛒
        </p>
        <ul className={classes.stats}>
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>
      </div>
    </section>
  )
}

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

export default Promotion
