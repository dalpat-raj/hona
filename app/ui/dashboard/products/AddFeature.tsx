import { AddFeaturelProps } from '@/lib/definations'
import React from 'react'


const AddFeature:React.FC<AddFeaturelProps> = ({formData}) => {
  return (
    <div className={formData.feature.length >= 1 ? "mt-4 bg-[#f3f3f3] text-sm px-8 py-4 rounded-lg": "hidden"}>
        <ul className='list-disc'>
            {formData.feature.map((feature, index) => (
                <li key={index}>{feature}</li>
            ))}
        </ul>
    </div>
  )
}

export default AddFeature