import React from 'react'

import NotFoundImg from '../../../../imgs/error.svg'

export default function NotFound() {
  return (
    <div className='notFound'>
        <img src={NotFoundImg} className='w-100 vh-100 ' alt='Not Found'/>
    </div>
  )
}
