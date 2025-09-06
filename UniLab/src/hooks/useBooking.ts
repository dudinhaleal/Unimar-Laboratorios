import { useState } from 'react'
import { BookingData } from '@/types'

const initialBookingData: BookingData = {
  name: '',
  course: '',
  laboratory: '',
  date: '',
  time: '',
  purpose: '',
}

export function useBooking() {
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const updateBookingData = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
  }

  const resetBookingData = () => {
    setBookingData(initialBookingData)
  }

  const submitBooking = () => {
    setBookingConfirmed(true)
    setTimeout(() => {
      setShowBookingForm(false)
      setBookingConfirmed(false)
      resetBookingData()
    }, 3000)
  }

  const openBookingForm = () => {
    setShowBookingForm(true)
  }

  const closeBookingForm = () => {
    setShowBookingForm(false)
  }

  return {
    bookingData,
    showBookingForm,
    bookingConfirmed,
    updateBookingData,
    resetBookingData,
    submitBooking,
    openBookingForm,
    closeBookingForm,
  }
}
